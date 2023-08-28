import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  subTitle?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable()
  likes?: User[];

  @Column()
  content!: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
}
