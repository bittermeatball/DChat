import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../types/contract.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private http: HttpClient) { }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>('contracts');
  }

  getContract(id: string): Observable<Contract> {
    return this.http.get<Contract>(`contracts/${id}`);
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>('contracts', contract);
  }

  updateContract(id: string, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`contracts/${id}`, contract);
  }

  deleteContract(id: string): Observable<Contract> {
    return this.http.delete<Contract>(`contracts/${id}`);
  }
}
