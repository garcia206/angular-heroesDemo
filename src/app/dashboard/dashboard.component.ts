import { Hero } from '../hero';
import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // the heroes from service will be stored here
  heroes: Hero[] = [];

  // inject the heroService
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // call our method in onInit hook
    this.getHeroes();
  }

  // method to fetch heroes asynchronously by subscibing to Observable
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
