import React, { useEffect, useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Input } from '../../components/atoms/Input/Input'
import UnAuthenticatedLayout from '../../components/layouts/UnAuthenticatedLayout'
import { useAuth } from '../../context/authContext'
import { providerNames } from '../../utils/oAuthProviders'

const Signup = () => {
  const { signup, oAuthLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '' })
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (error.isError) {
      setTimeout(() => {
        setError({ isError: false, message: '' })
      }, 5000)
    }
  }, [error.isError])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  const handleSignup = async () => {
    console.log(data)
    if (!data.email || !data.password || data.password.trim() === '' || data.email.trim() === '') {
      return setError({ isError: true, message: 'Please fill in all fields' })
    }
    try {
      setError({ isError: false, message: '' })
      setLoading(true)
      await signup(data.email, data.password)
    } catch (err) {
      console.error(err)
      setError({ isError: true, message: err.message })
      setLoading(false)
    }
  }

  const handleOAuthSignup = async (providerName: string) => {
    await oAuthLogin(providerName)
  }

  return (
    <UnAuthenticatedLayout>
      <div className="flex flex-col items-center">
        <h1 className="my-4 text-5xl">Signup</h1>
        <div className="flex flex-col w-1/3">
          {error.isError && (
            <div className="p-3 my-3 text-sm text-white bg-red-500 rounded-md">{error.message}</div>
          )}
          <div className="mb-5">
            <Input
              id="email"
              name="email"
              label="Email"
              type="text"
              placeholder="jay@shetty.com"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button onClick={handleSignup} loading={loading} className="py-2" colorScheme="green">
            Submit
          </Button>
          <span className="my-4"></span>
          <Button
            onClick={() => handleOAuthSignup(providerNames.google)}
            className="py-2"
            colorScheme="indigo"
          >
            Signup With Google
          </Button>
        </div>
      </div>
    </UnAuthenticatedLayout>
  )
}

export default Signup