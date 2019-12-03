# ipfs-mint-ERC721
ERC721 Mint + Javascript mint script

Copy .env.example into .env
Update configuration Details from the created .env file

## How to deploy smart contracts
```
yarn install
npx hardhat run scripts/deploy.js --network rinkeby
```

## How to run mint script
```
node mint/main.js MINT_AMOUNT(1 or 2)
```
