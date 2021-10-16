import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './detail/edit/edit.component';
import { ContractComponent } from './contract.component';

const routes: Routes = [
  {
    path: 'contract/list',
    component: ContractComponent
  },
  {
    path: 'contract/create',
    component: CreateComponent
  },
  {
    path: 'contract/:id',
    component: DetailComponent
  },
  {
    path: 'contract/:id/edit',
    component: EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
