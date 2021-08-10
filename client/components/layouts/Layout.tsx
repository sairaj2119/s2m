import React from 'react'
import { useAuth } from '../../context/authContext'
import AuthenticatedLayout from './AuthenticatedLayout'
import UnAuthenticatedLayout from './UnAuthenticatedLayout'

const Layout = ({ children }: { session?: any; children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      ) : (
        <UnAuthenticatedLayout>{children}</UnAuthenticatedLayout>
      )}
    </>
  )
}

export default Layout
