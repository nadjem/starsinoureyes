import { Component, OnInit } from '@angular/core';
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-curiosity-photo',
  templateUrl: './curiosity-photo.component.html',
  styleUrls: ['./curiosity-photo.component.css']
})
export class CuriosityPhotoComponent implements OnInit {
  /**
   * ROVER
   *
   */
apiUrlRover='https://images-api.nasa.gov/search?q=curiosity&media_type=image';
datasRover ={};
p_rover:number;
p_roverCol:number;

  /**
   * HUBBLE
   *
   */
apiUrlHubble='https://images-api.nasa.gov/search?q=hubble&media_type=image';
  datasHubble = {};
  p: number = 1;
  p_satCol: number = 1;

  /**
   *
   *  MOON
   */
apiUrlMoon='https://images-api.nasa.gov/search?q=moon&media_type=image';
  datasMoon = {};
  p_moon:number;
  p_moonCol:number;


  showRover :boolean = true;
  showHubble :boolean = false;
  showMoon :boolean = false;
  showRoverCollection :boolean = false;
  showMoonCollection :boolean = false;
  showHubbleCollection :boolean = false;

  constructor(private http: Http) { }

  /**
   *
   * mars rover project querie
   */
  getDataRover() {
    return this.http.get(this.apiUrlRover).subscribe(datasRover =>{
      this.datasRover = datasRover.json();
      /*console.log('rover');
      console.log(this.datasRover);*/
    })
  }

  /**
   *
   * hubble querie
   */
  getDataHubble() {
    return this.http.get(this.apiUrlHubble).subscribe(dataHubble =>{
      this.datasHubble = dataHubble.json();
      /*console.log('hubble');
      console.log(this.datasHubble);*/
    })
  }
  /**
   *
   * moon querie
   */
  getDataMoon() {
    return this.http.get(this.apiUrlMoon).subscribe(dataHubble =>{
      this.datasMoon = dataHubble.json();
      /*console.log('moon');
      console.log(this.datasMoon);*/
    })
  }
  showRoverColl() {
    this.showRoverCollection = !this.showRoverCollection;
    this.showMoonCollection = false;
    this.showHubbleCollection = false;
  }
  showMoonColl() {
    this.showMoonCollection= !this.showMoonCollection;
    this.showHubbleCollection = false;
    this.showRoverCollection = false;
  }
  showHubbleColl() {
    this.showHubbleCollection = !this.showHubbleCollection;
    this.showMoonCollection = false;
    this.showRoverCollection = false;
  }
  onChangeSelectPhoto(e) {
    /*console.log(e);*/
    this.showHubbleCollection = false;
    this.showMoonCollection = false;
    this.showRoverCollection = false;
    switch (e) {
      case 'Mars-Curiosity project':
        this.showRover = true;
        this.showMoon = false;
        this.showHubble = false;
        break;
      case 'Hubble':
        this.showRover = false;
        this.showMoon = false;
        this.showHubble = true;
        break;
      case 'Moon':
        this.showRover = false;
        this.showMoon = true;
        this.showHubble = false;
        break;
      default:
        this.showRover = true;
        this.showMoon = false;
        this.showHubble = false;
    }
  }
  ngOnInit() {

this.getDataRover();
this.getDataHubble();
this.getDataMoon();




  }

}
