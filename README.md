
# Blockchain voting system with Ethereum and Solidity smart contracts.

![alt text](https://user-images.githubusercontent.com/40801686/60773868-3c02b280-a10c-11e9-9e4d-b79dc6eec695.png)

## brief description of this project

This app is mainly focused in the use of the blockchain technology and its features, in conjuction with a Frontend framework like React. As you can imagine, this app consists in a smart contract that holds all the logic needed to create a voting system. Basically, a react app is connected to a Solidity smart contract via the Web3 module, and thanks to a local blockchain (ganache) running in the computer that holds this smart contract, The react app can interact with it and make use of its methods.

The smart contract has functions like add candidate, vote, getListofCandidates etc. So a normal user with an Ethereum wallet (like Metamask) can invoke these functions and ultimately modify the data of the contract. (Keep in mind that there are certain restricted methods to only the manager of the contract in order to keep this contract consistent).

## Considerations to keep in mind

For the creation of this contract it's crucial to control the version of some key dependencies such as web3. After doing some research, Web3 works fine until beta 37, that's why the truffle framework is making use of that specific version. In case you make use of different providers like HDWalletProvider you'll need to make use of specific versions.

## Steps to install this app

If you want to try this app, these are the steps you are going to perform.

1 - You need an Ethereum wallet injected in your Chrome web browser in order to be able to interact with the smart contract. This is an extension for Google Chrome and you'll need to write down a nemoniac (12 words phrase) the first time you use it. This will be your password in case you want to restore your wallet in other computer, keep in mind if anybody knows that 12 word phrase, then it will have access to your wallet so keep that in secret. You can find this wallet here: https://metamask.io/

2 - You also need a local blockchain to be able to test this app. In this case you can download and install Ganache, which is a Desktop app for Mac and Windows. You can download here: https://www.trufflesuite.com/ganache
When you have installed this app, you'll only need to open it and it will launch a "blockchain network" in the default port: 7545. 

3 - Another dependency you need is truffle. Truffle is a blockchain framework and it comes with its own CLI. You need to use npm to install this framework globally with the command: npm install truffle -g
you can find more info about this at: https://www.trufflesuite.com/

4 - Here you can clone this repository or download it in your computer. Make sure you have installed git before trying to clone it.

5 - Now it's time to install all the dependencies required to run this project. You only need to open a terminal, move your working directory to the client folder (this is basically the React app) and execute npm install. This command will install all the dependencies for this project.


6 - before launching the app, you need to add a valid account of the ganache blockchain inside your metamask wallet. In order to do so, just go to the ganache Desktop app and select an account (there are 10). Click in the key icon (show keys) and grab the private key for that account. Then go to your Metamask extension and find the option import account. After that, paste the private key and you'll have a valid account for your ganache blockchain.

7 - Open a terminal in the root of this project and execute sudo truffle compile, so you can compile the solidity code (this will generate the interface and ABI but don't worry about those, you don't need to understand what are those files). After that, proceed to execute sudo truffle migrate --reset to apply the migrations directly to your local blockchain (be sure Ganache is running before doing this step)

8 - Now you can start the React development server. Just go to the client folder and run npm start. This command will open a tab in your default web browser (be sure that you are using Google chrome). Or just open a new tab in Chrome with the following URL: http://localhost:3000

9 - if everything went ok, you'll be able to see the main page and all the candidates available. That's a sign of your React app is getting everything from the smart contract previously deployed in the blockchain.



