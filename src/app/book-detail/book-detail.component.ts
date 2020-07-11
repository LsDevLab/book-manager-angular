import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book }         from '../book';
import { BookService }  from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: [ './book-detail.component.css' ]
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const isbn = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(isbn)
      .subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

  saveBook(): void {
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goBack());
  }

  deleteBook(): void{
    this.bookService.deleBook(this.book.isbn)
      .subscribe(() => this.goBack());
  }
}
