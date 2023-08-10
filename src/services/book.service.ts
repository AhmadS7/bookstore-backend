/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async buyBook(userId: number, bookId: number, quantity: number): Promise<boolean> {
    // Fetch the book
    const book = await this.bookRepository.findOne(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    // Update book stock and create transaction
    book.stock -= quantity;
    await this.bookRepository.save(book);

    // Implement transaction creation here

    return true;
  }
}
