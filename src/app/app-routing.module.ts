import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'heroes', component: HeroesComponent}
];

// You generally don't declare components in a routing module --
// so you can delete the @NgModule.declarations array and delete CommonModule references too.
@NgModule({
  // which other modules it uses (imports)
  imports: [RouterModule.forRoot(routes)],
  // Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
  exports: [RouterModule]
})
export class AppRoutingModule { }
