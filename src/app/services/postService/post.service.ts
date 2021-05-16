import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from 'src/app/models/claim/claimModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { PostModel } from 'src/app/models/post/postModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl = "https://localhost:44335/api/"

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<PostModel>>{
    let newPath = this.apiUrl + "posts/getall"
    return this.httpClient.get<ListResponseModel<PostModel>>(newPath)
  }

  getAllNDaysBefore(date:any):Observable<ListResponseModel<PostModel>>{
    let newPath = this.apiUrl + "posts/getallndaysbefore?date=" + date
    return this.httpClient.get<ListResponseModel<PostModel>>(newPath)
  }

  getById(postId:number):Observable<SingleResponseModel<PostModel>>{
    let newPath = this.apiUrl + "posts/getbyid?id=" + postId
    return this.httpClient.get<SingleResponseModel<PostModel>>(newPath)
  }

}
