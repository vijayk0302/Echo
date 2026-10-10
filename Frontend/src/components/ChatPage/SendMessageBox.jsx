import { useRef, useState } from 'react'
import { FiSend } from "react-icons/fi";
import api from '../../api/api'
import { addMessage } from '../../redux/features/userSlice'
import { useDispatch } from 'react-redux'
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoIosMic } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { RiLoader4Fill } from "react-icons/ri";



const SendMessageBox = ({ selectedUser }) => {

    const [showpicker, setShowPicker] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const [text, setText] = useState('')
    const [image, setImage] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file.size > 6 * 1024 * 1024) {
            setImage(null)
            return
        }
        if (!file) {
            setImage(null)
            return
        }
        setImage(file)

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("text", text)
        formData.append("image", image)
        try {
            setLoading(true)
            const res = await api.post(`/api/message/send/${selectedUser._id}`, formData)
            dispatch(addMessage(res.data))

        } catch (error) {
            setError(error.response?.data?.message ||
                "Something went wrong")

        } finally {
            setLoading(false)
            setImage(null)
            setText("")
        }
    }
    const remove = () => {
        setImage(null)
    }
    const onEmojiClick = (emojiData) => {
        setText(prev => prev + emojiData.emoji)
    }

    return (
        <div className='relative bg-slate-950 w-full rounded-full flex  border-2 border-orange-500/10 px-5 h-fit '>
            {
                image && (
                    <div className='absolute -top-22'>
                        <img className='h-20 w-20' src={URL.createObjectURL(image)} alt="" />
                        <button onClick={remove} className='absolute p-2 cursor-pointer bg-black rounded-full top-0 right-0'>
                            <RxCross1 />
                        </button>
                    </div>
                )
            }

            {
                showpicker && (
                    <div className='absolute -top-95 -left-30'>
                        <EmojiPicker
                            onEmojiClick={onEmojiClick}
                            theme="dark"
                            width={400}
                            height={350} />
                    </div>
                )
            }
            <div className='w-full flex items-center'>
                <div className='flex items-center'>
                    <div className='px-3'>
                        <IoIosMic className='text-2xl sm:text-3xl' />
                    </div>
                    <div
                        className={`px-3 py-3 rounded-full cursor-pointer ${image ? "bg-gray-300/10" : ""}`} >
                        <CiImageOn className='text-2xl sm:text-3xl' onClick={() => inputRef.current.click()} />
                    </div>
                    <div onClick={() => setShowPicker(prev => !prev)} className={`hidden md:block px-3 py-2 rounded-full ${showpicker ? "bg-gray-300/10" : ""} `}>
                        <BsEmojiSmile className='text-xl sm:text-3xl' />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='w-full gap-1 sm:gap-5 flex'>
                    <input
                        ref={inputRef}
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                        className='hidden' />
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={1}
                        cols={1}
                        placeholder='Type message...'
                        className="flex-1  resize-none rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 " />

                    {
                        loading ? (<div className='w-fit py-3'>
                            <RiLoader4Fill className=" text-3xl animate-spin text-orange-500 " />
                        </div>
                        ) : (<button
                            disabled={loading}
                            type='submit'
                            className='md:px-8 px-4 rounded-full bg-orange-500 py-2'>
                            <FiSend className='text-sm sm:text-3xl' />
                        </button>)
                    }

                </form>
            </div>

        </div>
    )
}

export default SendMessageBox