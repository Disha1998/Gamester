import React from "react";
import { Web3Context } from "../context/Web3Context";

function ConnectWallet() {
  const web3Context = React.useContext(Web3Context);
  const { connectWallet } = web3Context;
  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      <section id="subheader" className="text-light bg-container">
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Wallet</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <a className="box-url" onClick={() => connectWallet()}>
                <span className="box-url-label">Most Popular</span>
                <img src="/img/wallet/1.png" alt="image" className="mb20" />
                <h4>Metamask</h4>
                <p>
                  Start exploring blockchain applications in seconds. Trusted by
                  over 1 million users worldwide.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <img src="/img/wallet/2.png" alt="image" className="mb20" />
                <h4>Bitski</h4>
                <p>
                  Bitski connects communities, creators and brands through
                  unique, ownable digital content.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <img src="/img/wallet/3.png" alt="image" className="mb20" />
                <h4>Fortmatic</h4>
                <p>
                  Let users access your Ethereum app from anywhere. No more
                  browser extensions.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <img src="/img/wallet/4.png" alt="image" className="mb20" />
                <h4>WalletConnect</h4>
                <p>
                  Open source protocol for connecting decentralised applications
                  to mobile wallets.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <img src="/img/wallet/5.png" alt="image" className="mb20" />
                <h4>Coinbase Wallet</h4>
                <p>
                  The easiest and most secure crypto wallet. ... No Coinbase
                  account required.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <img src="/img/wallet/6.png" alt="image" className="mb20" />
                <h4>Arkane</h4>
                <p>
                  Make it easy to create blockchain applications with secure
                  wallets solutions.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <img src="/img/wallet/7.png" alt="image" className="mb20" />
                <h4>Authereum</h4>
                <p>
                  Your wallet where you want it. Log into your favorite dapps
                  with Authereum.
                </p>
              </a>
            </div>
            <div className="col-lg-3 mb30">
              <a className="box-url" href="login.html">
                <span className="box-url-label">Most Simple</span>
                <img src="/img/wallet/8.png" alt="image" className="mb20" />
                <h4>Torus</h4>
                <p>
                  Open source protocol for connecting decentralised applications
                  to mobile wallets.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConnectWallet;
