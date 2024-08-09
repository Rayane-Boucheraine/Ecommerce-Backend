import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratings: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @CreateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne((type) => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne((type) => ProductEntity, (prod) => prod.reviews)
  product: ProductEntity;
}
