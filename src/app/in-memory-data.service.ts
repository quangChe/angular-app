import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Homelander' },
      { id: 2, name: 'Queen Maive' },
      { id: 3, name: 'Translucent' },
      { id: 4, name: 'Black Noir' },
      { id: 5, name: 'A-Train' },
      { id: 6, name: 'The Deep' },
      { id: 7, name: 'Starlight' },
      { id: 8, name: 'Ezekiel' },
      { id: 9, name: 'Windstorm' },
      { id: 10, name: 'Death Adder' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map(hero => hero.id)) + 1
      : 1
  }
}
