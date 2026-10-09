import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { useCurrentUser } from './hook/useCurrentUser.js'
import Profile from './pages/Profile.jsx'
import Protectedroute from './utils/Protectedroute.jsx'
import AuthRoutes from './utils/AuthRoutes.jsx'
import ChatPage from './pages/ChatPage.jsx'
import MainLayout from './layout/MainLayout.jsx'
import SearchPage from './pages/SearchPage.jsx'
import EditPage from './pages/EditPage.jsx'


const App = () => {

  useCurrentUser()

  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
      </Route>
      <Route element={<Protectedroute />}>
        <Route element={<MainLayout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/search' element={< SearchPage />} />
          <Route path='/edit-profile/:id' element={< EditPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
