import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'https://mighty-oasis-32829.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class ClientAccountsServiceService {

  constructor(private http: HttpClient) {
  }

  loadClients(): Observable<any> {

    return this.http.get(API_URL + `/clients`);
  }

  loadAccounts(id = null): Observable<any> {
    let param = '';
    if (id) {
      param = `?client=${id}`;
    }
    return this.http.get(API_URL + `/accounts${param}`);
  }
}
