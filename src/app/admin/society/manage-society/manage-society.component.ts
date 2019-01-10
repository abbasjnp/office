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
  selector: 'app-manage-society',
  templateUrl: './manage-society.component.html',
  styleUrls: ['./manage-society.component.css']
})
export class ManageSocietyComponent implements OnInit, AfterViewInit {
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
      displayName: 'ID',
      width: '80px'
    },
    {
      name: 'name',
      displayName: 'Name',
      width: '100px'
    },
    {
      name: 'total_towers',
      displayName: 'Total Towers',
      width: '80px'
    },
    {
      name: 'state',
      displayName: 'state',
      width: '100px'
    },
    {
      name: 'city',
      displayName: 'city',
      width: '100px'
    },
    {
      name: 'area',
      displayName: 'area',
      width: '100px'
    },
    {
      name: 'pincode',
      displayName: 'pincode',
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

  public getFormattedDate(elem) {
    return this._datePipe.transform(elem, 'MM-dd-yyyy');
  }

  public addSociety() {
    this._commonService.gotoPage('add-society');
    // this._router.navigate(['/admin/add-society']);
  }

  public editSociety(society) {
    this._adminService.selectedSociety = society;
    this._commonService.gotoPage('edit-society');
    // this._router.navigate(['/admin/edit-society']);
  }

  public deleteSociety(society) {
    this._commonService.openConfirmDialog(
      {
        title: 'Delete Society',
        content: 'Are you sure to delete this society?'
      },
      () => {
        this._adminService.deleteSocietyById(
          society.id,
          data => {
            this.getSocitiesList();
            this._commonService.showMessage(
              'Society has been deleted successfully'
            );
          },
          err => {}
        );
      }
    );
  }

  // ------------------- DOC Upload ------------------------

  handleFileInput(files: any) {
    const file = files[0];
      // if (file.type === 'application/csv') {
      this.document = {
        name: file.name,
        size: file.size,
        progress: 0,
        uploadedDate: new Date(),
        file: file
      };
      this.confirmDocUpload();
      // }
      //  else {
      //   this._commonService.showError('Only upload CSV file');
      // }
  }

  public confirmDocUpload() {
    this._commonService.openConfirmDialog(
      {
        title: 'Upload File',
        content: 'Are You sure you want to upload this file?'
      },
      () => {
        this.uploadDocument(this.document);
      }
    );
  }

  uploadDocument(document) {
    this.inProgress = true;

    if (document.file) {
      this._adminService.uploadDoc(
        'socity_csv',
        document.file,
        progress => {
          this.document.progress = progress;
          this.progress = progress;
        },
        res => {
          this.inProgress = false;
          if (res.success) {
            this._commonService.showMessage('File Uploaded Successfully');
            this.getSocitiesList();
          }
        },
        err => {
          this.inProgress = false;
          this._commonService.showError('Error Uploading File');
        }
      );
    } else {
      this.inProgress = false;
      this._commonService.showError('File is required');
    }
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

}
