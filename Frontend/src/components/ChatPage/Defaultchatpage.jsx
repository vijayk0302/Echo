
const Defaultchatpage = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                <div className="mb-7 relative">
                    <div className="absolute inset-0 rounded-3xl bg-orange-500/20 blur-xl" />
                    <div className="relative h-20 w-20 rounded-3xl bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl shadow-orange-500/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                            className="h-10 w-10 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.83 9.83 0 01-4.255-.936L3 20l1.553-3.106A7.64 7.64 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                </div>


                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Welcome to <span className="text-orange-400">Echo</span>
                </h1>


                <p className="mt-3 max-w-md text-sm sm:text-base leading-6 text-gray-400">
                    Your conversations, your people, your space.
                    <br />
                    Select a conversation from the sidebar to start chatting.
                </p>


                <div className="mt-8 flex items-center gap-3">
                    <div className="h-px w-10 bg-white/10" />
                    <span className="text-xs text-gray-500">
                        CONNECT • CHAT • ECHO
                    </span>
                    <div className="h-px w-10 bg-white/10" />
                </div>

            </div>
        </div>
    )
}

export default Defaultchatpage