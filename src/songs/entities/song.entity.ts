import { Genre } from "src/genres/entities/genre.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'songs' })
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    duration: number;

    @ManyToMany(() => Genre, {cascade: true})
    @JoinTable()
    genre_ids: Genre[]
}
