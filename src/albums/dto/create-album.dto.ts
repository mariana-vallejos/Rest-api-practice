import { IsString, IsNotEmpty, IsInt, Max, IsDate } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsDate()
    release_date: Date;

    @IsInt()
    @IsNotEmpty()
    artist_id: number;
}
