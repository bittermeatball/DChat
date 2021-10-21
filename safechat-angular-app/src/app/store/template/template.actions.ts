import { createAction, props } from '@ngrx/store';
import { Template } from 'src/app/core/models/template.model';
 
export const getTemplates = createAction(
  '[Template/API] Get many Templates',
);

export const getTemplate = createAction(
  '[Template/API] Get one Template',
  props<{ templateId: string }>()
);

export const updateTemplate = createAction(
  '[Template/API] Update one Template',
  props<{ templateId: string }>()
);

export const deleteTemplate = createAction(
  '[Template/API] Delete one Template',
  props<{ templateId: string }>()
);

export const setTemplates = createAction(
  '[Template] Set the template list',
  props<{ templates: Template[] }>()
);

export const setTemplate = createAction(
  '[Template] Set one template',
  props<{ template: Template }>()
);

export const addTemplate = createAction(
  '[Template] Add one template',
  props<{ template: Template }>()
);

export const removeTemplate = createAction(
  '[Template] Remove one template',
  props<{ template: Template }>()
);
