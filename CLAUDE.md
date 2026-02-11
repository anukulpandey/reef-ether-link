# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reef Ether Link is a React wallet dashboard for the Reef blockchain. It connects to Reef Testnet via MetaMask (EVM-compatible) using wagmi/viem, and displays token balances, portfolio summary, and transaction activity.

## Commands

- `npm run dev` — Start dev server on port 8080
- `npm run build` — Production build
- `npm run build:dev` — Development build
- `npm run lint` — ESLint
- `npm run test` — Run tests once (vitest)
- `npm run test:watch` — Run tests in watch mode

## Architecture

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui

**Path alias:** `@/` maps to `./src/`

**Key layers:**

- `src/lib/wagmi.ts` — Wagmi/viem config defining the Reef Testnet chain (chain ID 13939) with MetaMask connector. This is the single source of truth for chain configuration.
- `src/lib/mockData.ts` — Mock token and transaction data, plus `Token` and `Transaction` type definitions used across components.
- `src/contexts/BalanceVisibilityContext.tsx` — Global toggle for showing/hiding balance values throughout the UI. Consumed by Header, PortfolioSummary, TokenList, and SendModal.
- `src/pages/Index.tsx` — Single-page app. Shows a connect prompt when disconnected; shows portfolio dashboard (PortfolioSummary + AssetTabs + ActivityPanel) when connected.
- `src/components/reef/` — All domain-specific components (Header, PortfolioSummary, TokenList, SendModal, AccountModal, ActivityPanel, AssetTabs, BuyReef, SqwidBtn).
- `src/components/ui/` — shadcn/ui primitives (configured via `components.json`, style: "default", base color: slate, CSS variables enabled).

**Provider hierarchy** (in App.tsx): WagmiProvider → QueryClientProvider → TooltipProvider → BalanceVisibilityProvider → BrowserRouter

**External UI library:** `@reef-chain/ui-kit` provides Reef-branded components (ReefLogo, ReefIcon, QRCode, Bubbles, Text). Imported as `UiKit` or `Uik`.

## Styling Conventions

- Tailwind with CSS variables for theming (defined in `src/index.css`)
- Custom colors: `reef-purple` and `reef-pink` (HSL via CSS vars `--reef-purple`, `--reef-pink`)
- Reef brand gradient: `bg-gradient-to-r from-[#a93185] to-[#5d3bad]`
- Rounded corners: components typically use `rounded-2xl` or `rounded-full`

## Testing

- Vitest with jsdom environment, setup file at `src/test/setup.ts`
- Test files go in `src/` matching pattern `**/*.{test,spec}.{ts,tsx}`
- Globals enabled (no need to import `describe`, `it`, `expect`)

## TypeScript

- Strict mode is OFF; `noImplicitAny` and `strictNullChecks` are disabled
- Unused vars/params are allowed (ESLint `@typescript-eslint/no-unused-vars` is off)
