import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import ProtectedRoute from './component/ProtectedRoute'
import ThemeToggle from './component/ThemeToggle'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Todos from './pages/Todos'
import Debts from './pages/Debts'
import DebtProfile from './pages/DebtProfile'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/debts/profile/:userId" element={<DebtProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App