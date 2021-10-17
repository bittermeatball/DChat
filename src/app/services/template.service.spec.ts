import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateService } from './template.service';
import { environment } from 'src/environments/environment';

describe('TemplateService', () => {
  let service: TemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TemplateService,
        { provide: "API_URL", useValue: environment.apiUrl },
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
