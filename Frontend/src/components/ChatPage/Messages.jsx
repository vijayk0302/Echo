import { useEffect } from 'react'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setMessages } from '../../redux/features/userSlice'
import { io } from "socket.io-client";
import { useRef } from 'react';
import { useState } from 'react';


const Messages = ({ selectedUser, replyTo, setReplyTo }) => {

    const [menu, setMenu] = useState(null)
    const timerRef = useRef(null);

    const handleMouseDown = (message) => {
        timerRef.current = setTimeout(() => {
            setMenu(message._id)
        }, 500)
    }

    const handleMouseUp = () => {
        clearTimeout(timerRef.current);
    };

    const handleReply = (message) => {
        setReplyTo(message)
        setMenu(null);
    }

    const bottomRef = useRef(null);
    const dispatch = useDispatch()
    const { userData, messages } = useSelector(state => state.user)


    const fetchMessages = async () => {
        dispatch(setMessages([]))
        if (!selectedUser._id) return
        try {
            const res = await api.get(`/api/message/inbox/${selectedUser._id}`)
            console.log(res.data.messages)
            dispatch(setMessages(res.data.messages || []))
        } catch (error) {
            console.error("Error fetching messages:", error?.response?.data?.message);
            dispatch(setMessages([]))
        }
    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, [selectedUser?._id, messages]);
    useEffect(() => {
        fetchMessages()
    }, [selectedUser._id, dispatch])

    useEffect(() => {
        if (!selectedUser?._id) return;

        const socket = io(`${import.meta.env.VITE_API_URL}`, {
            withCredentials: true,
        });

        socket.on("newMessage", (newMessage) => {
            console.log("Socket message:", newMessage);
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
                    messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-gray-500">
                            <p>No messages yet. Send a message to start the conversation with {selectedUser?.fullname}!</p>
                        </div>) : (< >
                            {messages.map((message) => {
                                const isMine = message.senderId === userData._id;
                                return (
                                    <div
                                        key={message._id}
                                        className={`flex w-full ${isMine ? "justify-end" : "justify-start"
                                            } `}
                                    >
                                        <div className='relative max-w-[70%]'>
                                            <div
                                                onMouseDown={() => handleMouseDown(message)}
                                                onMouseUp={handleMouseUp}
                                                onMouseLeave={handleMouseUp}
                                                className={` overflow-hidden relative select-none rounded-2xl ${isMine
                                                    ? "bg-linear-to-r from-orange-500 to-red-500 text-white"
                                                    : "bg-white/5 border border-white/10 text-gray-200"
                                                    }`}
                                            >
                                                {message.replyTo && (
                                                    <div className={`mb-2 p-2 rounded-xl text-xs border-l-4 ${isMine
                                                        ? "bg-black/20 border-white/80 text-white/90"
                                                        : "bg-white/10 border-orange-500 text-gray-300"
                                                        }`}>
                                                        <p className="font-medium opacity-75">
                                                            {
                                                                isMine ? (
                                                                    <span> Replied to {message?.replyTo?.senderId === message?.senderId ? "Yourself" : selectedUser.username}
                                                                    </span>) : (<span>  Replied to {message?.replyTo?.senderId === message?.senderId ? "themself" : "you"}</span>)
                                                            }
                                                        </p>
                                                        <p className="truncate max-w-50">
                                                            {message.replyTo.text || (message.replyTo.image ? "Photo" : "Attachment")}
                                                        </p>
                                                    </div>
                                                )}
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
                                            {
                                                menu == message._id && (
                                                    <div
                                                        className={`absolute z-20 top-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl flex flex-col py-1 w-28 ${isMine ? "right-0" : "left-0"
                                                            }`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <button
                                                            onClick={() => handleReply(message)}
                                                            className="px-4 py-2 text-left text-sm text-gray-200 hover:bg-zinc-700 transition"
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={bottomRef} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Messages
