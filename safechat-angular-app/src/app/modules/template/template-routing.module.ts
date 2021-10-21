import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './detail/edit/edit.component';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  {
    path: 'templates',
    component: TemplateComponent
  },
  {
    path: 'templates/create',
    component: CreateComponent
  },
  {
    path: 'templates/:id',
    component: DetailComponent
  },
  {
    path: 'templates/:id/edit',
    component: EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
