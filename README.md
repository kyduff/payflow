# PayFlow

_Pay in crypto, receieve in fiat._

## Description

PayFlow is an interface through which crypto token holders can send money to fiat bank accounts with the seamless ease and simplicity of an ERC20 or SEPA transfer. This can be used by merchants, landlords, friends, or anyone with an IBAN to receive payments to their bank account from people holding arbitrary ERC20 tokens. It works by generating a QR code which crypto holders can scan to send a prespecified amount of Euros using any token they'd like.

## Tech

We use:
- [Monerium](https://monerium.com/) to on/offramp crypto
- [1inch Fusion](https://1inch.io/fusion/) to swap ERC20 tokens
- [Polygon](https://polygon.technology/) and [Gnosis](https://www.gnosis.io/) as the networks securing our tokens
- [WalletConnect](https://walletconnect.com/) to enable our Mobile-first UX
- [MetaMask](https://metamask.io/) to manage our assets
- [QuickNode](https://www.quicknode.com/) to fetch token balances
- [EAS](https://attest.sh/) to issue attestation receipts
- [ApeCoin](https://apecoin.com/)https://apecoin.com/ to pay our rent
