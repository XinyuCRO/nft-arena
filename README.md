# NFT ticket system for Arena

## Tech Stack

- ⚡️ The React Framework for Production [NextJs](https://https://nextjs.org//)
- 📦 [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals
- 🦾 [TypeChain Hardhat plugin](https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat) - Automatically generate TypeScript bindings for smartcontracts while using Hardhat.
- 🔥 [web3-react](https://github.com/NoahZinsmeister/web3-react/) - A simple, maximally extensible, dependency minimized framework for building modern Ethereum dApps
- 🎨 [daisyUI Tailwind CSS Components](https://daisyui.com/) - clean HTML with component classes
- 🎨 [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/) - standard for secure blockchain applications

## Install

```sh
yarn install
```

## Usage

```sh
yarn dev
```

## Run tests

```sh
yarn test
```

## Build types for TypeScript

```sh
yarn sol:build
```


## Development using local chain 

First, start the local chain,

```sh
npx hardhat node
```

it will log some accounts which hardhad use to deploy, choose the first one, copy the private key and import it with MetaMask, and make sure your MetaMask is connecting with localhost:8545


Open a new terminal and run the following command:

```sh
npx hardhat run --network localhost scripts/deploy_event_manager.ts
```

copy the address of the deployed contract and paste it in the `contractAddress` field in `useEventManagerContract.ts`

```sh

this will deploy the contracts to the local chain


And that's all, go to the frontend and check event list, there should be some created by deploy script.


