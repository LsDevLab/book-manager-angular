import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book }         from '../book';
import { BookService }  from '../book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  book: Book = { isbn: "isbn", title: 'title', year: 1970, price: 0};

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  insBook(): void {
    this.bookService.insertBook(this.book)
      .subscribe(() => this.goBack());
  }

}
