import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  release_date: Date;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'CASCADE' })
  artist: Artist;
}
