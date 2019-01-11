import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-reasign-request',
  templateUrl: './reasign-request.component.html',
  styleUrls: ['./reasign-request.component.css']
})
 export class ReasignRequestComponent implements OnInit {
  reasignEmployeeView:boolean=false;

constructor( public dialogRef: MatDialogRef<ReasignRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      console.log(data.reasignEmployeeView);
      console.log(data.element.id)
     }
    

 ngOnInit() {
   }
   onNoClick(): void {
    this.dialogRef.close();
    this.reasignEmployeeView=false;
  }

  reasignEmployee(searchedTerm){
    console.log(searchedTerm);
  }

}
 