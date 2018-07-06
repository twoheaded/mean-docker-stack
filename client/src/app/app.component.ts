import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';

interface IData {
  host?: string,
  req_host?: string,
  req_ip?: string,
  date?: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataSource = new MatTableDataSource<IData>();
  displayedColumns: string[] = ['host', 'req_host', 'req_ip', 'date'];

  constructor(private http: HttpClient) {
    this.ping();
  }

  ping() {
    this.http.get<IData[]>('http://127.0.0.1:3000/')
      .subscribe((data: IData[]) => {
        this.dataSource.data = data;
      });
  }
}
