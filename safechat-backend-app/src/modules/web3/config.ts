import Web3 from 'web3';

export function setupWeb3() {
  const web3 = new Web3('http://localhost:7545');
  web3.eth.getAccounts(console.log);
  const account = web3.eth.accounts.create('asd');
  console.log(account);
}
