import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column()
  country: string;

  @Column()
  debut_year: number;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
