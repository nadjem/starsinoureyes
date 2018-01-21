import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Http , Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public loading = false;
  translateApi='http://mejdan.fr/api/translate';
  translateData='';
  translated_desc='';
  selectedEntry;
  isTranslated:boolean=false;
  translatedExplanation='';
  searchInput: string;
  showOverlay:boolean=false;
  query:string;
  pageCount;
  detailViewData :{data:{
    description:''
  }};

  page = 1;
  keySearch;
  datasSearch ={"collection":{
                    "metadata":{
                      "total_hits":""
                                }
                              }
                };
  data ={"collection":{
    "metadata":{
      "total_hits":""
    }
  }
  };
  apiUrlSearch='';
  searchForm : FormGroup;
  entries = [ {
    id: 1,
    description: 'en'
  },
    {
      id: 2,
      description: 'fr'
    },
  ];
  p: number = 1;
  constructor(fb: FormBuilder , private http:Http) {

    this.searchForm = fb.group(
      {
        'searchInput':''
      }
    )

  }
  onSubmit(value: any):void{
    this.loading = true;
    console.log('Reactive Form Data: ');

    console.log(value);
    this.keySearch = value.searchInput;
this.query =  value.searchInput.replace(new RegExp(" ", 'g'), "%20");
this.apiUrlSearch ='https://images-api.nasa.gov/search?q='+this.query+'&media_type=image';
console.log(this.apiUrlSearch);
    this.getData()
  }

  pageChange(page){
    console.log(page);
    this.getdataForPage(page);
  }

  loadingOn() {
    this.loading = true;
  }
  onSelectionChange(entry) {
    this.selectedEntry = entry;
    console.log(this.selectedEntry.description);
    switch (this.selectedEntry.description){
      case "en":
        this.isTranslated=false;
        break;
      case "fr":
        this.isTranslated=true;
        break;
      default:
        this.isTranslated=false;
        break;
    }
  }
  getData() {
    return this.http.get(this.apiUrlSearch).subscribe(datas =>{
      this.datasSearch = datas.json();


      if (parseInt(this.datasSearch.collection.metadata.total_hits) > 100){

         this.pageCount = parseInt(this.datasSearch.collection.metadata.total_hits)/100;
        console.log(Math.ceil(this.pageCount));
        this.pageCount = Math.ceil(this.pageCount)*10;
        console.log(this.pageCount);
        this.getdataForPage(1);

      }else{
        this.loading = false;
        this.data = datas.json();
        console.log(this.data);
        window.scrollTo(0, 0)
      }

    });
  }
getdataForPage(page){

    return this.http.get('https://images-api.nasa.gov/search?q='+this.query+'&page='+page+'&media_type=image').subscribe(data =>{
      this.loading = false;
      this.data = data.json();
      console.log(this.data);
      window.scrollTo(0, 0)
    })
}

find(key) {
  this.loading = true;
  this.query =  key;
  this.keySearch = key;
  this.apiUrlSearch ='https://images-api.nasa.gov/search?q='+this.query+'&media_type=image';
  console.log(this.apiUrlSearch);
  this.getData()

}
  cardDetail(detail){
  console.log('showDetail');
  console.log(detail);
  this.showOverlay = true;
  this.detailViewData=detail;
this.getTranslation(this.detailViewData.data[0].description)
    this.translated_desc = 'no translation, sorry :( '
  }

  getTranslation(words){

    this.loading = true;
    this.http.post(this.translateApi,{data:String(words)}).subscribe(
      data2 =>{
        this.loading = false;
        this.translateData=data2.json();
        console.log(this.translateData);
        this.translated_desc = this.translateData;
      },err =>{
        this.loading = false;
        this.translated_desc = err;
      }
    )
  }

  closeOverlay() {
    this.showOverlay = false;
    this.translated_desc ="";
    this.isTranslated=false;
  }
  ngOnInit() {
  }

}
