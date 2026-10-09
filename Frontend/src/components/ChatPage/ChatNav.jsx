import { CiMenuKebab } from "react-icons/ci";
import { FaChevronLeft } from "react-icons/fa";
import dp from '/dp.jpg'
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/features/userSlice";

const ChatNav = ({ selectedUser }) => {
  const dispatch=useDispatch()
  return (
    <div className='w-full h-20 px-5 border-b border-orange-500/10 flex items-center justify-between'>
      <div className='flex gap-3'>
        <button onClick={()=>dispatch(setSelectedUser(null))} className='sm:hidden' >
        <FaChevronLeft />
        </button>
        <div className='h-10 w-10 sm:h-15  sm:w-15'>
          <img className='rounded-full w-full h-full object-cover' src={selectedUser.profilepic || dp} alt="" />
        </div>
        <div>
          <h1 className='text-sm sm:text-lg'>{selectedUser.username || "Echo user"}</h1>
          <p className='text-[10px] sm:text-sm text-gray-500'>Active 5h ago</p>
        </div>
      </div>
      <div>
        <CiMenuKebab className="sm:text-3xl text-lg" />
      </div>
    </div>
  )
}

export default ChatNav