import { Routes, Route } from 'react-router-dom'

import { Login } from '../pages/Login'
import { ActiveUsers } from '../pages/ActiveUsers'
import { DisabledUsers } from '../pages/DisabledUsers'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<ActiveUsers />} />
      <Route path='/login' element={<Login />} />
      <Route path='/users-disabled' element={<DisabledUsers />} />
    </Routes>
  )
}