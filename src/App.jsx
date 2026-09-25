import { useState } from 'react';
import Register from './pages/register';
import Navbar from './components/navbar';
import Login from './pages/login';
import VerifyEmail from './components/verify-email';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="bg-(--main-bg) relative">
    
      <Register />
    </main>
  )
}

export default App
