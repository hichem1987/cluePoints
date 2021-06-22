import {Component, OnInit} from '@angular/core';
import {ClientAccountsServiceService} from '../client-accounts-service.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-accounts-list',
  templateUrl: './client-accounts-list.component.html',
  styleUrls: ['./client-accounts-list.component.scss'],
  providers: [ClientAccountsServiceService]
})
export class ClientAccountsListComponent implements OnInit {
  isReady: boolean;
  loadedAllDefault: any;
  allClient: any;
  names: string[];
  output: string[];
  faSearch = faSearch;

  constructor(private clientAccountsServiceSvc: ClientAccountsServiceService) {
  }

  ngOnInit() {
    this.clientAccountsServiceSvc.loadClients().subscribe((res) => {
      this.allClient = res;
      this.loadedAllDefault = JSON.parse(JSON.stringify(this.allClient));
      this.names = Array.from(new Set(this.allClient.map((element) => element.firstname)));
      this.isReady = true;
    }, error => {
      console.log('error', error);
    });
  }

  search(event) {
    this.output = this.names.filter(c => c.toLowerCase().includes(event.query.toLowerCase()));
  }

  elementSelected(event) {
    this.allClient = this.allClient.filter((element) => element.firstname === event);
  }

  onClear() {
    this.allClient = JSON.parse(JSON.stringify(this.loadedAllDefault));
  }
}
