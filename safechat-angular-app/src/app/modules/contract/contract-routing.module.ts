import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './detail/edit/edit.component';
import { ContractComponent } from './contract.component';

export const routes: Routes = [
  {
    path: 'contracts',
    component: ContractComponent
  },
  {
    path: 'contracts/create',
    component: CreateComponent
  },
  {
    path: 'contracts/:id',
    component: DetailComponent
  },
  {
    path: 'contracts/:id/edit',
    component: EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
