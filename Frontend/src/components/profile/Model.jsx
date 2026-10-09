import { FaChevronLeft } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import dp from '/dp.jpg'
import { useDispatch } from 'react-redux'
import { setMessages, setSelectedUser } from '../../redux/features/userSlice';
import useRedirect from '../../hook/useRedirect';

const Model = ({ setShow, tab, followers, following }) => {
    const dispatch = useDispatch()
    const { handlenavigate } = useRedirect()
    return (
        <>
            {
                tab === "followers" ? (
                    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-black/70 ">
                        <div className="bg-slate-950 sm:h-150 sm:w-150 h-full w-full rounded-xl border-orange-500/10 border-b py-4 shadow-lg">
                            <div className="flex sm:block w-[50%] relative sm:w-full justify-between px-4">
                                <button onClick={() => setShow(false)} className="absolute hidden sm:block right-10 text-2xl"><RxCross1 /></button>
                                <button onClick={() => setShow(false)} className="sm:hidden ">  <FaChevronLeft /></button>
                                <h1 className="sm:text-center py-3">followers</h1>
                            </div>
                            <div className="sm:px-15 px-3">
                                <input
                                    placeholder='username...'
                                    className="w-full rounded px-4 py-2.5 border border-white/10 bg-white/5  text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" type="text" />
                            </div>
                            <div className="h-0.5 bg-orange-500/10 w-full mt-5" />
                            <div className='w-full sm:px-10 px-5 mt-4'>
                                {
                                    followers.map((item) => {
                                        return (
                                            <div className='w-full flex justify-between py-1' key={item._id}>
                                                <div onClick={() => { 
                                                    setShow(false)
                                                    handlenavigate(`/profile/${item._id}`)}} className='flex items-center gap-5 '>
                                                    <div className='sm:w-17 sm:h-17 h-15 w-15'>
                                                        <img className='object-cover w-full h-full rounded-full' src={item.profilepic || dp} alt={item.fullname} />
                                                    </div>
                                                    <div>
                                                        <h1  className='sm:text-lg text-[10px]'>{item.username}</h1>
                                                        <p className='sm:text-sm text-[10px] text-gray-400'>{item.fullname}</p>
                                                    </div>
                                                </div>
                                                <div className='justify-center items-center flex '>
                                                    <button
                                                        onClick={() => {
                                                            
                                                            dispatch(setSelectedUser(item))
                                                            handlenavigate('/chat')

                                                        }}
                                                        className='bg-gray-700/10 hover:bg-gray-700/40 sm:text-lg text-[13px] rounded-lg px-2 py-2'>message</button>
                                                </div>
                                            </div>)
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-black/70 ">
                        <div className="bg-slate-950 sm:h-100 sm:w-150 h-full w-full rounded-xl border-orange-500/10 border-b py-4 shadow-lg">
                            <div className="flex sm:block w-[50%] relative sm:w-full justify-between px-4">
                                <button onClick={() => setShow(false)} className="absolute hidden sm:block right-10 text-2xl"><RxCross1 /></button>
                                <button onClick={() => setShow(false)} className="sm:hidden ">  <FaChevronLeft /></button>
                                <h1 className="sm:text-center py-3">following</h1>
                            </div>
                            <div className="sm:px-15 px-3">
                                <input
                                    placeholder='username...'
                                    className="w-full rounded px-4 py-2.5 border border-white/10 bg-white/5  text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" type="text" />
                            </div>
                            <div className="h-0.5 bg-orange-500/10 w-full mt-5" />
                            <div className='w-full sm:px-10 px-5 mt-4'>
                                {
                                    following.map((item) => {
                                        return (
                                            <div className='w-full flex justify-between py-1' key={item._id}>
                                                <div onClick={() => { 
                                                    setShow(false)
                                                    handlenavigate(`/profile/${item._id}`)}} className='flex items-center gap-5 '>
                                                    <div className='sm:w-17 sm:h-17 h-15 w-15'>
                                                        <img className='object-cover w-full h-full rounded-full' src={item.profilepic || dp} alt={item.fullname} />
                                                    </div>
                                                    <div>
                                                        <h1 className='sm:text-lg text-[10px]'>{item.username}</h1>
                                                        <p className='sm:text-sm text-[10px] text-gray-400'>{item.fullname}</p>
                                                    </div>
                                                </div>
                                                <div className='justify-center items-center flex '>
                                                    <button
                                                        onClick={() => {
                                                            dispatch(setSelectedUser(item))
                                                            handlenavigate('/chat')

                                                        }}
                                                        className='bg-gray-700/10 hover:bg-gray-700/40 sm:text-lg text-[13px] rounded-lg px-2 py-2'>message</button>
                                                </div>
                                            </div>)
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Model