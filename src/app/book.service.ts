import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksManagerUrl = 'http://127.0.0.1:8000/manager/books';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksManagerUrl)
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  /** GET book by isbn. Will 404 if isbn not found */
  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.booksManagerUrl}/${isbn}`).pipe(
      tap(_ => this.log(`fetched book isbn=${isbn}`)),
      catchError(this.handleError<Book>(`getBook isbn=${isbn}`))
    );
  }

  /** PUT: update the book on the server */
  updateBook(book: Book): Observable<any> {
    return this.http.put(`${this.booksManagerUrl}/${book.isbn}`, book, this.httpOptions).pipe(
      tap(_ => this.log(`updated book isbn=${book.isbn}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /** DELETE: delete the book on the server */
  deleBook(isbn: string): Observable<any> {
    return this.http.delete(`${this.booksManagerUrl}/${isbn}`).pipe(
      tap(_ => this.log(`deleted book isbn=${isbn}`)),
      catchError(this.handleError<any>('deleteBook'))
    );
  }

  /** POST: insert a new the book on the server */
  insertBook(book: Book): Observable<any> {
    return this.http.put(`${this.booksManagerUrl}/${book.isbn}`, book, this.httpOptions).pipe(
      tap(_ => this.log(`inserted book isbn=${book.isbn}`)),
      catchError(this.handleError<any>('insertBook'))
    );
  }


  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
