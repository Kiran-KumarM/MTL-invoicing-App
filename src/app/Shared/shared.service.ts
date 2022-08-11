import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  MatSnackBar,MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';


export interface IPartydetails {
  name: string;
  GSTTIN: string;
  AddressLine1: string;
  AddressLine2: string;
  PIN: string;
  state: string;
}

export interface IConsignorDetails {
  name: string;
  GSTTIN: string;
  AddressLine1: string;
  AddressLine2: string;
  PIN: string;
  state: string;
}

export interface IConsigneedetails {
  name: string;
  GSTTIN: string;
  AddressLine1: string;
  AddressLine2: string;
  PIN: string;
  state: string;
}

export interface IBillDetails {
  id:string;
  invoiceNo: string;
  DWBNo: string;
  date: string;
  from: string;
  to: string;
  truckNo: string;
  partInvNo: string;
  weight: string;
  frieght: string;
  wtCharges: string;
  LoadingCharges: string;
  godownCharges: string;
  halting: string;
  paymentStatus: boolean;
  partydetails: IPartydetails;
  consignorDetails: IConsignorDetails;
  consigneedetails: IConsigneedetails;
  isAdded:boolean;
  totalAmount:string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  horizontalPosition: MatSnackBarHorizontalPosition = "right" ;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isValidUser:boolean=false;
  storedbill:any;
  constructor(private http: HttpClient,private _snackBar: MatSnackBar,private db: AngularFireDatabase) { }

  hideloader() {
    (document.getElementById('loading') as HTMLBaseElement).style.display = 'none';
  }
  showloader() {
    (document.getElementById('loading') as HTMLBaseElement).style.display = 'flex';
  }
  toaster(message:string){
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration =2500;
    this._snackBar.open(message,'x',config);
  }
  getUserData(email:string){
    this.showloader();
    const param = new HttpParams().set('orderBy', '"email"').set('equalTo',`"${email}"`);
    return this.http.get<any>(environment.apiUrl+'users.json?print=pretty',{ params: param});
  }
  addBill(data:IBillDetails){
    this.showloader();
    return this.http.post<any>(environment.apiUrl+'bills.json?print=pretty',data);
  }
  getallbills(){
    this.showloader();
    return this.http.get<any>(environment.apiUrl+'bills.json?print=pretty');
  }
  getbillByID(invoiceNo:any){
    this.showloader();
    invoiceNo='lkjl'
     const param = new HttpParams().set('orderBy', '"invoiceNo"').set('equalTo',`"${invoiceNo}"`);
     return this.http.get<any>(environment.apiUrl+'bills.json?print=pretty',{ params: param});
  }
  updateBillbyId(id:string,data:IBillDetails){
    this.showloader();
    return this.http.patch<any>(environment.apiUrl+'/bills/'+id+'.json',data);
    //'/bills/-N5-1sIt-N2EKaTKjgxF'
  }
  validUser(){
    this.isValidUser=true;
  }
  notaValidUser(){
    this.isValidUser=false;;
  }
  isvalidUser(){
   // return this.isValidUser;
   return true;
  }
  storedbillData(type:string,data?:any){
    if(type==='store'){
      this.storedbill=data;
      return;
    }
    return this.storedbill
  }

}
