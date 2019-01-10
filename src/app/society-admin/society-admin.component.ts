import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-society-admin',
  templateUrl: './society-admin.component.html',
  styleUrls: ['./society-admin.component.css']
})
export class SocietyAdminComponent implements OnInit {
  public user: any;
  public navs: any;

  alerts = [];
  alertCount = 0;
  alertsInterval: any;
  constructor(
  ) {
    this.navs = [
      // {
      //   title: 'Dashboard',
      //   url: '/society-admin/dashboard',
      //   icon: 'glyphicon glyphicon-th-large',
      //   enable: true,
      //   visible: true,
      //   subNavs: []
      // },
      {
        title: 'Resident',
        url: '/society-admin/manage-resident',
        icon: '../../../assets/img/resident.svg',
        enable: true,
        visible: true,
        subNavs: []
      },
      {
        title: 'Employee',
        url: '/society-admin/manage-employee',
        icon: '../../../assets/img/society.svg',
        enable: true,
        visible: true,
        subNavs: []
      },
    ];
  }

  markAsRead(event) {}
  ngOnInit() {
  }

}
