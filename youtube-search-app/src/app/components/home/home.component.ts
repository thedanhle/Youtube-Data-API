import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  pageSize: number = 25; //This is how many videos will be rendered total
  VIDEOS: any;
  tableSize: number = 5; //videos per page
  //tableSizes: any = [5, 10, 15, 20];


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  isLoading:boolean = false;
  error:string = '';
  response:any = {};

  search:any = { keyword:'', type:'dog'};

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private _testService: TestService) { }

  public btnClick(id: string): void {
    this._testService.myData = id;
  }

  searchYoutube(): void {
    this.isLoading = true;

    const url = 'https://www.googleapis.com/youtube/v3/search';

    const urlParams = new HttpParams()
      .set('key', 'AIzaSyDJV-fZjnOjCztnkreBXtOmwPXZrwqVkoQ')
      .set('part', 'snippet')
      .set('type', 'video')
      .set('q', this.search.type + this.search.keyword)
      .set('maxResults',this.pageSize)

    const options = { params: urlParams};

    this.http.get<any>(url, options).subscribe(
      (data) => {
        this.VIDEOS = this.response;
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

  onTableDataChange(event: any) {
    this.page = event;
    this.searchYoutube()
  }

  onTableSizeChange(event: any):void {
    this.tableSize= event.target.value;
    this.page = 1;
    this.searchYoutube();
  }

}
