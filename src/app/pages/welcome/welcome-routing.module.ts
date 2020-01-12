import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedComponent } from './detailed/detailed.component';
import { WelcomeComponent } from './welcomes/welcome.component';
import { HomeComponent } from './home.component';
import { ReviewComponent } from './review/review.component';
import { ExchangeComponent } from './exchange/exchange.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WelcomeComponent },
      { path: 'detail', component: DetailedComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'exchange', component: ExchangeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {}
