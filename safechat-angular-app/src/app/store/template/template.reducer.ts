import { createReducer, on } from '@ngrx/store';
import { addTemplate, removeTemplate, setTemplate, setTemplates } from './template.actions';
import { templateState } from './template.state';

export const templateReducer = createReducer(
  templateState,
  on(setTemplates, (state, { templates }) => ({ ...state, templates })),
  on(setTemplate, (state, { template }) => {
    const _templates = state.templates;
    const _templateIndex = _templates.findIndex(_c => _c.id === template.id);

    _templates[_templateIndex] = template

    return {
      ...state,
      templates: _templates
    }
  }),
  on(addTemplate, (state, { template }) => {
    const _templates = [...state.templates, template];

    return {
      ...state,
      templates: _templates
    }
  }),
  on(removeTemplate, (state, { template }) => {
    const _templates = state.templates;
    const _templateIndex = _templates.findIndex(_c => _c.id === template.id);

    _templates.splice(_templateIndex, 1)

    return {
      ...state,
      templates: _templates
    }
  })
);
