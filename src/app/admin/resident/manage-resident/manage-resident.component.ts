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
  selector: 'app-manage-resident',
  templateUrl: './manage-resident.component.html',
  styleUrls: ['./manage-resident.component.css']
})
export class ManageResidentComponent implements OnInit, AfterViewInit {
  residents: any;
  inProgress = false;
  totalRecords = 0;
  searchBy = 'name';
  searchedTerm = '';
  searchTextChanged = new Subject<string>();
  subscription;

  public importErrorMessage = '';
  colDefs = [
    {
      name: 'id',
      displayName: 'ID',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'Full Name',
      width: '100px'
    },
    {
      name: 'mobile',
      displayName: 'Mobile',
      width: '100px'
    },
    {
      name: 'adults',
      displayName: 'Total Family Member',
      width: '170px',
      displayFcn: elem => elem.adults + ' Adults, ' + elem.kids + ' Kids, ' + elem.infant + ' Infant'
    },
    // {
    //   name: 'landline',
    //   displayName: 'Landline',
    //   width: '100px'
    // },
    {
      name: 'tower',
      displayName: 'Tower',
      width: '100px'
    },
    {
      name: 'flat_no',
      displayName: 'Flat No',
      width: '100px'
    },
    {
      name: 'flat_type',
      displayName: 'Flat Type',
      width: '100px'
    },
    {
      name: 'residents_type',
      displayName: 'Type',
      width: '100px',
      displayFcn: elem => this.getResidentType(elem.residents_type)
    },
    {
      name: 'agreement_start_date',
      displayName: 'Agreement Date',
      width: '170px',
      displayFcn: elem => this.prepareAgreementDisplayString(elem.agreement_start_date, elem.agreement_end_date)
    },
    // {
    //   name: 'agreement_end_date',
    //   displayName: 'agreement_end_date',
    //   width: '100px'
    // },
    {
      name: 'owner_name',
      displayName: 'Owner Name',
      width: '100px'
    },
    {
      name: 'owner_number',
      displayName: 'Owner Number',
      width: '120px'
    },
    {
      name: 'adhaar_no',
      displayName: 'ID Proof',
      width: '100px',
      displayFcn: elem => (elem.adhaar_no && elem.adhaar_no > 0) ? 'Aadhaar Card' : ''
    },
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
    this.getResidentsList();
    this.subscription = this.searchTextChanged.pipe(
      debounceTime(400),
      distinctUntilChanged()
     ).subscribe((res) => {
        this.paginator.pageIndex = 0;
        this.getResidentsList();
     });
  }

  prepareAgreementDisplayString(sDate, eDate) {
    if (!sDate && !eDate) {
      return '';
    }
    if (!sDate) {
      return this.getFormattedDate(eDate);
    }
    if (!eDate) {
      return this.getFormattedDate(sDate);
    }
    return this.getFormattedDate(sDate) + ' to ' + this.getFormattedDate(eDate);

  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   this.residents.filter = filterValue;
  // }

  applyFilter() {
    this.searchTextChanged.next(this.searchedTerm);
  }

  getResidentType(type) {
    if ( type === 'o' || type === 'O') {
      return 'Owner';
    } else if ( type === 't' || type === 'T') {
      return 'Tenant';
    } else {
      return type;
    }
  }

  getResidentsList() {
    this.inProgress = true;
    const paramData = {
      params: {
        page: this.paginator.pageIndex + 1,
        search_by: this.searchBy,
        search: this.searchedTerm ? this.searchedTerm : ''
      }
    };
    this._adminService.getResidentsList(
      paramData,
      res => {
        const resultArray = res.data;
        this.totalRecords = res.count;
        this.residents = new MatTableDataSource<any>(resultArray);
        // this.residents.paginator = this.paginator;
        this.inProgress = false;
      },
      err => {
        this.inProgress = false;
      }
    );
  }

  public getFormattedDate(elem) {
    return this._datePipe.transform(elem, 'MM-dd-yyyy');
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.getResidentsList();
        })
      )
      .subscribe();
  }

}
