import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    country: string

    @IsInt()
    @IsNotEmpty()
    @Max(new Date().getFullYear())
    debut_year: number
}
