import React from 'react'
import { NavLink } from 'react-router-dom'
import { MessageCircle, User, Search } from 'lucide-react'

const Sidebar = () => {
  return (
    <div >
      <div className='bg-slate-950 w-10 hidden py-10 border-orange-500/10 border-r h-full items-center sm:flex flex-col gap-10'>
        <div>
          <NavLink to={"/profile"}> <User color='white' size={29} /> </NavLink>
        </div>
        <div>
          <NavLink to={'/chat'}><MessageCircle color="white" size={29} /></NavLink>
        </div>
        <div>
          <NavLink to={'/search'}><Search color='white' size={29} /></NavLink>
        </div>
      </div>

      <div className='bg-slate-950 fixed bottom-0 z-50 sm:hidden flex p-4 justify-between h-15 w-full  '>
        <div>
          <NavLink to={"/profile"}> <User color='white' size={29} /> </NavLink>
        </div>
        <div>
          <NavLink to={'/chat'}><MessageCircle color="white" size={29} /></NavLink>
        </div>
        <div>
          <NavLink to={'/search'}><Search color='white' size={29} /></NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar