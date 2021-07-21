import React from 'react'
import { PageNav } from '../../components/molecules/Page/page-nav'
import PrivateRoute from '../../components/PrivateRoute'

const Notifications = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Notifications" />
        <main className="px-2">hi thre</main>
      </div>
    </PrivateRoute>
  )
}

export default Notifications
