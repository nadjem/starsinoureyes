import { Component, OnInit } from '@angular/core';
import { Http,Response} from "@angular/http";
@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class ApodComponent implements OnInit {
apodApi='https://api.nasa.gov/planetary/apod?api_key=aHwfUbC6Mo3E36644UUmgxHXNfT8gLuTVIPdUiMW';
translateApi='http://mejdan.fr/api/translate';
translateData='';
selectedEntry;
isTranslated:boolean=false;
translatedExplanation='';
apodData={copyright :"",
          date: "",
          explanation:"",
          hdurl: "",
          media_type:"",
          service_version:"",
          title:"",
          url:""
};
  entries = [ {
    id: 1,
    description: 'en'
  },
    {
      id: 2,
      description: 'fr'
    },
  ];
  constructor(private http: Http) { }

getApodData(){
    this.http.get(this.apodApi).subscribe( data =>{
    this.apodData =data.json();
   /* console.log(this.apodData.explanation);*/
      this.getTranslation(this.apodData.explanation);

    });
}

getTranslation(words){
  this.http.post(this.translateApi,{data:words}).subscribe(
    data2 =>{

      this.translateData=data2.json();
      /*console.log(this.translateData);*/
      this.translatedExplanation = this.translateData;
    }
  )
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
  ngOnInit() {
  this.getApodData();

  }

}
