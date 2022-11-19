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
    //throw new Error('Method not implemented.');
  }

  isLoading:boolean = false;
  error:string = '';
  response:any = {};

  search:any = { keyword:'', type:'dog'};

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  searchYoutube(): void {
    this.isLoading = true;

    const url = 'https://www.googleapis.com/youtube/v3/search';

    const urlParams = new HttpParams()
      .set('key', 'AIzaSyCoEBVnuBMfFkFJnWQs7l84_H3rdSGqXbg')
      .set('part', 'snippet')
      .set('type', 'video')
      .set('q', this.search.type + this.search.keyword)
      .set('maxResults', 10)

    const options = { params: urlParams};

    this.http.get<any>(url, options).subscribe(
      (data) => {
        this.response = data;
        this.isLoading = false;
      },
      (err) => {
        this.error = err;
        this.isLoading = false;
      });
  }

  getVideoSource(id: string): SafeResourceUrl {
    if(id != ''){
      const url = "https://www.youtube.com/embed/" + id;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else{
      return '';
    }
  }

}
