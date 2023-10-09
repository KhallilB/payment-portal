import { Account, Check, Order } from '@/lib/types'
import { processOrder } from './orders'

export const accounts: Account[] = [
  {
    id: '1234',
    name: 'Test Account 1',
    accountNumber: '123456789',
    balance: 1000,
    transactions: [],
  },
  {
    id: '4151',
    name: 'Test Account 2',
    accountNumber: '987654321',
    balance: 500,
    transactions: [],
  },
  {
    id: '4124',
    name: 'Payable Account',
    accountNumber: '2468101214',
    balance: 1250,
    transactions: [],
  },
]

export const checks: Check[] = [
  // Valid check
  {
    id: '1',
    checkNumber: '1234',
    accountNumber: '123456789',
    amount: 0,
  },
]

export const wire = async (
  payeeId: string,
  payerId: string,
  amount: number,
  orderId: string
) => {
  const sufficientFunds = checkSufficientFunds(payeeId, amount)
  if (!sufficientFunds) {
    throw new Error('Insufficient funds')
  }

  deductFundsFromAccount(payeeId, amount)

  addFundsToAccount(payerId, amount)

  logTransaction(payerId, payeeId, amount, 'check')

  processOrder(orderId)

  return {
    message: 'Wire transfer successful',
  }
}

export const payByCheck = async (
  payeeId: string,
  payerId: string,
  checkNumber: string,
  checkAmount: number,
  total: number
) => {
  const check = checks.find((check) => check.checkNumber === checkNumber)
  const payerAccount = accounts.find((account) => account.id === payerId)

  if (!check) {
    throw new Error('Check not found')
  }

  if (check.accountNumber !== payerAccount?.accountNumber) {
    throw new Error('Invalid check number')
  }

  deductFundsFromAccount(payeeId, total)

  addFundsToAccount(payerId, total)

  logTransaction(payerId, payeeId, total, 'check')

  return {
    message: 'Check payment successful',
  }
}

function checkSufficientFunds(id: string, amount: number) {
  const account = accounts.find((account) => account.id === id)

  if (account) {
    console.log('account.balance', account.balance)
    return account.balance >= amount
  } else {
    return false
  }
}

function deductFundsFromAccount(id: string, amount: number) {
  const account = accounts.find((account) => account.id === id)

  if (account) {
    account.balance -= amount
  }
}

function addFundsToAccount(id: string, amount: number) {
  const account = accounts.find((account) => account.id === id)

  if (account) {
    account.balance += amount
  }
}

function logTransaction(
  payerId: string,
  payeeId: string,
  amount: number,
  method: 'wire' | 'check'
) {
  const payer = accounts.find((account) => account.id === payerId)
  const payee = accounts.find((account) => account.id === payeeId)

  if (payer && payee) {
    payer.transactions.push({
      id: Math.random().toString(36).substring(7),
      amount,
      method,
      timestamp: Date.now(),
    })

    payee.transactions.push({
      id: Math.random().toString(36).substring(7),
      amount,
      method,
      timestamp: Date.now(),
    })
  }
}
