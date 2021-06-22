import { TestBed } from '@angular/core/testing';

import { ClientAccountsServiceService } from './client-accounts-service.service';

describe('ClientAccountsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientAccountsServiceService = TestBed.get(ClientAccountsServiceService);
    expect(service).toBeTruthy();
  });
});
