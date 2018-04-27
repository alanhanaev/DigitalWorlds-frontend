import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from "./../config"

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(ConfigService.backendUrl + "/posts")
      .subscribe((val: any) => {
        if (val.success) {
          this.posts = val.values;
        }
      });
  }

}
