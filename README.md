# Dutch Auction frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This repo contains code for integrating with DutchAucion and TulipToken contracts, which were 
developed in a separate repo and deployed on Sepolia testnet.

Basic functionalities include bid, withdraw, and some basic monitor functionalities

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Run development server

```bash
pnpm dev
```

(Optional) To build & start for production-like performance:

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


