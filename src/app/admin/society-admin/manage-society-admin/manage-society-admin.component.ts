import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
// import { DatePipe } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-society-admin',
  templateUrl: './manage-society-admin.component.html',
  styleUrls: ['./manage-society-admin.component.css']
})
export class ManageSocietyAdminComponent implements OnInit, AfterViewInit {
  societyAdmins: any;
  inProgress = false;

  totalRecords = 0;
  filterBy = 'name';
  searchedTerm = '';

  public importErrorMessage = '';
  colDefs = [
    {
      name: 'id',
      displayName: 'ID',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'Admin Name',
      width: '100px'
    },
    {
      name: 'email',
      displayName: 'Email',
      width: '120px'
    },
    {
      name: 'socity_name',
      displayName: 'Society Name',
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
    // private _datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.getSocietyAdminList();
    this.displayedColumns.push('action');
    this._adminService.selectedSocietyAdmin = {};
  }

  // applyFilter() {
  //   this.paginator.pageIndex = 0;
  //   this.getSocietyAdminList();
  // }

  getSocietyAdminList() {
    this.inProgress = true;
    const options = {
      // params: {
      //   page: this.paginator.pageIndex + 1,
      //   search_by: this.filterBy,
      //   search: this.searchedTerm
      // }
    };
    this._adminService.getSocietyAdminList(
      options,
      res => {
        const resultArray = res.data;
        // this.totalRecords = res.count;
        this.societyAdmins = new MatTableDataSource<any>(resultArray);
        this.societyAdmins.paginator = this.paginator;
        this.inProgress = false;
      },
      err => {
        this.inProgress = false;
      }
    );
  }

  // public getFormattedDate(elem) {
  //   return this._datePipe.transform(elem, 'MM-dd-yyyy');
  // }

  public addSocietyAdmin() {
    this._commonService.gotoPage('add-society-admin');
    // this._router.navigate(['/admin/add-society-admin']);
  }

  public editSocietyAdmin(societyAdmin) {
    this._adminService.fetchSocietyAdminById(
      societyAdmin.id,
      res => {
        this._adminService.selectedSocietyAdmin = res.data;
        this._commonService.gotoPage('edit-society-admin');
      },
      err => {}
    );
  }

  public deleteSocietyAdmin(societyAdmin) {
    this._commonService.openConfirmDialog(
      {
        title: 'Delete Society Admin',
        content: 'Are you sure to delete this society admin?'
      },
      () => {
        this._adminService.deleteSocietyAdminById(
          societyAdmin.id,
          data => {
            this.getSocietyAdminList();
            this._commonService.showMessage(
              'Society Admin has been deleted successfully'
            );
          },
          err => {}
        );
      }
    );
  }

  ngAfterViewInit() {
    // this.paginator.page
    //   .pipe(
    //     tap(() => {
    //       this.getSocietyAdminList();
    //     })
    //   )
    //   .subscribe();
  }

}
