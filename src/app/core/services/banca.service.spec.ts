import { TestBed } from '@angular/core/testing';

import { BancaService } from './banca.service';

describe('BancaService', () => {
  let service: BancaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
