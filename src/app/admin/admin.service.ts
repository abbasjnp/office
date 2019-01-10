import { Injectable } from '@angular/core';
import { DataService } from '../core/http/data.service';
import { CommonService } from '../shared/index.shared';
import { environment } from '../../environments/environment';
import { HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private dataService: DataService,
    private common: CommonService
  ) {}

  serviceUrl = environment.baseUrl + 'authentication/';
  // docUploadUrl = environment.baseUrl;
  public selectedSociety: any;
  public selectedEmployee: any;
  public selectedResident: any;
  public selectedSocietyAdmin: any;

  // -------------- Society Admin --------------------------
  public getSocietyAdminList(options, successCall, errorCall) {
    const url = this.serviceUrl + 'admin_module/';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public fetchSocietyAdminById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'admin_module/' + id;
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public deleteSocietyAdminById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'admin_module/' + id;
    this.dataService.delete(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public addSocietyAdmin(obj, successCall, errorCall) {
    this.dataService.post(this.serviceUrl + 'admin_module/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  public updateSocietyAdmin(id, obj, successCall, errorCall) {
    this.dataService.put(this.serviceUrl + 'admin_module/' + id + '/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  public changePassword(obj, successCall, errorCall) {
    this.dataService.post(this.serviceUrl + 'forget_password/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  // -------------- Society --------------------------
  public getSocitiesList(options, successCall, errorCall) {
    const url = this.serviceUrl + 'socity/';
    this.dataService.get(url, options).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public deleteSocietyById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'socity/' + id;
    this.dataService.delete(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public addSociety(obj, successCall, errorCall) {
    this.dataService.post(this.serviceUrl + 'socity/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  public updateSociety(id, obj, successCall, errorCall) {
    this.dataService.put(this.serviceUrl + 'socity/' + id + '/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  // -------------- Resident --------------------------
  public getResidentsList(options, successCall, errorCall) {
    const url = this.serviceUrl + 'get_residents/';
    this.dataService.get(url, options).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  // -------------- Employee --------------------------
  public getEmployeesList(options, successCall, errorCall) {
    const url = this.serviceUrl + 'employee/';
    this.dataService.get(url, options).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public getEmployeeDetailsById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'employee/' + id + '/';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public deleteEmployeeById(id, successCall, errorCall) {
    const url = this.serviceUrl + 'employee/' + id + '/';
    this.dataService.delete(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  public addEmployee(obj, successCall, errorCall) {
    this.dataService.post(this.serviceUrl + 'employee/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  public updateEmployee(id, obj, successCall, errorCall) {
    this.dataService.put(this.serviceUrl + 'employee/' + id + '/', obj).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        // this.logout();
        errorCall();
      }
    );
  }

  public getSocietyNamesLookup(successCall, errorCall) {
    const url = this.serviceUrl + 'get_socities/?search=';
    this.dataService.get(url).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall();
      }
    );
  }

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  public uploadDoc(docPath, file, progressCall, successCall, errorCall) {
    this.dataService
      .uploadFile(this.serviceUrl + docPath + '/', file, false)
      .subscribe(
        (event: any) => {
          switch (event.type) {
            // handle the upload progress event received
            case HttpEventType.UploadProgress:
              const percentDone = Math.round(
                (100 * event.loaded) / event.total
              );
              progressCall(percentDone);
              break;
            // handle the response event received
            case HttpEventType.Response:
              // When getting the full response body
              let res = event.body;
              if (res.success) {
                successCall(res);
              } else {
                errorCall(res);
              }
              break;
          }
        },
        (error: any) => {
          console.log(
            ' Error while uploading Document :  ' + JSON.stringify(error)
          );
          errorCall(error);
        }
      );
  }

  public uploadEmployeePicAndDoc(formData, successCall, errorCall) {
    this.dataService
      .uploadEmployeeFile(this.serviceUrl + 'Upload_files/', 'POST', formData)
      .subscribe(
        (event: any) => {
          switch (event.type) {
            // handle the upload progress event received
            // case HttpEventType.UploadProgress:
            //   const percentDone = Math.round(
            //     (100 * event.loaded) / event.total
            //   );
            //   progressCall(percentDone);
            //   break;
            // handle the response event received
            case HttpEventType.Response:
              // When getting the full response body
              let res = event.body;
              if (res.success) {
                successCall(res);
              } else {
                errorCall(res);
              }
              break;
          }
        },
        (error: any) => {
          console.log(
            ' Error while uploading Document :  ' + JSON.stringify(error)
          );
          errorCall(error);
        }
      );
  }

}
