import { Contract } from 'src/app/core/models/contract.model';

export const contractState = {
  contracts: [] as Contract[],
};

export type ContractState = typeof contractState;