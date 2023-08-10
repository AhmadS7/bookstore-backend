import { Controller, Post, Body } from '@nestjs/common';
import { BookService } from '../services/book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('buy')
  async buyBook(@Body() requestBody: any) {
    const { userId, bookId, quantity } = requestBody;

    try {
      await this.bookService.buyBook(userId, bookId, quantity);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
