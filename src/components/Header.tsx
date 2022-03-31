/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

import { injected, walletconnect, POLLING_INTERVAL } from "../dapp/connectors";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link";

export const Header = function () {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  const [activatingConnector, setActivatingConnector] = useState<any>();

  const activating = (connection: typeof injected | typeof walletconnect) => connection === activatingConnector;
  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;

  return <div className="rounded-2xl navbar bg-primary text-primary-content">
    <div className="navbar-start">
      <Link href="/" >
        <a className="text-xl tracking-wide normal-case btn btn-ghost">Arena NFT</a>
      </Link>
    </div>
    <div className="navbar-center">
      <ul className="p-0 tracking-wide menu menu-horizontal">
        <li><Link href="/events">Events</Link></li>
        <li><Link href="/tickets">My Tickets</Link></li>
      </ul>
    </div>
    <div className="pr-2 navbar-end">
      {!account
        ? <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setActivatingConnector(injected);
            activate(injected);
          }}
        >
          Connect Wallet
        </button>
        : account
          ? <span className="font-mono cursor-pointer" onClick={() => {
            deactivate();
          }}>{account.substring(0, 4)}...{account.substring(account.length - 4)}</span>
          : ""}
    </div>
  </div>
};

export default Header;
