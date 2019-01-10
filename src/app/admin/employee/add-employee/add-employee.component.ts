import { AdminService } from './../../admin.service';
import { CommonService } from './../../../shared/services/common.service';
import { AuthService } from './../../../core/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { MatRadioChange, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  user: any;
  public baseUrl = environment.baseUrl;
  isNewEmployee = true;
  isSuperAdmin = false;
  employeeRegisterObj: any = {
    name: '',
    adhaar_no: '',
    mobile: '',
    family_member_no: null,
    emergency_no: null,
    land_lord_no: null,
    land_lord_address: '',
    current_address: '',
    permanent_address: '',
    age: null,
    police_verify: null,
    service_name: 'Maid',
    timing: 'part',
    socity_id: null,
    job_location: []
  };
  inProgress = false;

  public ctrlSociety: FormControl;
  public societyLookup = [];
  public filteredSocieties: Observable<any>;
  public profile_pic: any = {
    file: '',
    url: '../../../assets/img/profileimg.png'
  };
  public profile_document: any = {
    file: '',
    url: '../../../assets/img/add-file.png'
  };
  public timings: any = [{
    name: '24 Hours',
    val: '24'
  },
  {
    name: '12 Hours',
    val: '12'
  },
  {
    name: 'Part Time',
    val: 'part'
  }];
  allTimings: any = [{
    name: '24 Hours',
    val: '24'
  },
  {
    name: '12 Hours',
    val: '12'
  },
  {
    name: 'Part Time',
    val: 'part'
  }];

  multiJobLocation = [];

  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private adminService: AdminService,
  ) {
    this.authService.user.subscribe(usr => {
      this.user = usr;
      if ( this.user.account_type.toLowerCase() === 's') {
        this.isSuperAdmin = true;
      }
    });
    this.getLookups();
    this.ctrlSociety = new FormControl();
    let society_name = '';
    if (this.adminService.selectedEmployee && this.adminService.selectedEmployee.id && this.adminService.selectedEmployee.id !== null ) {
      this.isNewEmployee = false;
      this.employeeRegisterObj = this.adminService.selectedEmployee;
      this.employeeRegisterObj.job_location = [];
      if (this.adminService.selectedEmployee.work_details.length > 0) {
        this.employeeRegisterObj.socity_id = this.adminService.selectedEmployee.work_details[0].id;
        this.employeeRegisterObj.job_location = this.adminService.selectedEmployee.work_details;
        society_name = this.adminService.selectedEmployee.work_details[0].socity_name;
      }
      delete this.employeeRegisterObj.work_details;
      this.employeeRegisterObj.profile_pic = this.baseUrl + '' + this.adminService.selectedEmployee.profile_pic;
      this.employeeRegisterObj.document = this.baseUrl + '' + this.adminService.selectedEmployee.document;
      const timingArr = this.allTimings.filter(
        option => option.name.indexOf(this.adminService.selectedEmployee.timing) === 0
      );
      this.employeeRegisterObj.timing = timingArr[0].val;
      // this.getTimingLookupByService();
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

  initMultiJobLocation() {
    const _length = this.employeeRegisterObj.job_location.length,
    _type = this.employeeRegisterObj.timing,
    _array = this.employeeRegisterObj.job_location;
    let i = 0;
    if (this.isNewEmployee) {
      i = 0;
    } else if (_type.toLowerCase() === 'part') {
      if (_length < 10 && _length > 0) {
        i = _length;
        this.employeeRegisterObj.job_location.forEach(ele => {
          this.multiJobLocation.push(ele);
        });
      } else if (_length === 0) {
        i = 0;
      } else {
        this.multiJobLocation = _array;
        return;
      }
    } else if (_length === 1) {
      i = 1;
      this.multiJobLocation.push(this.employeeRegisterObj.job_location[0]);
    } else if (_length === 0) {
      i = 0;
    }
    // else {
    //   // this.multiJobLocation = _array;
    //   // return;
    // }
    this.multiJobLocation = _array;
    for (let j = i; j <= 9; j++) {
      this.multiJobLocation.push({
        // socity_id: null,
        tower_no: '',
        flat_no: null
      });
    }
    if (!this.isNewEmployee && _type.toLowerCase() === 'part') {
      this.employeeRegisterObj.job_location = JSON.parse(JSON.stringify(this.multiJobLocation));
      // this.employeeRegisterObj.socity_id = this.multiJobLocation[0].socity_id;
    } else if (!this.isNewEmployee && _type.toLowerCase() !== 'part') {
      let arr = [];
      arr.push(this.multiJobLocation[0]);
      this.employeeRegisterObj.job_location = arr;
      this.employeeRegisterObj.job_location = this.multiJobLocation[0];
    }
  }

  getTimingLookupByService() {
    const timing = [];
    // const sName = this.employeeRegisterObj.service_name.toLowerCase();

    // if (sName === 'cook' || sName === 'car cleaner') {
    //   timing.push(this.allTimings[2]);
    // } else if (sName === 'child care' || sName === 'elder care') {
    //   timing.push(this.allTimings[1]);
    // } else {
    //   timing.push(this.allTimings[0]); // 24
    //   timing.push(this.allTimings[1]); // 12
    //   timing.push(this.allTimings[2]); // part
    // }

    timing.push(this.allTimings[0]); // 24
    timing.push(this.allTimings[1]); // 12
    timing.push(this.allTimings[2]); // part

    this.timings = timing;
    if (this.isNewEmployee) {
      this.employeeRegisterObj.timing = this.timings[0].val;
    }
    this.getjobLocationLookupByTiming(this.employeeRegisterObj.timing);
  }

  getjobLocationLookupByTiming(timing) {
    if (timing.toLowerCase() === 'part') {
      this.employeeRegisterObj.job_location = this.multiJobLocation;
    } else {
      let arr = [];
      arr.push(this.multiJobLocation[0]);
      this.employeeRegisterObj.job_location = arr;
    }
  }

  updateSocityId(society) {
    this.employeeRegisterObj.socity_id = society.id;
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

  addWorkLocation() {
    this.employeeRegisterObj.job_location.push({
      // socity_id: null,
      tower_no: '',
      flat_no: null
    });
  }
  removeWorkLocation(_index) {
    const removedElement = this.employeeRegisterObj.job_location.splice(_index, 1);
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  employeeRegister() {
    this.processEmployeeData();
    this.adminService.addEmployee(
      this.employeeRegisterObj,
      res => {
        if (res.success) {
          if (this.profile_pic.file || this.profile_document.file) {
            const formdata = this.processDocumentFormData(res.emp_id);
            this.adminService.uploadEmployeePicAndDoc(
              formdata,
              response => {
                if (response.success) {
                  this.commonService.showMessage(response.message);
                  this.commonService.gotoPage('manage-employee');
                } else {
                  this.commonService.showError(response.message);
                }
              },
              err => {
                this.commonService.showError(err.message);
              }
            );
          } else {
            this.commonService.showMessage(res.message);
            this.commonService.gotoPage('manage-employee');
          }
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
      }
    );
  }

  employeeUpdate() {
    const id = this.employeeRegisterObj.id;
    // delete this.employeeRegisterObj.id;
    this.processEmployeeData();
    this.adminService.updateEmployee(
      id,
      this.employeeRegisterObj,
      res => {
        if (res.success) {
          if (this.profile_pic.file || this.profile_document.file) {
            const formdata = this.processDocumentFormData(res.emp_id);
            this.adminService.uploadEmployeePicAndDoc(
              formdata,
              response => {
                if (response.success) {
                  this.commonService.showMessage(response.message);
                  this.commonService.gotoPage('manage-employee');
                } else {
                  this.commonService.showError(response.message);
                }
              },
              err => {
                // this.commonService.showError(err.message);
              }
            );
          } else {
            this.commonService.showMessage(res.message);
            this.commonService.gotoPage('manage-employee');
          }
        } else {
          this.commonService.showError(res.message);
        }
      },
      err => {
      }
    );
  }

  processEmployeeData() {
    delete this.employeeRegisterObj.profile_pic;
    delete this.employeeRegisterObj.document;
    if (this.employeeRegisterObj.timing !== 'part') {
      this.employeeRegisterObj.job_location.splice(1);
    }
    if (!this.isSuperAdmin) {
      delete this.employeeRegisterObj.socity_id;
    }
    for (let i = 0; i < this.employeeRegisterObj.job_location.length; i++) {
      if (this.employeeRegisterObj.job_location[i].id) {
        delete this.employeeRegisterObj.job_location[i].id;
        delete this.employeeRegisterObj.job_location[i].socity_name;
      }
      // this.employeeRegisterObj.job_location[i].socity_id = this.employeeRegisterObj.socity_id;
    }
  }

  processDocumentFormData(emp_id) {
    const formData: FormData = new FormData();
    if (this.profile_pic.file) {
      formData.append('profile_pic', this.profile_pic.file);
    }
    if (this.profile_document.file) {
      formData.append('document', this.profile_document.file);
    }
    formData.append('emp_id', emp_id);
    return formData;
  }

  cancel() {
    this.commonService.gotoPage('manage-employee');
  }

  // ------------------- DOC Upload ------------------------

  handleFileInput(event: any, type) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      const file = event.target.files[0];
      if (type === 'p') {
        this.profile_pic = {
          name: file.name,
          size: file.size,
          progress: 0,
          uploadedDate: new Date(),
          file: file
        };
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.profile_pic.url = reader.result;
          this.employeeRegisterObj.profile_pic = reader.result;
        };
      } else if (type === 'd') {
        this.profile_document = {
          name: file.name,
          size: file.size,
          progress: 0,
          uploadedDate: new Date(),
          file: file
        };
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.profile_document.url = reader.result;
          this.employeeRegisterObj.document = reader.result;
        };
        // this.employeeRegisterObj.document = fileUrl;
      }
    }
  }

  ngOnInit() {
    this.initMultiJobLocation();
    this.getTimingLookupByService();
  }
}
