import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-society-admin',
  templateUrl: './add-society-admin.component.html',
  styleUrls: ['./add-society-admin.component.css']
})
export class AddSocietyAdminComponent implements OnInit {
  public ctrlSociety: FormControl;
  public societyLookup = [];
  public filteredSocieties: Observable<any>;

  isNewSocietyAdmin = true;
  societyAdminRegisterObj: any = {
    id: null,
    name: '',
    email: '',
    password: '',
    socity_id: null,
  };
  inProgress = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private adminService: AdminService,
  ) {
    this.getLookups();
    this.ctrlSociety = new FormControl();
    let society_name = '';
    if (this.adminService.selectedSocietyAdmin &&
      this.adminService.selectedSocietyAdmin.id &&
      this.adminService.selectedSocietyAdmin.id !== null ) {
      this.isNewSocietyAdmin = false;
      this.societyAdminRegisterObj = this.adminService.selectedSocietyAdmin;

      society_name = this.adminService.selectedSocietyAdmin.socity_name;
    }
    this.ctrlSociety.setValue(society_name);
    this.filteredSocieties = this.ctrlSociety.valueChanges.pipe(
      startWith(society_name),
      map(value => this._filterSociety(value))
    );
  }

  getLookups() {
    this.adminService.getSocietyNamesLookup(
      res => {
        this.societyLookup = res.data;
      },
      err => {
        // this.formLoaded = true;
      }
    );
  }

  updateSocityId(society) {
    this.societyAdminRegisterObj.socity_id = society.id;
    this.societyAdminRegisterObj.socity_name = society.socity_name;
  }

  private _filterSociety(value) {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object') {
      filterValue = value.socity_name.toLowerCase();
    }
    return this.societyLookup.filter(
      society => society.socity_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  societyAdminRegister() {
    delete this.societyAdminRegisterObj.id;
    this.adminService.addSocietyAdmin(
      this.societyAdminRegisterObj,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.commonService.gotoPage('manage-society-admin');
        } else {
          this.commonService.showError(res.error);
        }
      },
      err => {
        this.commonService.showError(err.error);
      }
    );
  }

  societyAdminUpdate() {
    const id = this.societyAdminRegisterObj.id;
    // delete this.societyAdminRegisterObj.id;
    this.adminService.updateSocietyAdmin(
      id,
      this.societyAdminRegisterObj,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.commonService.gotoPage('manage-society-admin');
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        // this.commonService.showError(err.message);
      }
    );
  }

  changePassword() {
    this.commonService.gotoPage('change-sa-pwd');
  }

  cancel() {
    this.commonService.gotoPage('manage-society-admin');
  }

  ngOnInit() {
  }
}
