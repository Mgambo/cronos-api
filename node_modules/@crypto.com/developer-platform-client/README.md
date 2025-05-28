# Crypto.com Developer Platform Client.ts

The **Crypto.com Developer Platform Client.ts** is a TypeScript/JavaScript SDK designed to interact seamlessly with the Crypto.com Developer Platform Service API. This client library simplifies interactions with the Cronos blockchain, supporting native tokens, ERC20 tokens, smart contracts, transactions, blocks, and wallets.

![npm](https://img.shields.io/npm/v/@crypto.com/developer-platform-client)

## Features

- Simple and intuitive API for interacting with Cronos blockchain networks.
- Supports token balances (native & ERC20), token transfers, wrapping, and swapping.
- Transaction queries by address or hash, and fetching transaction statuses.
- Smart contract ABI fetching by contract address.
- Wallet creation and balance management.
- Supports **Cronos EVM** and **Cronos ZK EVM** chains.

## Installation

To install the package, run the following command in your project directory:

```bash
npm install @crypto.com/developer-platform-client
```

## Usage

Here’s how you can use the **Crypto.com Developer Platform Client.ts** in your project:

### Configuring the Client

First, configure the client with your API key and desired blockchain network (Cronos EVM or Cronos ZK EVM):

```ts
import { Client, CronosZkEvm } from '@crypto.com/developer-platform-client';

Client.init({
  chain: CronosZkEvm.Testnet, // Or CronosEvm.Mainnet for mainnet
  apiKey: 'YOUR_API_KEY', // Explorer API
  provider: 'https://provider-url.com', // Optional provider URL for signing
});
```

### Example Operations

#### Wallet Operations

- **Create a Wallet**:

```ts
const wallet = await Wallet.create();
console.log(wallet);
```

- **Get Wallet Balance**:

```ts
const balance = await Wallet.balance('0xYourWalletAddress');
console.log(balance);
```

#### Token Operations

- **Fetch Native Token Balance**:

```ts
const nativeBalance = await Token.getNativeTokenBalance('0xYourWalletAddress');
console.log(nativeBalance);
```

- **Fetch ERC20 Token Balance**:

```ts
const erc20Balance = await Token.getERC20TokenBalance('0xYourWalletAddress', '0xErc20ContractAddress');
console.log(erc20Balance);
```

- **Transfer Tokens**:

```ts
const transferResult = await Token.transfer({
  to: '0xRecipientAddress',
  amount: 10, // Amount of tokens to transfer
});
console.log(transferResult);
```

- **Wrap Tokens**:

```ts
const wrapResult = await Token.wrap({
  fromContractAddress: '0xOriginalTokenAddress',
  toContractAddress: '0xWrappedTokenAddress',
  amount: 10,
});
console.log(wrapResult);
```

- **Swap Tokens**:

```ts
const swapResult = await Token.swap({
  fromContractAddress: '0xOriginalTokenAddress',
  toContractAddress: '0xSwappedTokenAddress',
  amount: 10,
});
console.log(swapResult);
```

#### Transaction Operations

- **Fetch Transactions by Address**:

```ts
const transactions = await Transaction.getTransactionsByAddress('0xYourWalletAddress');
console.log(transactions);
```

- **Fetch Transaction by Hash**:

```ts
const transaction = await Transaction.getTransactionByHash('0xTransactionHash');
console.log(transaction);
```

- **Get Transaction Status**:

```ts
const status = await Transaction.getTransactionStatus('0xTransactionHash');
console.log(status);
```

#### Contract Operations

- **Fetch Contract ABI by Address**:

```ts
const abi = await Contract.getContractABI('0xContractAddress');
console.log(abi);
```

#### Block Operations

- **Fetch Block by Tag or Block Number**:

```ts
const block = await Block.getBlockByTag('latest'); // Can use 'latest', 'earliest', or a specific block number
console.log(block);
```

## API

### Client Methods

- `Client.init(config)`: Initializes the client with an API key, blockchain network (Cronos EVM or ZK EVM), and an optional provider.
- `Client.getApiKey()`: Returns the configured API key.
- `Client.getProvider()`: Returns the configured provider URL (if available).
- `Client.getChainId()`: Returns the chain ID based on the configured network.

### Wallet Methods

- `Wallet.create()`: Creates a new wallet and returns the address, private key, and mnemonic.
- `Wallet.balance(address)`: Fetches the native token balance for a specified address.

### Token Methods

- `Token.getNativeTokenBalance(address)`: Fetches the native token balance of a wallet address.
- `Token.getERC20TokenBalance(address, contractAddress)`: Fetches the ERC20 token balance of a wallet for a specific contract.
- `Token.transfer(payload)`: Sends a token transfer transaction.
- `Token.wrap(payload)`: Sends a token wrapping transaction.
- `Token.swap(payload)`: Sends a token swapping transaction.

### Transaction Methods

- `Transaction.getTransactionsByAddress(address)`: Fetches transactions associated with a wallet address.
- `Transaction.getTransactionByHash(txHash)`: Fetches transaction details by its hash.
- `Transaction.getTransactionStatus(txHash)`: Fetches the status of a transaction by its hash.

### Contract Methods

- `Contract.getContractABI(contractAddress)`: Fetches the ABI of a smart contract using its contract address.

### Block Methods

- `Block.getBlockByTag(blockTag)`: Fetches block data using a block tag (e.g., 'latest', 'earliest') or block number.

## Supported Chains

The SDK supports both **Cronos EVM** and **Cronos ZK EVM** networks.

### Cronos EVM:

```ts
CronosEvm.Mainnet; // Chain ID: 25
CronosEvm.Testnet; // Chain ID: 338
```

### Cronos ZK EVM:

```ts
CronosZkEvm.Mainnet; // Chain ID: 388
CronosZkEvm.Testnet; // Chain ID: 240
```

## Licensing

The code in this project is licensed under the MIT license.
