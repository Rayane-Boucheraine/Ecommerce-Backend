import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({name: 'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    description: string
    @CreateDateColumn()
    cratedAt: Timestamp
    @CreateDateColumn()
    updatedAt: Timestamp

    @ManyToOne(() => UserEntity, (user) => user.categories)
    addedBy: UserEntity

    @OneToMany(() => ProductEntity, (prod) => prod.category)
    products: ProductEntity
}