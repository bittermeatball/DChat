import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractService } from './contract.service';
import { environment } from 'src/environments/environment';

describe('ContractService', () => {
  let service: ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContractService,
        { provide: "API_URL", useValue: environment.apiUrl },
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
