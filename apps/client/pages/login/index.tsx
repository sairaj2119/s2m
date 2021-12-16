import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Input } from '../../components/atoms/Input'
import UnAuthenticatedLayout from '../../components/layouts/UnAuthenticatedLayout'
import { useAuth } from '../../context/authContext'
import { providerNames } from '../../utils/oAuthProviders'

const Login = () => {
  const { login, oAuthLogin } = useAuth()
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

  const handleLogin = async () => {
    if (!data.email || !data.password || data.password.trim() === '' || data.email.trim() === '') {
      return setError({ isError: true, message: 'Please fill in all fields' })
    }
    try {
      setError({ isError: false, message: '' })
      setLoading(true)
      await login(data.email, data.password)
    } catch (err) {
      console.error(err)
      setError({ isError: true, message: (err as any).message })
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (providerName: string) => {
    try {
      await oAuthLogin(providerName)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <UnAuthenticatedLayout>
      <Head>
        <title>Login / S2Media</title>
      </Head>
      <div className="flex flex-col items-center" style={{ height: 'calc(100vh - 58px)' }}>
        <h1 className="my-4 text-5xl">Login</h1>

        <div className="flex flex-col w-1/3">
          {error.isError ? (
            <div className="p-3 my-3 text-sm text-white bg-red-500 rounded-md">{error.message}</div>
          ) : null}
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
          <div className="mb-5">
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
          <div className="mt-2"></div>
          <Button onClick={handleLogin} loading={loading} variant="solid" colorScheme="indigo">
            Submit
          </Button>
          <div className="my-3"></div>
          <Button onClick={() => handleOAuthLogin(providerNames.google)} variant="outline">
            <div className="flex items-center justify-center">
              <Image src="/google.svg" alt="Google" width="25" height="25" />
              <p className="ml-3">Login With Google</p>
            </div>
          </Button>
        </div>
      </div>
    </UnAuthenticatedLayout>
  )
}

export default Login
