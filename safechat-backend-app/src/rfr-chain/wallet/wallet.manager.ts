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
    if (!this.walletBox[wallet.publicKey]) {
      this.walletBox[wallet.publicKey] = {
        wallet,
        username,
      };
      console.log(this.walletBox);

      return wallet.publicKey;
    }
  }

  public extractUserLocationByPublicToken(
    publicKey: string,
  ): string | undefined {
    if (this.walletBox[publicKey]) {
      const { username } = this.walletBox[publicKey];
      return username;
    }
    return undefined;
  }

  public getPublicKeyBySearchUser(username: string) {
    Object.values(this.walletBox).forEach((boxData) => {
      if (username === boxData.username) {
        return boxData.wallet.publicKey;
      }
    });

    return undefined;
  }
}
