import { Component,OnInit } from '@angular/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Router ,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MTLinvoicing';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  navList=[{id:1,name:'Dashboard',url:'dashboard'},{id:2,name:'Add/Edit Bill',url:'billDetails'},{id:3,name:'GST',url:'gst'}]
  selectedNav!:number;
  isLogin!:boolean;
 constructor(private router: Router){
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if(this.router.url==='/login'){
      this.isLogin=true;
      }
      else this.isLogin=false;
      this.setNavValue(this.router.url)
    }
  })
  }
  ngOnInit(): void {
    this.selectedNav=1;
  }
  setNavValue(url:string){
    if(url==='/dashboard')  this.selectedNav=1;
    else if(url==='/billDetails' || url ==='/editbillDetails' ) this.selectedNav=2;
    else if(url==='/gst') this.selectedNav=3;
  }

  onNavSelect(data:any){
    this.router.navigateByUrl(data.url)
  }
}

