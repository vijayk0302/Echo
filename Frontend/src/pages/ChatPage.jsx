import { useEffect, useState } from 'react'
import api from '../api/api'
import dp from '/dp.jpg'
import ChatNav from '../components/ChatPage/ChatNav'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/features/userSlice'
import Defaultchatpage from '../components/ChatPage/Defaultchatpage'
import SendMessageBox from '../components/ChatPage/SendMessageBox'
import Messages from '../components/ChatPage/Messages'
import Logout from '../components/comman/Logout'
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.user)
    const [inboxData, setInboxData] = useState([])
    const [replyTo, setReplyTo] = useState(null)

    const fetch = async () => {
        const res = await api.get("/api/message/inbox")
        if (res) {
            setInboxData(res.data.inbox)
        }
    }

    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className='h-screen text-white flex bg-ui-bg overflow-hidden w-full'>
            <aside className={`w-full sm:w-[30%] sm:min-w-75 h-full  border-r flex-col border-[#8F8F8F]/30
                ${selectedUser ? "hidden sm:flex" : "flex"}  `} >
                <div className='flex justify-between h-20 items-center px-5 py-5 shrink-0 border-b border-[#8F8F8F]/30'>
                    <div className='flex gap-5'>
                        <button className='sm:hidden' onClick={()=>navigate(-1)} >
                            <FaChevronLeft />
                        </button>
                        <h1 className='text-3xl sm:text-4xl font-bold'>Inbox</h1>
                    </div>
                    <Logout />
                </div>


                {
                    inboxData.map((item) => {
                        return (
                            <div
                                key={item.conversationId}
                                onClick={() => { dispatch(setSelectedUser(item.user)) }}
                                className='w-full cursor-pointer px-5 gap-5 flex items-center h-17'>
                                <div className='h-12 w-12'>
                                    <img className='w-full h-full rounded-full object-cover' src={item.user.profilepic || dp} alt="" />
                                </div>
                                <div >
                                    <h1 className='text-lg'>{item.user.username}</h1>
                                    <p className='text-[12px] text-gray-500'>{item.lastMessage.text == "" ? "sent an image" : item.lastMessage.text}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </aside>
            <div className={`w-full sm:w-[70%] h-full ${!selectedUser ? 'hidden sm:flex' : 'flex'
                } flex-col`}>
                {
                    selectedUser ? (
                        <div className='w-full h-full flex flex-col pb-15 sm:pb-0 relative echo-scrollbar'>
                            <ChatNav selectedUser={selectedUser} />
                            <Messages selectedUser={selectedUser} replyTo={replyTo} setReplyTo={setReplyTo} />
                            <SendMessageBox selectedUser={selectedUser} replyTo={replyTo} setReplyTo={setReplyTo} />
                        </div>) : (
                        <Defaultchatpage />
                    )
                }
            </div>

        </div>
    )
}

export default ChatPage