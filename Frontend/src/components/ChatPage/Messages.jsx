import { useEffect } from 'react'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setMessages } from '../../redux/features/userSlice'
import { io } from "socket.io-client";


const Messages = ({ selectedUser }) => {
    const dispatch = useDispatch()
    const { userData, messages } = useSelector(state => state.user)
    const fetchMessages = async () => {
        dispatch(setMessages([]))
        if (!selectedUser._id) return
        try {
            const res = await api.get(`/api/message/inbox/${selectedUser._id}`)
            dispatch(setMessages(res.data.messages || []))
        } catch (error) {
            console.error("Error fetching messages:", error?.response?.data?.message);
            dispatch(setMessages([]))
        }
    }
    useEffect(() => {
        fetchMessages()
    }, [selectedUser._id, dispatch])

    useEffect(() => {
        if (!selectedUser?._id) return;

        const socket = io(`${import.meta.env.VITE_API_URL}`, {
            withCredentials: true,
        });

        socket.on("newMessage", (newMessage) => {

            dispatch(addMessage(newMessage));

        });

        return () => {
            socket.off("newMessage");
            socket.disconnect();
        };
    }, [selectedUser._id, dispatch])



    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col justify-end gap-2 px-6 py-4 min-h-full">

                {
                    messages.length === 0 ? (<div className="flex h-full items-center justify-center text-gray-500">
                        <p>No messages yet. Send a message to start the conversation with {selectedUser?.fullname}!</p>
                    </div>) : (<>
                        {messages.map((message) => {
                            const isMine = message.senderId === userData._id;

                            return (
                                <div
                                    key={message._id}
                                    className={`flex w-full ${isMine ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[70%] overflow-hidden rounded-2xl ${isMine
                                            ? "bg-linear-to-r from-orange-500 to-red-500 text-white"
                                            : "bg-white/5 border border-white/10 text-gray-200"
                                            }`}
                                    >
                                        {message.image && (
                                            <img
                                                src={message.image}
                                                alt="Message attachment"
                                                className="block max-w-full max-h-80 w-auto object-contain"
                                            />
                                        )}

                                        {message.text && (
                                            <p className="px-4 py-2 text-sm">
                                                {message.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                    )
                }
            </div>
        </div>
    )
}

export default Messages
