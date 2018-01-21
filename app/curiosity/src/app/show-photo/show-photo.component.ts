import { Component, OnInit } from '@angular/core';
import {Http,Response} from "@angular/http";
import "rxjs/add/operator/map"
@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.css']
})
export class ShowPhotoComponent implements OnInit {
  querie='';
  pageCount;
  page = 1;
  onlyOnePage:boolean=true;
  apiUrl="https://images-api.nasa.gov/search?q="+this.querie+"&media_type=image";
  dataResult={"collection":{
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
    listContent = [ {
      id: 1,
      description: 'Curiosity'
    },
    {
      id: 2,
      description: 'Hubble'
    },
    {
      id: 3,
      description: 'Moon'
    },
    {
      id: 4,
      description: 'Sun'
    },
    {
      id: 5,
      description: 'Earth'
    },
  ];
  constructor(private http: Http) { }
  onChangeSelectPhoto(e){
    console.log(e);
    this.querie=e;
    this.apiUrl="https://images-api.nasa.gov/search?q="+this.querie+"&media_type=image";
    this.http.get(this.apiUrl).subscribe(data =>{
      this.dataResult = data.json();
        console.log(this.dataResult);
      if (parseInt(this.dataResult.collection.metadata.total_hits) > 100){

        this.pageCount = parseInt(this.dataResult.collection.metadata.total_hits)/100;
        console.log(Math.ceil(this.pageCount));
        this.pageCount = Math.ceil(this.pageCount);
        this.pageCount = Math.ceil(this.pageCount)*10;
        this.getdataForPage(1);
this.onlyOnePage= false;
      }else{
        this.onlyOnePage= true;
        this.dataResult = data.json();
      }

    });
}

  getdataForPage(page){

    return this.http.get('https://images-api.nasa.gov/search?q='+this.querie+'&page='+page+'&media_type=image').subscribe(data =>{
      /*this.loading = false;*/
      this.dataResult = data.json();
      console.log(this.dataResult );
      window.scrollTo(0, 0)
    })
  }
  pageChange(page){
    console.log(page);
    this.getdataForPage(page);
  }
  ngOnInit() {

    this.querie="curiosity";
    this.apiUrl="https://images-api.nasa.gov/search?q="+this.querie+"&media_type=image";
    this.http.get(this.apiUrl).subscribe(data =>{
      this.dataResult = data.json();
      console.log(this.dataResult);
      if (parseInt(this.dataResult.collection.metadata.total_hits) > 100){

        this.pageCount = parseInt(this.dataResult.collection.metadata.total_hits)/100;
        console.log(Math.ceil(this.pageCount));
        this.pageCount = Math.ceil(this.pageCount);
        this.pageCount = Math.ceil(this.pageCount)*10;
        this.getdataForPage(1);

      }else{
        this.onlyOnePage= true;
        this.dataResult = data.json();
      }

    });

  }

}
