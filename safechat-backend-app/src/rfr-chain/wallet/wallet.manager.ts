import { Wallet } from './wallet';

interface WalletBox {
  [publicKey: string]: {
    wallet: Wallet;
    username: any;
  };
}

export class WalletManager {
  public walletBox: WalletBox = {};

  public addWallet(wallet: Wallet, username: any) {
    if (!this.walletBox[wallet.publicToken]) {
      this.walletBox[wallet.publicToken] = {
        wallet,
        username,
      };
      console.log(this.walletBox);

      return wallet.publicToken;
    }
  }

  public extractUserLocationByPublicToken(
    publicToken: string,
  ): string | undefined {
    if (this.walletBox[publicToken]) {
      const { username } = this.walletBox[publicToken];
      return username;
    }
    return undefined;
  }

  public getPublicKeyBySearchUser(username: string) {
    const boxWallets = Object.values(this.walletBox);

    for (let i = 0; i < boxWallets.length; i++) {
      const boxWallet = boxWallets[i];
      if (username === boxWallet.username) {
        return boxWallet.wallet.publicToken;
      }
    }

    return undefined;
  }

  public getWalletByPublicKey(publicToken: string) {
    return this.walletBox[publicToken].wallet;
  }
}
