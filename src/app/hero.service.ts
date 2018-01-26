import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// Http options, used multiple times below
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  // Logging function
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

  // Get ALL heroes using http
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('Fetched all heroes')),
      // The catchError() operator intercepts an Observable that failed.--
      // It passes the error an error handler that can do what it wants with the error.
      catchError(this.handleError('getHeroes', []))
  );;
  }

  // Get ONE hero using http
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`Fetched hero id:=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  // Update ONE hero
  updateHero(hero: Hero) {
    // The HttpClient.put() method takes 3 params(URL, dataToUpdate, options)
    // The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id.
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // Create new hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`Added new hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  // Delete ONE hero
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // Find HEROES
  searchHeroes(term: string): Observable<Hero[]> {

    if (!term.trim()) {
      //if no search term, return empty hero array
      return of([]);
    }

    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }



}
