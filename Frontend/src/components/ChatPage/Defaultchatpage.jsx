
const Defaultchatpage = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-ui-bg flex items-center justify-center">
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Welcome to <span className="text-gray-400">Flick</span>
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