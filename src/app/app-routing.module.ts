import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { GSTDetailsComponent } from './gstdetails/gstdetails.component';
import { AuthGuardService } from './Shared/auth-gaurd.service';
import { InvoiceComponent } from './invoice/invoice.component';
const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: '',   redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent,canActivate: [ AuthGuardService]},
    { path: 'billDetails', component: BillDetailsComponent,canActivate: [ AuthGuardService]},
    { path: 'editbillDetails', component: BillDetailsComponent,canActivate: [ AuthGuardService]},
    { path: 'gst', component: GSTDetailsComponent,canActivate: [ AuthGuardService]},
    { path: 'invoice', component: InvoiceComponent,canActivate: [ AuthGuardService]},


    { path: '**',  redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
