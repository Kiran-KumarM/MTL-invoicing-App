import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBillDetails, SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  billData:IBillDetails[]=[];
  constructor(private sharedService:SharedService,private route: Router) { }

  ngOnInit(): void {
   this.getallBills();
  // this.getbillbyId()
  }
 getallBills(){
  this.sharedService.getallbills().subscribe((data) =>{
    this.sharedService.hideloader()
    console.log(data)
    for(var i=0;i<Object.keys(data).length;i++){
      this.billData.push(data[Object.keys(data)[i]])
      this.billData[i].id=Object.keys(data)[i]
    }
   // this.billData=data;
    console.log( this.billData)
  },
  
  (error)=>{
    this.sharedService.toaster('Something Went Wrong')
    this.sharedService.hideloader()
  })
 }

 getbillbyId(){
  this.sharedService.getbillByID('dfsd').subscribe((data) =>{
    this.sharedService.hideloader()
    console.log(data)
  },
  (error)=>{
    this.sharedService.toaster('Something Went Wrong')
    this.sharedService.hideloader()
  })
 }
 editBills(data:any){
  this.sharedService.storedbillData('store',data);
  this.route.navigateByUrl('editbillDetails')
 }
}
