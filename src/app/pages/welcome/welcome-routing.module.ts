import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedComponent } from './detailed/detailed.component';
import { WelcomeComponent } from './welcomes/welcome.component';
import { HomeComponent } from './home.component';
import { ReviewComponent } from './review/review.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { UsersComponent } from './users/users.component';
import { DetailComponent } from './users/detail/detail.component';
import { VoucherComponent } from './voucher/voucher.component';
import { DetailVoucherComponent } from './voucher/detail-voucher/detail-voucher.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WelcomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/detail/:id', component: DetailComponent },
      { path: 'detail', component: DetailedComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'exchange', component: ExchangeComponent },
      { path: 'voucher', component: VoucherComponent },
      { path: 'voucher/detail/:id', component: DetailVoucherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {}
