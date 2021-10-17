import { createSelector } from "@ngrx/store";
import { Contract } from 'src/app/core/models/contract.model';
import { ContractState } from './contract.state';
 
export const selectContracts = createSelector(
  (state: ContractState) => state.contracts,
  (contracts: Contract[]) => contracts
);
