import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Template } from 'src/app/core/models/template.model';
import { TemplateService } from 'src/app/services/template.service';
import { getTemplates, setTemplates } from './template.actions';
 
@Injectable()
export class TemplateEffects {
  constructor(
    private actions$: Actions,
    private templateService: TemplateService,
  ) {}

  getTemplates$ = createEffect(() => this.actions$.pipe(
      ofType(getTemplates),
      exhaustMap(action => this.templateService.getMany<Template>().pipe(
          map(templates => setTemplates({ templates })),
          catchError(error => of(error))
        )
      )
    )
  );
}