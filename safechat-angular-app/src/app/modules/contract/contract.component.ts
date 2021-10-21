import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoaderService } from 'src/app/core/services/loader.service';
import { getContracts } from 'src/app/store/contract/contract.actions';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  loading$ = false;

  constructor(
    private store: Store,
    private loader: LoaderService,
  ) {
    this.loader.loading$.subscribe(loading => {
      this.loading$ = loading
    })
  }

  ngOnInit(): void {
    this.store.dispatch(getContracts())
  }

}
