import { useState } from 'react';
import Register from './pages/register';
import Navbar from './components/navbar';
import Login from './pages/login';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="bg-(--main-bg) relative">
    
      <Login/>
    </main>
  )
}

export default App
