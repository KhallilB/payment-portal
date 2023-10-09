import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Button from '@/modules/common/button'
import { accounts, wire } from '@/lib/config/accounts'
import { Account } from '@/lib/types'

export default function WirePayment({ total }: { total: number }) {
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [amount, setAmount] = useState(total)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (error !== '') {
      toast.error(error)
      setError('')
      setLoading(false)
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payee: Account = accounts.find(
        (account) => account.accountNumber === '2468101214'
      )!
      if (!payee) {
        setError(
          'There was an error with the payable account. Please try again or contact support.'
        )
        return
      }

      const payer: Account = accounts.find(
        (account) => account.accountNumber === accountNumber
      )!
      if (!payer) {
        setError(
          'Could not find the account number. Please try again or contact support.'
        )
        return
      }

      let res = await wire(payee.id, payer.id, amount)
      toast.success(res.message)
      setError('')
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Name</label>
          <input
            className="form-control"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Account Number</label>
          <input
            className="form-control"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Account Number"
            required
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            className="disabled:opacity-50"
            disabled={loading}
          >
            Pay
          </Button>
        </div>
      </form>
    </>
  )
}
