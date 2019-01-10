import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.css']
})
export class ReplacementComponent implements OnInit {

  socities: any;
  inProgress = false;

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
      displayName: 'EMPLOYEE NAME',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'EMPLOYEE AGE',
      width: '100px'
    },
    {
      name: 'total_towers',
      displayName: 'Mobile Number',
      width: '80px'
    },
    {
      name: 'state',
      displayName: 'SERVICE',
      width: '100px'
    },
    {
      name: 'city',
      displayName: 'type',
      width: '100px'
    },
    {
      name: 'area',
      displayName: 'pay amount',
      width: '100px'
    },
    {
      name: 'pincode',
      displayName: 'user name',
      width: '100px'
    }
  ];

  displayedColumns = this.colDefs.map(c => c.name);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private _authService: AuthService,
    private _commonService: CommonService,
    private _adminService: AdminService,
    private _router: Router,
    private _datePipe: DatePipe
  ) {
  }

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

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   this.socities.filter = filterValue;
  // }

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


  public getFormattedDate(elem) {
    return this._datePipe.transform(elem, 'MM-dd-yyyy');
  }


}


