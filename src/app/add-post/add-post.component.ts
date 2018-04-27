import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from "./../config"

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  name: string = "";
  text: string = "";
  showSpinner: boolean = false;
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  click_add_post() {
    if (this.name !== "" && this.text !== "") {
      this.showSpinner = true;
      this.http.put(
        ConfigService.backendUrl + "/post",
        {
          "name": this.name,
          "text": this.text
        })
        .subscribe((val: any) => {
          this.showSpinner = false;
          if (val && val.success) {
            this.router.navigate(['/posts/' + val.value._id])
          }
          else {
            this.openSnackBar("Error adding post: " + (val ? val.error_msg : ""));
          }
        })
    }
    else {
      this.openSnackBar("Fill in all the fields");
    }
  }

}
