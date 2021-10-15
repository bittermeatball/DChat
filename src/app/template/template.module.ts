import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { EditComponent } from './detail/edit/edit.component';

@NgModule({
  declarations: [
    TemplateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
