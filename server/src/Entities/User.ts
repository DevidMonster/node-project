import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  passWord!: string;

  @Column({ default: "" })
  phoneNumber?: string;

  @Column({ default: "https://res.cloudinary.com/dpwto5xyv/image/upload/v1692587346/learnECMAS/t%E1%BA%A3i_xu%E1%BB%91ng_zdwt9p.png" })
  avatar?: string;

  @Column({ default: "member" })
  role!: string;

  @Column({ default: true })
  state!: boolean;

  @OneToMany(() => Comment, comment => comment.user)
  comments?: Comment[];

  @ManyToMany(() => Post, post => post.likes)
  @JoinTable()
  likedPosts?: Post[];
}
