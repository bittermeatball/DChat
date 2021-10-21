import { createAction, props } from '@ngrx/store';
import { Contract } from 'src/app/core/models/contract.model';
 
export const getContracts = createAction(
  '[Contract/API] Get many Contracts',
);

export const getContract = createAction(
  '[Contract/API] Get one Contract',
  props<{ contractId: string }>()
);

export const updateContract = createAction(
  '[Contract/API] Update one Contract',
  props<{ contractId: string }>()
);

export const deleteContract = createAction(
  '[Contract/API] Delete one Contract',
  props<{ contractId: string }>()
);

export const setContracts = createAction(
  '[Contract] Set the contract list',
  props<{ contracts: Contract[] }>()
);

export const setContract = createAction(
  '[Contract] Set one contract',
  props<{ contract: Contract }>()
);

export const addContract = createAction(
  '[Contract] Add one contract',
  props<{ contract: Contract }>()
);

export const removeContract = createAction(
  '[Contract] Remove one contract',
  props<{ contract: Contract }>()
);
