import { Component } from '@angular/core';
import { RouterLink , Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router={};
  constructor(private _router: Router) {
    this.router = _router;
    // console.log(this.router);
  }
  title = 'app';
}
