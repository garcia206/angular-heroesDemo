import { InMemoryDbService } from 'angular-in-memory-web-api';

// Angular in-memory-web-api
/*
An in-memory web api for Angular demos and tests that emulates CRUD operations over a RESTy API.
It intercepts Angular Http and HttpClient requests that would otherwise go to the remote server and
redirects them to an in-memory data store that you control.
 */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    // URL will be 'api/heroes'
    return {heroes};
  }
}
