import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable()
export class HeroService {
  // URL to web API, api/<nameOfCollectionReturned>
 // <nameOfCollectionReturned> has to match collection returned in 'in-memory-data.service.ts' file
  private heroesUrl = 'api/heroes';

  // This is a typical "service-in-service" scenario: you inject the MessageService --
  // into the HeroService which is injected into the HeroesComponent.
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // New code, using http
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('Fetched all heroes')),
      // The catchError() operator intercepts an Observable that failed.--
      // It passes the error an error handler that can do what it wants with the error.
      catchError(this.handleError('getHeroes', []))
  );;
  }

  // getHero() has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`Fetched hero id:=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

     // OLD CODE
  // getHeroes(): Observable<Hero[]> {
  //   // send the message_after_fetching the heroes
  //   this.log('HeroService: Fetched ALL heroes');
  //   // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  //   return of(HEROES);
  // }


}
