import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import './App.css'


function App() {

  return (
    <>
      <NavBar/>
      <div className='body'>
        <Routes>
          <Route
            path='/'
            element={<HomePage/>}
          />
          
          <Route
            path='/signup'
            element={<SignupPage/>}
          />
          
          <Route
            path='/login'
            element={<LoginPage/>}
          />
          
        </Routes>
      </div>
      
    </>
  )
}

export default App
