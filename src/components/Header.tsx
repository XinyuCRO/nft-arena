/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

import { injected, walletconnect, POLLING_INTERVAL, network } from "../dapp/connectors";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link";
import { useEventManagerContract } from "../hooks/useEventManagerContract";
import { message } from "antd";
import { NetworkConnector } from "@web3-react/network-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

export const Header = function () {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  const { isOwner } = useEventManagerContract();

  const [activatingConnector, setActivatingConnector] = useState<any>();

  const activating = (connection: typeof injected | typeof walletconnect) => connection === activatingConnector;
  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;

  return <div className="bg-blue-400 rounded-2xl navbar text-primary-content">
    <div className="navbar-start">
      <div className="bg-black dropdown">
        <label tabIndex={0} className="bg-blue-400 btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="p-2 mt-3 bg-blue-400 shadow menu menu-compact dropdown-content rounded-box w-52">
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/tickets">My Tickets</Link></li>
          {
            isOwner && <li><Link href="/events/check_in">Check In</Link></li>
          }
        </ul>
      </div>
      <Link href="/" >
        <a className="text-xl tracking-wide normal-case btn btn-ghost">
          <img src="arena.png" style={{ width: '135px' }} />
        </a>
      </Link>
    </div>
    <div className="hidden navbar-center lg:flex">
      <ul className="p-0 tracking-wide menu menu-horizontal">
        <li><Link href="/events">Events</Link></li>
        <li><Link href="/tickets">My Tickets</Link></li>
        {
          isOwner && <li><Link href="/events/check_in">Check In</Link></li>
        }
      </ul>
    </div>
    <div className="pr-2 navbar-end">
      {!account
        ? <button
          type="button"
          className="btn btn-ghost bg-secondary"
          onClick={() => {
            setActivatingConnector(injected);
            activate(injected, error => {
              alert('please switch to cornos testnet in the wallet')
            });
          }}
        >
          Connect Wallet
        </button>
        : account
          ? <button className="font-mono cursor-pointer bg-secondary btn btn-ghost" type="button" onClick={() => {
            deactivate();
          }}>{account.substring(0, 4)}...{account.substring(account.length - 4)}</button>
          : ""}
    </div>
  </div>
};

export default Header;
