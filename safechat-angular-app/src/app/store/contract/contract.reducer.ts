import { createReducer, on } from '@ngrx/store';
import { addContract, getContracts, removeContract, setContract, setContracts } from './contract.actions';
import { contractState } from './contract.state';

export const contractReducer = createReducer(
  contractState,
  on(getContracts, (state) => {
    console.log('Helllllll')

    return state;
  }),
  on(setContracts, (state, { contracts }) => ({ ...state, contracts })),
  on(setContract, (state, { contract }) => {
    const _contracts = state.contracts;
    const _contractIndex = _contracts.findIndex(_c => _c.id === contract.id);

    _contracts[_contractIndex] = contract

    return {
      ...state,
      contracts: _contracts
    }
  }),
  on(addContract, (state, { contract }) => {
    const _contracts = [...state.contracts, contract];

    return {
      ...state,
      contracts: _contracts
    }
  }),
  on(removeContract, (state, { contract }) => {
    const _contracts = state.contracts;
    const _contractIndex = _contracts.findIndex(_c => _c.id === contract.id);

    _contracts.splice(_contractIndex, 1)

    return {
      ...state,
      contracts: _contracts
    }
  })
);
