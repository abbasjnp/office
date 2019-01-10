import { AuthGuard } from './../core/auth/auth.guard';
import { AccountModule } from './../account/account.module';
import { CanDeactivateGuard } from './../core/can-deactivate.gaurd';
import { CoreModule } from './../core/core.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddSocietyComponent } from './society/add-society/add-society.component';
import { ManageSocietyComponent } from './society/manage-society/manage-society.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ManageEmployeeComponent } from './employee/manage-employee/manage-employee.component';
import { ManageResidentComponent } from './resident/manage-resident/manage-resident.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { ManageSocietyAdminComponent } from './society-admin/manage-society-admin/manage-society-admin.component';
import { AddSocietyAdminComponent } from './society-admin/add-society-admin/add-society-admin.component';
import { ChangeSaPasswordComponent } from './society-admin/change-sa-password/change-sa-password.component';
import { ManageRequestsComponent } from './requests/manage-requests/manage-requests.component';
import { ShortlistedComponent } from './requests/shortlisted/shortlisted.component';
import { ReplacementComponent } from './requests/replacement/replacement.component';
import { ReasignRequestComponent } from './requests/reasign-request/reasign-request.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-society', component: ManageSocietyComponent },
      { path: 'add-society', component: AddSocietyComponent },
      { path: 'edit-society', component: AddSocietyComponent },
      { path: 'manage-resident', component: ManageResidentComponent },
      { path: 'manage-employee', component: ManageEmployeeComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'edit-employee', component: AddEmployeeComponent },
      { path: 'view-employee', component: ViewEmployeeComponent },
      { path: 'manage-society-admin', component: ManageSocietyAdminComponent },
      { path: 'add-society-admin', component: AddSocietyAdminComponent },
      { path: 'edit-society-admin', component: AddSocietyAdminComponent },
      { path: 'change-sa-pwd', component: ChangeSaPasswordComponent },
      { path:'manage-request',component:ManageRequestsComponent},
      { path:'requests/shorlisted',component:ShortlistedComponent},
      {path:'requests/replacement',component:ReplacementComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    AccountModule
  ],
  declarations: [
    DashboardComponent,
    AdminComponent,
    AddSocietyComponent,
    ManageSocietyComponent,
    AddEmployeeComponent,
    ManageEmployeeComponent,
    ManageResidentComponent,
    ViewEmployeeComponent,
    ManageSocietyAdminComponent,
    AddSocietyAdminComponent,
    ChangeSaPasswordComponent,
    ManageRequestsComponent,
    ShortlistedComponent,
    ReplacementComponent,
    ReasignRequestComponent
  ],
  entryComponents: [ReasignRequestComponent],
  providers: [AuthGuard, DatePipe,],
  exports: [
    AddEmployeeComponent,
    ManageEmployeeComponent,
    ManageResidentComponent,
    ViewEmployeeComponent
  ]
})
export class AdminModule { }
