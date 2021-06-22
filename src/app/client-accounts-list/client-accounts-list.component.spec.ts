import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountsListComponent } from './client-accounts-list.component';

describe('ClientAccountsListComponent', () => {
  let component: ClientAccountsListComponent;
  let fixture: ComponentFixture<ClientAccountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
