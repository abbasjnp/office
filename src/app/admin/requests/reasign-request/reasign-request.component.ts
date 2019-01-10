import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-reasign-request',
  templateUrl: './reasign-request.component.html',
  styleUrls: ['./reasign-request.component.css']
})
 export class ReasignRequestComponent implements OnInit {

constructor( public dialogRef: MatDialogRef<ReasignRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

 ngOnInit() {
   }
   onNoClick(): void {
    this.dialogRef.close();
  }

  reasignEmployee(searchedTerm){
    console.log(searchedTerm);
  }

}
 