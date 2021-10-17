import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/store/app.reducer';
import { contractReducer } from 'src/app/store/contract/contract.reducer';
import { templateReducer } from 'src/app/store/template/template.reducer';
import { routes } from './contract-routing.module';

import { ContractComponent } from './contract.component';

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RouterTestingModule.withRoutes([...routes]),
        StoreModule.forRoot({ app: appReducer, contracts: contractReducer, templates: templateReducer }),
      ],
      declarations: [ ContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
