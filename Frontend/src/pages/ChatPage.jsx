import  { useEffect, useState } from 'react'
import api from '../api/api'
import dp from '/dp.jpg'
import ChatNav from '../components/ChatPage/ChatNav'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/features/userSlice'
import Defaultchatpage from '../components/ChatPage/Defaultchatpage'
import SendMessageBox from '../components/ChatPage/SendMessageBox'
import Messages from '../components/ChatPage/Messages'
import Logout from '../components/comman/Logout'


const ChatPage = () => {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.user)

    const [inboxData, setInboxData] = useState([])
    
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
        <div className='h-screen text-white flex bg-slate-950 overflow-hidden w-full'>
            <aside className={`w-full sm:w-[30%] sm:min-w-75 h-full  border-r-2 flex-col border-orange-500/10
                ${selectedUser ? "hidden sm:flex" : "flex"}  `} >

                <div className='flex justify-between items-center px-5 py-2 shrink-0'>
                    <h1 className='text-3xl sm:text-4xl font-bold'>Chats</h1>
                    <Logout />
                </div>
                <div className='px-5 border-b border-orange-500/10 pb-4 shrink-0'>
                    <input
                        placeholder='username...'
                        className="w-full rounded-full px-4 py-2.5 border border-white/10 bg-white/5  text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" type="text" />
                </div>
                {
                    inboxData.map((item) => {
                        return (
                            <div
                                key={item.conversationId}
                                onClick={() => { dispatch(setSelectedUser(item.user)) }}
                                className='w-full cursor-pointer px-5 gap-5 flex items-center h-17'>
                                <div className='h-12 w-12'>
                                    <img className='w-full h-full rounded-full ' src={item.user.profilepic || dp} alt="" />
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
                            <Messages selectedUser={selectedUser} />
                            <SendMessageBox selectedUser={selectedUser} />
                        </div>) : (
                        <Defaultchatpage />
                    )
                }
            </div>

        </div>
    )
}

export default ChatPage