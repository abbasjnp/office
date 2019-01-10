import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReasignRequestComponent } from '../reasign-request/reasign-request.component';



@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css']
})
export class ManageRequestsComponent implements OnInit {
  socities: any;
  inProgress = false;
  employee;

  document: any;
  public progress = 0;
  totalRecords = 0;
  searchBy = 'name';
  searchedTerm;
  searchTextChanged = new Subject<string>();
  subscription;

  public importErrorMessage = '';

  colDefs = [
    {
      name: 'id',
      displayName: 'Employee Name',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'Employee Age',
      width: '100px'
    },
    {
      name: 'total_towers',
      displayName: 'Mobile Number',
      width: '80px'
    },
    {
      name: 'state',
      displayName: 'Service',
      width: '100px'
    },
    {
      name: 'city',
      displayName: 'Type',
      width: '100px'
    },
    {
      name: 'area',
      displayName: 'Pay amount',
      width: '100px'
    },
    {
      name: 'pincode',
      displayName: 'User Name',
      width: '100px'
    }
  ];

  displayedColumns = this.colDefs.map(c => c.name);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(public _adminService:AdminService,
              public dialog:MatDialog) { }

  ngOnInit() {
    this.getSocitiesList();
    this.displayedColumns.push('action');
    this._adminService.selectedSociety = {};
    this.subscription = this.searchTextChanged.pipe(
      debounceTime(400),
      distinctUntilChanged()
     ).subscribe((res) => {
        this.paginator.pageIndex = 0;
        this.getSocitiesList();
     });
  }
  applyFilter() {
    this.searchTextChanged.next(this.searchedTerm);
  }
  getSocitiesList() {
    this.inProgress = true;
    const options = {
      params: {
        page: this.paginator.pageIndex + 1,
        search_by: this.searchBy,
        search: this.searchedTerm ? this.searchedTerm : ''
      }
    };
    this._adminService.getSocitiesList(
      options,
      res => {
        const resultArray = res.data;
        this.totalRecords = res.count;
        this.socities = new MatTableDataSource<any>(resultArray);
        // this.socities.paginator = this.paginator;
        this.inProgress = false;
      },
      err => {
        this.inProgress = false;
      }
    );
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.getSocitiesList();
        })
      )
      .subscribe();
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ReasignRequestComponent, {
      width: '420px',
      height:'275px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employee = result;
    });
    console.log(element.id);
    console.log(this.employee); 
    
  }



}
