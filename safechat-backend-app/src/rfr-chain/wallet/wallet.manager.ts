import { ChainUtil } from '../util/chain.util';
import { Wallet } from './wallet';

interface WalletBox {
  [publicKey: string]: {
    wallet: Wallet;
    location: any;
  };
}

export class WalletManager {
  public walletBox: WalletBox = {};

  public addWallet(wallet: Wallet, location: any) {
    if (!this.walletBox[wallet.publicKey]) {
      const signature = wallet.sign(ChainUtil.hash(location));
      this.walletBox[wallet.publicKey] = {
        wallet,
        location,
      };
      console.log(this.walletBox);

      return `${wallet.publicKey}   ${signature}`;
    }
  }

  public extractUserLocationByPublicToken(secretToken: string) {
    const [publicKey] = secretToken.split('   ');

    if (this.walletBox[publicKey]) {
      const { location } = this.walletBox[publicKey];
      return location;
    }
    return undefined;
  }
}
