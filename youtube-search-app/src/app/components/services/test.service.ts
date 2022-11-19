import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  constructor() { }
  public videoid: string;
  public videoTitle: string;
  public videoChannel: string;

}
