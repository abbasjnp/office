import { AuthGuard } from './../core/auth/auth.guard';
import { CanDeactivateGuard } from './../core/can-deactivate.gaurd';
import { AppMaterialModule } from './../app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ViewEmployeeComponent } from './../admin/employee/view-employee/view-employee.component';
import { AddEmployeeComponent } from './../admin/employee/add-employee/add-employee.component';
import { ManageEmployeeComponent } from './../admin/employee/manage-employee/manage-employee.component';
import { ManageResidentComponent } from './../admin/resident/manage-resident/manage-resident.component';
import { ManageSocietyComponent } from './../admin/society/manage-society/manage-society.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminModule } from './../admin/admin.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SocietyAdminComponent } from './society-admin.component';

const routes: Routes = [
  {
    path: 'society-admin',
    component: SocietyAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-resident', component: ManageResidentComponent },
      { path: 'manage-employee', component: ManageEmployeeComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'edit-employee', component: AddEmployeeComponent },
      { path: 'view-employee', component: ViewEmployeeComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    CommonModule,
    AdminModule,
    SharedModule
  ],
  providers: [AuthGuard, DatePipe],
  declarations: [
    SocietyAdminComponent,
    DashboardComponent
  ]
})
export class SocietyAdminModule { }
