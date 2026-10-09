import { LogOut } from 'lucide-react'
import React from 'react'
import api from '../../api/api'
import useRedirect from '../../hook/useRedirect'
import { useDispatch } from 'react-redux'
import { setMessages, setSelectedUser, setUserData } from '../../redux/features/userSlice'

const Logout = () => {
    const dispatch=useDispatch()
  

    const handleClick = async () => {
        const res = await api.post("/api/auth/logout")
        if(res.data.message){
            dispatch(setUserData(null))
            dispatch(setSelectedUser(null))
        }
    }
    return (
        <button className='cursor-pointer' onClick={handleClick}>
            <LogOut />
        </button>
    )
}

export default Logout