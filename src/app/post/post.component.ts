import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from "./../config"
import * as $ from 'jquery';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post:any ={};
  name: string = "";
  text: string = "";
  showSpinner: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient, public snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  ngOnInit() {
    var routeParams = this.activeRoute.snapshot.params;
    this.http.get(ConfigService.backendUrl + "/post?post_id="+routeParams.post_id)
    .subscribe((val: any) => {
      console.log(val);
      if (val.success) {
        this.post = val.value;
      }
    });
  }

  click_add_comment() {
    var routeParams = this.activeRoute.snapshot.params;
    if (this.name!=="" && this.text!=="") {
    this.showSpinner=true;
    this.http.put(
      ConfigService.backendUrl + "/comment",
      {
        "name": this.name,
        "text": this.text,
        post_id:routeParams.post_id
      })
      .subscribe((val:any) => {
        this.showSpinner=false;
        if (val && val.success) {
          this.post.comments.push(val.value)
          this.name="";
          this.text="";
        }
        else
        {
          this.openSnackBar("Error adding comment: "+ (val ? val.error_msg : ""));
        }
      })
    }
    else
    {
      this.openSnackBar("Fill in all the fields");
    }
  }

}
