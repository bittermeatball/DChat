import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Auth } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { getCurrentUser, setCurrentUser } from './auth.actions';
 
@Injectable()
export class ContractEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
      ofType(getCurrentUser),
      exhaustMap(({ id }) => this.authService.getCurrentUser<Auth>(id).pipe(
          map(currentUser => setCurrentUser({ currentUser })),
          catchError(error => of(error))
        )
      )
    )
  );
}