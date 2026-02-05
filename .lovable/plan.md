
# Reef Chain Web3 Dashboard

A Web3 wallet dashboard that replicates the Reef UI, connects to MetaMask via wagmi, and uses your custom Reef Testnet RPC.

---

## 🎨 Design & Branding
- **Exact Reef visual design** with purple/pink gradient color scheme
- Light pink/lavender background with white cards
- Rounded, modern card design with subtle shadows
- Reef-style typography and iconography
- Purple "Buy Reef" promotional card with underwater silhouette theme

---

## 🏠 Dashboard Page (Main View)

### Header Navigation
- Reef logo on the left
- Navigation links: Dashboard, Bonds (placeholder), Validators (placeholder)
- Connected wallet REEF balance display with Reef icon
- Account name badge (e.g., "shared")
- Settings gear icon

### Portfolio Summary
- **Total balance** in USD with eye icon to hide/show
- **Available** and **Staked** amounts displayed prominently
- Purple gradient "Buy Reef" promotional card

### Asset Tabs
- **Tokens Tab**: List of tokens with icon, name, price, USD value, token amount, stack icon, and Send button
- **Bonds Tab**: Placeholder content
- **NFTs Tab**: Empty state message "Your wallet doesn't own any NFTs" with "Get NFTs on Sqwid" button

### Activity Panel
- Transaction history list showing Sent/Received transactions
- Each entry shows: arrow icon, transaction type, date/time, amount, token icon
- "Open Explorer" link at the top

---

## 🔗 Wallet Connection (wagmi + MetaMask)

### Technical Setup
- Configure wagmi with your custom Reef Testnet RPC: `http://reeftestnet1-reefethrpc-dab87f-72-60-35-83.traefik.me/`
- Define Reef Testnet as a custom chain (Chain ID 13939)
- MetaMask connector for browser wallet connection

### Connection Flow
- When not connected: Show "Connect Wallet" button
- Automatic chain switching to Reef Testnet if user is on wrong network
- Display connected address in header after connection

---

## 👤 Account Selection Modal

### Modal Header
- "Browser Extension" toggle button with Reef icon
- "Choose Language" option
- Mainnet/Testnet toggle switch
- Close (X) button

### Account Cards
- Unique geometric avatar for each account
- Account name
- Native address (truncated with copy button)
- Reef EVM address (truncated with copy button)
- "Open in Explorer" link
- Purple "Select" button
- QR code display

---

## 💸 Send Token Modal (UI Only)

- Opens when clicking "Send" button on any token
- Recipient address input field
- Amount input with max button
- Token selector dropdown
- "Send" confirmation button (shows toast message, no real transaction)
- Cancel/Close button

---

## 📊 Data Handling

- **Wallet Connection**: Real MetaMask connection via wagmi
- **Token Balances**: Mock data displayed in the UI (can be easily swapped for real RPC calls later)
- **Transaction History**: Static mock data matching the screenshot examples
- **USD Values**: Mock pricing data

---

## 📱 Responsive Design
- Desktop-first design matching the screenshots
- Mobile-friendly adaptations for smaller screens

---

## 🛠️ Technical Stack
- **wagmi v2** for Web3 wallet connection
- **viem** for Ethereum utilities
- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components as base
