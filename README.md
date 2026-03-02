# Reef Ether Link

Reef wallet-style React app for viewing REEF balances, activity, and sending transactions with MetaMask.

## Stack

- Vite
- React + TypeScript
- Tailwind CSS + shadcn/ui
- `wagmi` / `viem`
- `reef-evm-util-lib`
- `@reef-chain/ui-kit`

## Prerequisites

- Node.js 18+
- npm
- A running Reef EVM RPC endpoint (default: `http://localhost:8545`)

## Local development

```bash
npm install
npm run dev
```

Vite runs on `http://localhost:8080`.

## Environment

Create a `.env` file if you want a non-default RPC target:

```bash
VITE_REEF_RPC_URL=/api/reef-rpc
```

Notes:
- Default behavior uses `VITE_REEF_RPC_URL=/api/reef-rpc`.
- In dev, Vite proxies `/api/reef-rpc` to `http://localhost:8545` to avoid browser CORS issues.

## RPC and explorer behavior

- Balance and wagmi read transport use `VITE_REEF_RPC_URL` (default `/api/reef-rpc`).
- Explorer links are dynamic and resolved from the active network in `reef-evm-util-lib` (`getNetwork().blockExplorerUrl` / `network$`), not hardcoded to Reefscan.

## Notifications

Reef actions use UI kit notifications (`UiKit.notify.success/info/danger`) for transaction/copy feedback.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```
