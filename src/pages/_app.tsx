import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import Header, { getLibrary } from "../components/HeaderWrapper";
import "../index.css";

const MyApp = function ({ Component, pageProps }: AppProps) {
  return <div className="bg-primary">
    <div className="fixed top-0 right-0 mt-2 mr-4">
    </div>
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="container min-h-screen mx-auto">
        <Header />
        <Component {...pageProps} />
      </div>
      <footer className="p-10 text-gray-200 footer bg-secondary">
        <div>
          <p>
            NFT ❤️ Arena
            <br />
            Built with ❤️ from{" "}
            <a className="link" target="_blank" rel="noopener noreferrer" href="https://github.com/XinyuCRO/nft-arena">
              The Gang of Four
            </a>
          </p>
        </div>
        <div>
          <span className="footer-title">Special Thanks</span>
          <a
            href="https://crypto.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Crypto.com
          </a>
          <a
            href="https://cronos.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Cronos Chain
          </a>
          <a
            className="link link-hover"
          >
            Coffee
          </a>
          <a
            className="link link-hover"
          >
            Cats
          </a>
        </div>
      </footer>
    </Web3ReactProvider>
  </div>
  return;
};

export default MyApp;
