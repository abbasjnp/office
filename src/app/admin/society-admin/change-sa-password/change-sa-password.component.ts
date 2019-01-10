import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-sa-password',
  templateUrl: './change-sa-password.component.html',
  styleUrls: ['./change-sa-password.component.css']
})
export class ChangeSaPasswordComponent implements OnInit {
  changePwdObj: any = {
    admin_id: null,
    password: '',
    re_password: '',
  };
  inProgress = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private adminService: AdminService,
  ) {
    this.changePwdObj.admin_id = this.adminService.selectedSocietyAdmin.id;
  }

  changePassword() {
    this.adminService.changePassword(
      this.changePwdObj,
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.commonService.gotoPage('manage-society-admin');
          // this.router.navigate(['/admin/manage-society-admin']);
        } else {
          this.commonService.showError(res.error);
        }
      },
      err => {
        this.commonService.showError(err.error);
      }
    );
  }

  cancel() {
    this.commonService.gotoPage('manage-society-admin');
    // this.router.navigate(['/admin/manage-society-admin']);
  }

  ngOnInit() {
  }
}
