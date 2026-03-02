# Reef EVM App

Reef wallet-style React app for viewing REEF balances, activity, and sending transactions with MetaMask.

## Product walkthrough

### 1) Disconnected state (connect prompt)

When no wallet is connected, the app renders a dedicated onboarding state:

- Header with Reef logo and `Connect Wallet` CTA.
- Large center card: `Connect to Reef App`.
- Support text: connect MetaMask to view balances and activity.
- Trust chips: `Secure`, `Non-custodial`, `Mainnet ready`.
- Bottom-left shortcut: `Add to MetaMask`.

### 2) MetaMask connect approval flow

Clicking `Connect Wallet` opens the MetaMask account permission dialog for the current host (for local dev: `localhost`). The user confirms account access in MetaMask, then the app hydrates wallet data and switches to the connected dashboard.

### 3) Connected dashboard state

After connection, the main wallet dashboard shows:

- Top-right wallet balance pill (REEF icon + token amount).
- Account menu/dropdown.
- Fiat balance summary on the left.
- `Tokens / NFTs` tab section (REEF token row with fiat + token values).
- Primary `Send` action for REEF transfers.
- Activity panel on the right with recent transactions.
- `Open Explorer` link that routes to the active network explorer.
- `Buy Reef` card with gradient + decorative SVG background.

### 4) Send REEF modal

From the token row `Send` button:

- Opens a centered transfer modal.
- Includes amount input with `MAX` shortcut and live balance hint.
- Recipient address input (`0x...` EVM address).
- Submit action: `Send REEF`.
- Keeps dashboard context dimmed in the background.

### 5) Buy REEF page

The buy page includes:

- Back navigation.
- Hero card (`Buy Reef`) with animated SVG wave decoration.
- Amount input in USD.
- Selected wallet address field.
- `Purchase` action that initiates the on-ramp flow.

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
- Network defaults to local development (`localhost`) when available.
- Network switching triggers a full app reload so balances, activity, and tabs rehydrate consistently on the selected chain.

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
