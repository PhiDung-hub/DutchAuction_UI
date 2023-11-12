# Dutch Auction frontend

This repo contains code for integrating with DutchAucion and TulipToken contracts, 
which were developed in a separate repo and deployed on Sepolia testnet 
(Github repo at [DutchAuction_Contracts](https://github.com/PhiDung-hub/DutchAuction_Contracts)).

UI functionalities include bid, withdraw, and some basic monitor functionalities

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Set up Sepolia RPC:

    - Obtain an ALCHEMY_API_KEY from https://dashboard.alchemy.com/. Create an application API for Sepolia testnet.

    - Create `.env.local` at root folder and include ALCHEMY_API_KEY=...

_In case no API key is provided, a public provider is used as fallback. Application may encounter RPC requests limit and parts of UI won't fetch._

3. Run development server

```bash
pnpm dev
```

4. **(Optional)** To simulate production-like performance:

```bash
pnpm build && pnpm start
```


## Repo structure

This is a standard [Next 13 app](https://nextjs.org/docs) using `app` directory.

All core logic is defined with `src/` folder

### src/app

Contains app layout and router description

### src/components

UI components like Price Chart, Bid Input, Button etc..

### src/context

[wagmi.sh](https://wagmi.sh) context provider that set up wallet hooks within the application

### src/lib

Helper logics, `blockchain` and `abi` contains contracts interface details

### src/views

UI views, most important one is auction view defined in `src/views/auction.tsx`
