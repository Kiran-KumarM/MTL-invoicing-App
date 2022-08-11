import { Component, OnInit } from '@angular/core';
import { IBillDetails ,SharedService} from '../Shared/shared.service';
import { FormBuilder,  Validators, FormGroup } from "@angular/forms";
import { Router ,NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css'],
})


export class BillDetailsComponent implements OnInit {
  color:string='primary';
  checked:boolean=false;
  billDetails! : FormGroup;
  formValue!:IBillDetails;
  updateBillValue!:IBillDetails;
  isEditMode:boolean=false;
  popupVisible:boolean=false;
  impotedbillData:IBillDetails[]=[];
  constructor(private sharedService:SharedService,   public formBuilder: FormBuilder,private router:Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.router.url==='/billDetails'){
        this.isEditMode=false;
        }
        else this.isEditMode=true;
      }
    })

   }

  ngOnInit(): void {

    this.billDetails= this.formBuilder.group({
      invoiceNo: ['', [Validators.required,]],totalAmount:['0.00'],godownCharges:['0.00', [Validators.required,]],halting:['0.00', [Validators.required,]],
      DWBNo: ['', Validators.required],  date: ['', Validators.required], from: ['', Validators.required], to: ['', Validators.required],
      truckNo: ['', Validators.required],partInvNo: ['', Validators.required],paymentStatus:[false],
      weight: ['', Validators.required],frieght: ['0.00', Validators.required],wtCharges: ['0.00', Validators.required],LoadingCharges: ['0.00', Validators.required],


        partydetails :this.formBuilder.group({
          name: ['', [Validators.required,]],state: ['', Validators.required],
          GSTTIN: ['', Validators.required],  AddressLine1: ['', Validators.required], AddressLine2: ['', Validators.required], PIN: ['', Validators.required],
        }),
        consignorDetails :this.formBuilder.group({
          name: ['', [Validators.required,]],state: ['', Validators.required],
          GSTTIN: ['', Validators.required],  AddressLine1: ['', Validators.required], AddressLine2: ['', Validators.required], PIN: ['', Validators.required],
        }),
        consigneedetails :this.formBuilder.group({
          name: ['', [Validators.required,]],state: ['', Validators.required],
          GSTTIN: ['', Validators.required],  AddressLine1: ['', Validators.required], AddressLine2: ['', Validators.required], PIN: ['', Validators.required],
        }),

    })
    if(this.isEditMode){
      this.updateBillValue=this.sharedService.storedbillData('get')
      this.setFormValues(this.updateBillValue); 
    }
    this.getallBills()
  }
  setFormValues(billData:any){
    this.billDetails.controls['invoiceNo'].setValue(billData.invoiceNo);
    this.billDetails.controls['totalAmount'].setValue(billData.totalAmount);
    this.billDetails.controls['godownCharges'].setValue(billData.godownCharges);
    this.billDetails.controls['halting'].setValue(billData.halting);
    this.billDetails.controls['DWBNo'].setValue(billData.DWBNo);
    this.billDetails.controls['date'].setValue(new Date(billData.date));
    this.billDetails.controls['from'].setValue(billData.from);
    this.billDetails.controls['truckNo'].setValue(billData.truckNo);
    this.billDetails.controls['partInvNo'].setValue(billData.partInvNo);
    this.billDetails.controls['paymentStatus'].setValue(billData.paymentStatus);
    this.billDetails.controls['to'].setValue(billData.to);
    this.billDetails.controls['weight'].setValue(billData.weight);
    this.billDetails.controls['frieght'].setValue(billData.frieght);
    this.billDetails.controls['wtCharges'].setValue(billData.wtCharges);
    this.billDetails.controls['LoadingCharges'].setValue(billData.LoadingCharges);
    this.billDetails.controls['partydetails'].setValue(billData.partydetails);
    this.billDetails.controls['consignorDetails'].setValue(billData.consignorDetails);
    this.billDetails.controls['consigneedetails'].setValue(billData.consigneedetails);
  }


  toggelPaymentStatus(event:any){
    this.billDetails.controls['paymentStatus'].setValue(event.checked)
  }

  toggelbilldetails(event:any){
    if(!event.checked){
      let consigneeData={
        "name": "",
        "state": "",
        "GSTTIN": "",
        "AddressLine1": "",
        "AddressLine2": "",
        "PIN": ""
    }
      this.billDetails.controls['consigneedetails'].setValue(consigneeData)
    }
    else{
      let consigneeData=this.billDetails.value.partydetails
      this.billDetails.controls['consigneedetails'].setValue(consigneeData)
    }
  }

  calculateTotalAmount(){
    let totalAmount=(+this.billDetails.value.frieght) + (+this.billDetails.value.wtCharges) + (+this.billDetails.value.LoadingCharges) + (+this.billDetails.value.godownCharges) +(+this.billDetails.value.halting)
    this.billDetails.controls['totalAmount'].setValue(totalAmount.toFixed(2))
    // console.log(new Date('6/12/2022'))
    // this.billDetails.controls['date'].setValue(new Date('11.28.2022'))
  }
  onAddUpdatebill(){
    console.log(this.impotedbillData)
    if(!this.isEditMode && this.impotedbillData.filter(x=>x.invoiceNo==this.billDetails.value.invoiceNo)?.length >0){
      this.sharedService.toaster('Bill No already Exist')
      return;
    }
    this.formValue=this.billDetails.value
    parseInt(this.formValue.frieght).toFixed(2)
    parseInt(this.formValue.godownCharges).toFixed(2)
    parseInt(this.formValue.halting).toFixed(2)
    parseInt(this.formValue.wtCharges).toFixed(2)
    parseInt(this.formValue.LoadingCharges).toFixed(2)

    this.formValue.date=this.billDetails.value.date.toLocaleDateString();
    this.formValue.isAdded=true;
    if(!this.isEditMode){
      this.sharedService.addBill(this.formValue).subscribe((data)=>{
      this.sharedService.toaster('Bill Details Added Successfully')
      this.sharedService.hideloader()
      },
      (error) => {
        this.sharedService.toaster('Something Went Wrong')
        this.sharedService.hideloader()
      })
    }
    else if(this.isEditMode){
      this.sharedService.updateBillbyId(this.updateBillValue.id,this.formValue).subscribe((data)=>{
        this.sharedService.toaster('Bill Updated Successfully')
        this.sharedService.hideloader()
        },
        (error) => {
          this.sharedService.toaster('Something Went Wrong')
          this.sharedService.hideloader()
        })
    }
  }
  closePopup(){
    this.popupVisible=false;
  }
  onImporticon(){
    this.popupVisible=true;
  }
  getallBills(){
    this.sharedService.getallbills().subscribe((data) =>{
      this.sharedService.hideloader()
      for(var i=0;i<Object.keys(data).length;i++){
        this.impotedbillData.push(data[Object.keys(data)[i]])
        this.impotedbillData[i].id=Object.keys(data)[i]
      }
    },
    
    (error)=>{
      this.sharedService.toaster('Something Went Wrong')
      this.sharedService.hideloader()
    })
  }
  onImport(data:any){
    this.closePopup()
    this.setFormValues(data)
  }
}
