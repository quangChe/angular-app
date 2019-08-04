import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  noHeroesFound: boolean = false;
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term):void {
    if (!term.trim()) {
      this.noHeroesFound = false;
      return;
    } 
    this.searchTerms.next(term);
    this.noHeroesFound = false;
    return;
  }

  ngOnInit() {    
    this.heroes$ = this.searchTerms.pipe(
      // Ignore new term if it isn't different from previous term
      distinctUntilChanged(),
      
      // Wait 300ms after each keystroke before starting search
      debounceTime(200),

      // Switch to new search observable each time term changes
      switchMap((term: string) => this.heroService.searchHero(term)),

      tap(heroes => this.noHeroesFound = heroes.length ? false : true)
    )
  }
}
