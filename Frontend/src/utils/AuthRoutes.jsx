import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () => {
  const {userData,loading}=useSelector((state)=>state.user)

     if(loading){
        return  <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Loading profile...</p>
      </div>
     }
 
     return userData?<Navigate to={"/profile"}/>:<Outlet/>
}

export default AuthRoutes