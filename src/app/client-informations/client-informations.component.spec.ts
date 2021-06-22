import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInformationsComponent } from './client-informations.component';

describe('ClientInformationsComponent', () => {
  let component: ClientInformationsComponent;
  let fixture: ComponentFixture<ClientInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
