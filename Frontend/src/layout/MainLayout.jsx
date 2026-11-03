import React from 'react'
import Sidebar from '../components/comman/Sidebar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
        <Sidebar  />
        <main className='flex-1 h-full overflow-y-auto'><Outlet/></main>
    </div>
  )
}

export default MainLayout