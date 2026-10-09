import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const Protectedroute = () => {
    const {userData,loading}=useSelector((state)=>state.user)

    if(loading){
        return  <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Loading profile...</p>
      </div>
    }

    return userData?<Outlet/>:<Navigate to={"/login"}/>
 
}

export default Protectedroute