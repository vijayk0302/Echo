import React from 'react'
import Sidebar from '../components/comman/Sidebar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className='flex overflow-hidden'>
        <Sidebar/>
        <main className='w-full'><Outlet/></main>
    </div>
  )
}

export default MainLayout