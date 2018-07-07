import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  data: IData[];

  constructor(private http: HttpClient) {
    this.ping();
  }

  ping() {
    this.http.get<IData[]>('http://127.0.0.1:3000/')
      .subscribe((data: IData[]) => {
        this.data = data;
      });
  }
}
