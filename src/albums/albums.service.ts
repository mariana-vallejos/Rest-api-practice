import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepo: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepo: Repository<Artist>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    const artist = await this.artistsRepo.findOne({ where: { id: dto.artist_id } });
    if (!artist) throw new NotFoundException(`Artist with id ${dto.artist_id} not found`);

    const album = this.albumsRepo.create({ 
      title: dto.title,
      release_date: dto.release_date,
      artist
    });
    return this.albumsRepo.save(album);
  }

  async findAll() {
    return await this.albumsRepo.find({ relations: ['artist', 'songs'] });
  }

  async findOne(id: number): Promise<Album>  {
    const album = await this.albumsRepo.findOne({
      where: { id },
      relations: ['artist', 'songs'],
    });
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  async update(id: number, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    if (dto.artist_id) {
      const artist = await this.artistsRepo.findOne({ where: { id: dto.artist_id } });
      if (!artist) throw new NotFoundException(`Artist with id ${dto.artist_id} not found`);
      album.artist = artist;
    }
    Object.assign(album, dto);
    return this.albumsRepo.save(album);
  }

  async remove(id: number): Promise<void> {
    const album = await this.findOne(id);
    await this.albumsRepo.remove(album);
  }
}
