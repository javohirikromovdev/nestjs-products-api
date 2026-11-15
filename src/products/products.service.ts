import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(
    search?: string,
    minPrice?: string,
    maxPrice?: string,
    sort?: string,
    page?: string,
    limit?: string,
  ) {
    const currentPage = Number(page) || 1;
    const take = Number(limit) || 5;
    const skip = (currentPage - 1) * take;
    const products = await this.prisma.product.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined,
        },
      },
      orderBy: {
        price: sort === 'desc' ? 'desc' : 'asc',
      },
      skip,
      take,
    });
    return products.map((product) => ({
      ...product,
      image: product.image
        ? `http://localhost:3000/uploads/${product.image}`
        : null,
    }));
  }

  async getProduct(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(body: any, image: string) {
    return this.prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),
        image,
      },
    });
  }

  async updateProduct(id: number, body: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: body,
    });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
