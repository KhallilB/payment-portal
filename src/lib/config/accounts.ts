import { Account } from '@/lib/types'

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

export const wire = async (
  payeeId: string,
  payerId: string,
  amount: number
) => {
  const sufficientFunds = checkSufficientFunds(payeeId, amount)
  if (!sufficientFunds) {
    throw new Error('Insufficient funds')
  }

  // Deduct the amount from the payer's account
  deductFundsFromAccount(payeeId, amount)

  addFundsToAccount(payerId, amount)

  // Log the transaction (you can use a database for this)
  logTransaction(payerId, payeeId, amount)

  console.log('accounts', accounts)

  return {
    message: 'Wire transfer successful',
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

function logTransaction(payerId: string, payeeId: string, amount: number) {
  const payer = accounts.find((account) => account.id === payerId)
  const payee = accounts.find((account) => account.id === payeeId)

  if (payer && payee) {
    payer.transactions.push({
      id: Math.random().toString(36).substring(7),
      amount,
      timestamp: Date.now(),
    })

    payee.transactions.push({
      id: Math.random().toString(36).substring(7),
      amount,
      timestamp: Date.now(),
    })
  }
}
