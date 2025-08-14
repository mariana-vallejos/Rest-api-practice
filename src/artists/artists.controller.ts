import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Put, HttpCode } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistsService.create(createArtistDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Artist created successfully',
      data: artist,
    };
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    const updated = await this.artistsService.update(id, updateArtistDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Artist updated successfully',
      data: updated,
    };
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updated = await this.artistsService.update(id, updateArtistDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Artist partially updated',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }
}
