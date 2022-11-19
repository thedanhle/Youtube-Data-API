import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  constructor(private sanitizer: DomSanitizer, public _testService: TestService) { }

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
