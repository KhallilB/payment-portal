import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import Button from '@/modules/common/button'

import { Account } from '@/lib/types'
import { accounts, payByCheck } from '@/lib/config/accounts'
import Input from '@/modules/common/input'

export default function CheckPayment({
  total,
  id,
}: {
  total: number
  id: string
}) {
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [checkNumber, setCheckNumber] = useState<string>('')
  const [checkAmount, setCheckAmount] = useState<number>(total)
  const [fullName, setFullName] = useState<string>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

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

    try {
      let res = await payByCheck(
        payee.id,
        payer.id,
        checkNumber,
        checkAmount,
        total
      )
      toast.success(res.message)
      setError('')
      setLoading(false)
      return router.push('/')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jane Doe"
          required
        />
        <Input
          type="number"
          label="Account Number"
          name="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          required
        />
        <Input
          type="number"
          label="Check Number"
          name="checkNumber"
          value={checkNumber}
          onChange={(e) => setCheckNumber(e.target.value)}
          placeholder="Check Number"
          required
        />

        <div>
          <Button
            type="submit"
            variant="primary"
            className="disabled:opacity-50"
          >
            Pay
          </Button>
        </div>
      </form>
    </>
  )
}
