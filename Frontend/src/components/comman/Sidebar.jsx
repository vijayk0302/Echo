import { NavLink } from 'react-router-dom'
import { FaUser, FaSearch } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <>
      <div className='bg-ui-bg px-5 w-1/5 hidden sm:block shrink-0 border-r border-[#8F8F8F]/30' >
        <h1 className='text-2xl text-ui-text mt-10'>Navigation</h1>
        <div className='bg-ui-secbg items-start rounded-xl p-3 mt-5 sm:flex flex-col gap-5'>
          <NavLink to={"/profile"}>
            <div className='flex gap-2'>
              <FaUser className='text-2xl text-ui-text' />
              <span className=' text-ui-text'>Profile</span>
            </div>
          </NavLink>
          <NavLink to={'/chat'}>
            <div className='flex gap-2'>
              <IoChatbubbleSharp className='text-2xl text-ui-text' />
              <span className=' text-ui-text'>Chats</span>
            </div>
          </NavLink>
          <NavLink to={'/search'}>
            <div className='flex gap-2'>
              <FaSearch className='text-2xl text-ui-text' />
              <span className=' text-ui-text'>Search</span>
            </div>
          </NavLink>
        </div>
      </div>

      <div className='bg-ui-bg text-white fixed bottom-0 z-50 sm:hidden flex p-4 justify-between h-15 w-full  '>
        <div>
          <NavLink to={"/profile"}> <FaUser className='text-2xl' /> </NavLink>
        </div>
        <div>
          <NavLink to={'/chat'}><IoChatbubbleSharp className='text-2xl' /></NavLink>
        </div>
        <div>
          <NavLink to={'/search'}><FaSearch className='text-2xl' /></NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar