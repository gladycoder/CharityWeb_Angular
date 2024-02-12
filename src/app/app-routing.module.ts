import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationComponent } from './donation/donation.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
path:'',component:HomeComponent,canActivate: [AuthGuard]
  },
  {
    path:'donation',component:DonationComponent,canActivate: [AuthGuard]
  },
  {
    path:"expense",component:ExpenseComponent,canActivate: [AuthGuard]
  },
  {
    path:"member",component:MemberComponent,canActivate: [AuthGuard]
  },
  {
    path:"login",component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
