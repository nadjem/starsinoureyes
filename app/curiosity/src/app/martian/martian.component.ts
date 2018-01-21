import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Http, Response } from "@angular/http";
import { ToastrService } from 'ngx-toastr';

const now = new Date();
@Component({
  selector: 'app-martian',
  templateUrl: './martian.component.html',
  styleUrls: ['./martian.component.css']
})
export class MartianComponent implements OnInit {

  model: NgbDateStruct;
  selectedDate='';
  lastDate;

  date: {year: number, month: number};
  curiosityApiUrl='https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+this.selectedDate+'&api_key=aHwfUbC6Mo3E36644UUmgxHXNfT8gLuTVIPdUiMW';
  curiosityDatas ={"photos":""};
  p:number= 1;
  constructor( private http: Http, private toastr: ToastrService) { }
  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  selectDate(date) {
   /* console.log(date)
    console.log(date.year);
    console.log(date.month);
    console.log(date.day);*/
    if(date.month < 10){
      date.month = '0'+date.month;
    }
   this.selectedDate = date.year+'-'+date.month+'-'+date.day;
   /*console.log(this.selectedDate);*/



   let dateSelected = new Date(this.selectedDate);
   let lastDatePossible = new Date(this.lastDate);
   let landingDate = new Date('2012-08-06');

   if(dateSelected < landingDate){
     this.toastr.warning('select a date more recent than Curiosity\'s landing date.', 'Error', {
       timeOut: 10000,
     });
   }else if(dateSelected > lastDatePossible){
     this.toastr.warning('sorry, but we can\'t read the future ', 'Error', {
       timeOut: 10000,
     });
   }
   else{
     this.getDataForDay();
   }
    /**
     * landing date 2012-08-06
     */


  }
  getDataForDay() {
    this.curiosityApiUrl='https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+this.selectedDate+'&api_key=aHwfUbC6Mo3E36644UUmgxHXNfT8gLuTVIPdUiMW';
    this.http.get(this.curiosityApiUrl).subscribe( data =>{
        this.curiosityDatas = data.json();
        /*console.log(this.curiosityDatas);*/
        if (this.curiosityDatas.photos.length < 1){
          /*console.log('no data');*/
          this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() -2};
          this.selectedDate = this.model.year+'-'+this.model.month+'-'+this.model.day;
          this.lastDate = this.model.year+'-'+this.model.month+'-'+this.model.day;
          this.getDataForDay();
        }else{
         /* console.log('data existe');*/
        }
    })



  }

  ngOnInit() {

    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() -1};
    this.selectedDate = this.model.year+'-'+this.model.month+'-'+this.model.day;
    this.lastDate = this.model.year+'-'+this.model.month+'-'+this.model.day;
    this.getDataForDay();
  }

}
