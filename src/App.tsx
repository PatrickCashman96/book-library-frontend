import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import './App.css'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route
          path='/'
          element={<HomePage/>}
        />
        
      </Routes>
    </>
  )
}

export default App
