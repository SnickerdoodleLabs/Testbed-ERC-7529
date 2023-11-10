[![Snickerdoodle Protocol](/src/snickerdoodle_horizontal_notab.png)](https://snickerdoodle.com)

# ERC-7529 Tutorial Application

This is a simple boilerplate React application showing how to leverage [ERC-7529](https://www.npmjs.com/package/@snickerdoodlelabs/erc7529) to directly inspect DNS TXT records to discover smart contracts on a public blockchain and verify the assoication of the smart contract with the DNS domain. 

See `handleKeyPress` function in [`DomainInput.tsx`](/src/DomainInput.tsx) for a running example of how to use [`@snickerdoodlelabs/erc7529`](https://www.npmjs.com/package/@snickerdoodlelabs/erc7529) in your application to discover smart contracts using only DNS domain names. 

## How to Use this App

You'll need a browser extension installed that injects an ethereum provider (`window.ethereum`), like [Metamask](https://metamask.io/). Next, you'll need to toggle the active network in your extension to the target network you are interested in, (like Fuji testnet). Then type in the name of a domain (like `snickerdoodle.com`) and see if any contracts are associated with that domain on the network your wallet is connected to. 

## Local Development

You can play with this applciation locally. 

```sh
git clone https://github.com/SnickerdoodleLabs/Testbed-ERC-7529.git
cd Testbed-ERC-7529
npm install
npm start
```
