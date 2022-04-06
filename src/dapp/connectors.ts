import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const POLLING_INTERVAL = 12000;
export const injected = new InjectedConnector({
  supportedChainIds: [338],
});

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_RPC_URL_1,
  3: process.env.NEXT_PUBLIC_RPC_URL_3,
  4: process.env.NEXT_PUBLIC_RPC_URL_4,
  338: "https://cronos-testnet-3.crypto.org:8545",
  1337: "http://127.0.0.1:8545/",
};

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
});


export const network = new NetworkConnector({
  urls: { 338: RPC_URLS[338] },
  defaultChainId: 338,
})
