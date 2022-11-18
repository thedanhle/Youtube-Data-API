import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  isLoading:boolean = false;
  error:string = '';
  response:any = {};

  search:any = { category: ''}

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  searchYoutube(): void {
    this.isLoading = true;

    const url = 'https://www.googleapis.com/youtube/v33/search';

    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyAHEb-OdV1We9j9qV06YfrOYEGN64MnwVs')
      .set('q', this.search.category)

    const options = { params: urlParams}
  }

}
