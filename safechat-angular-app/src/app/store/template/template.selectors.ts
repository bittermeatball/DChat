import { createSelector } from "@ngrx/store";
import { Template } from 'src/app/core/models/template.model';
import { TemplateState } from './template.state';
 
export const selectTemplates = createSelector(
  (state: TemplateState) => state.templates,
  (templates: Template[]) => templates
);
