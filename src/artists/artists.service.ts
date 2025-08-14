import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistsRepository.create(createArtistDto)

    return await this.artistsRepository.save(artist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: number) {
    return await this.artistsRepository.findOne({ where: { id }});
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id)
    if(!artist){
      throw new NotFoundException();
    }

    Object.assign(artist, updateArtistDto)

    return await this.artistsRepository.save(artist);
  }

  async remove(id: number) {
    const artist = await this.findOne(id)
    
    if(!artist){
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return await this.artistsRepository.remove(artist);
  }
}
