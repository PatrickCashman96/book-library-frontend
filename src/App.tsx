import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import BookPage from './pages/BookPage'
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
          
          <Route
            path='/books'
            element={<BookPage/>}
          />
          
        </Routes>
      </div>
      
    </>
  )
}

export default App
