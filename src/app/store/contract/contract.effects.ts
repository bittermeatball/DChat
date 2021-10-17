import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Contract } from 'src/app/core/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { getContracts, setContracts } from './contract.actions';
 
@Injectable()
export class ContractEffects {
  constructor(
    private actions$: Actions,
    private contractService: ContractService
  ) {}

  getContracts$ = createEffect(() => this.actions$.pipe(
      ofType(getContracts),
      exhaustMap(action => this.contractService.getMany<Contract>().pipe(
          map(contracts => setContracts({ contracts })),
          catchError(error => of(error))
        )
      )
    )
  );
}