import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';
import {ChartModule} from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ClientInformationsComponent} from './client-informations/client-informations.component';
import {ModalComponent} from './modal/modal.component';
import {ClientAccountsListComponent} from './client-accounts-list/client-accounts-list.component';

@NgModule({
  declarations: [
    ClientAccountsListComponent,
    ClientInformationsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AutoCompleteModule, BrowserAnimationsModule, DialogModule,
    ChartModule, TableModule, FontAwesomeModule,
    PanelModule
  ],
  providers: [],
  bootstrap: [ClientAccountsListComponent],
  schemas:
    [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
