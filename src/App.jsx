import { useState } from 'react';
import Register from './pages/register';
import Navbar from './components/navbar';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main class="bg-(--main-bg) px-6 py-2 relative">
    
      <Register/>
    </main>
  )
}

export default App
