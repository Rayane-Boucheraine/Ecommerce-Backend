import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepositery: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productService.findOne(
      createReviewDto.productId,
    );
    let review = await this.findOneByUserAndProduct(
      currentUser.id,
      createReviewDto.productId,
    );
    if (!review) {
      review = this.reviewRepositery.create(createReviewDto);
      review.user = currentUser;
      review.product = product;
    } else {
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }
    return await this.reviewRepositery.save(review);
  }

  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewRepositery.find();
  }

  async findAllByProduct(id: number): Promise<ReviewEntity[]> {
    const product = await this.productService.findOne(id);
    return await this.reviewRepositery.find({
      where: { product: { id } },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<ReviewEntity> {
    const review = this.reviewRepositery.findOne({
      where: { id: id },
      relations: { user: true, product: { category: true } },
      select: {
        user: { id: true, email: true, name: true },
        product: {
          id: true,
          title: true,
          description: true,
          category: { id: true, title: true, description: true },
        },
      },
    });
    if (!review) throw new NotFoundException('Review not found.');
    return await review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number): Promise<ReviewEntity> {
    const review = await this.findOne(id);
    return await this.reviewRepositery.remove(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepositery.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }
}
