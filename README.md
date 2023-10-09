# Payment Portal Demo

## About

A payment portal that showcases the ability to handle various payment methods, including credit and debit cards, ACH deposits, wires, and checks.

## Getting Started

### Prerequisites

**[Node](https://nodejs.org/en)**
or
**[Bun](https://bun.sh/docs/installation)**

### Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Install packages
   ```sh
   npm install
   # or
   bun install
   ```
3. Create ENV file in project root; Use values emailed to you
   ```sh
   touch .env.local
   ```
4. Run development server
   ```sh
   npm run dev
   # or
   bun dev
   ```

#### To run a prouction build:

1. Create a NextJS build

```sh
npm run build
```

2. Run the build

```sh
npm run start
```

## Making Payments

**Stripe**:
When paying with stripe Card you can use any **Month**, **CVV**, **Zip Code**. To test different codes use the table below.

When paying with a bank account use the test accounts provided by Stripe.

| Card Number      | Status             |
| ---------------- | ------------------ |
| 4242424242424242 | Success            |
| 4000000000000002 | Decline            |
| 4000000000009995 | Insufficient Funds |

**Wire**:
When paying with a wire. You can use any **Name**. To test different codes use the table below.

| Account Number | Status             |
| -------------- | ------------------ |
| 123456789      | Success            |
| 423514235      | Incorrect Account  |
| 987654321      | Insufficient Funds |

**Check**:
When paying with a check. You can use any **Name**. To test different codes use the table below.

| Account Number | Check Number | Status            |
| -------------- | ------------ | ----------------- |
| 123456789      | 1234         | Success           |
| 423514235      | 4321         | Incorrect Account |
