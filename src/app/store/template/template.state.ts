import { Template } from 'src/app/core/models/template.model';

export const templateState = {
  templates: [] as Template[],
};

export type TemplateState = typeof templateState;