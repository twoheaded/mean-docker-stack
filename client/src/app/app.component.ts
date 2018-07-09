import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

interface IData {
  host?: string,
  req_host?: string,
  req_ip?: string,
  date?: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private apiPath = environment.api || 'http://localhost:3000/';

  data: IData[];

  constructor(private http: HttpClient) {
    this.ping();
  }

  ping() {
    this.http.get<IData[]>(this.apiPath)
      .subscribe((data: IData[]) => {
        this.data = data;
      });
  }
}
