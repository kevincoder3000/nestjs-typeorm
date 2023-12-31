import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Sparkies',
      description: 'Dulce y muy provocativo',
      price: 8,
      image: 'https://sparkies-caramelos-masticables.com',
      stock: 12,
    },

    {
      id: 2,
      name: 'Vodka',
      description: 'Transparente, potente y adictivo',
      price: 129,
      image: 'https://vodka.com',
      stock: 55,
    },

    {
      id: 3,
      name: 'Patek Philippe Grandmaster Chime Ref. 6300A-010',
      description:
        'Dispositivo para medir el tiempo, compuesto de agujas o dígitos que indican horas y minutos.',
      price: 872,
      image: 'https://reloj-mas-caro.com',
      stock: 55,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
