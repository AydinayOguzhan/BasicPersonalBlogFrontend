import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomePagePostDate } from 'src/app/models/homePagePostDate/homePagePostDate';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class HomePagePostDateService {
  apiUrl = "https://localhost:44335/api/"

  constructor(private httpClient:HttpClient) { }

  get():Observable<SingleResponseModel<HomePagePostDate>>{
    let newPath = this.apiUrl + "homepagepostdates/get"
    return this.httpClient.get<SingleResponseModel<HomePagePostDate>>(newPath)
  }
}
