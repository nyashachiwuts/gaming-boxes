import { Component, OnInit } from '@angular/core';
import { gql, Apollo, QueryRef } from 'apollo-angular'
import { User } from '../models/user';

const GetData = gql`query{
  currentUser {
    id
    name
    wallets {
      id
      amount
      currency
    }
  }
}`;

const WALLET_UPDATES_SUBSCRIPTION = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }
`

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  user: User | null = null;
  walletSum: number = 0;
  walletQuery: QueryRef<any>;

  constructor(private apollo:Apollo){
    this.walletQuery = apollo.watchQuery({
      query: GetData
    })
  }

  ngOnInit(): void {
    this.subscribeToWalletUpdates()
    this.apollo.watchQuery<any>({
      query: GetData
    }).valueChanges
    .subscribe(({ data }) => {
      this.user = data.currentUser
      this.walletSum = this.user ? this.user.wallets.reduce((acc, val) => acc + val.amount, 0) : 0
    })
  }

  subscribeToWalletUpdates(): void {
    this.walletQuery.subscribeToMore({
      document: WALLET_UPDATES_SUBSCRIPTION
    })
  }
}
