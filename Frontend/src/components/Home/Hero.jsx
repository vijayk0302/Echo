import useRedirect from "../../hook/useRedirect";
import backimage from "/heroPageImage.png";

const Hero = () => {
  const { handlenavigate } = useRedirect();

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-between overflow-hidden bg-ui-bg pt-10 sm:pt-16"> 
      <div className="z-20 flex max-w-4xl flex-col items-center px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl sm:leading-tight">
          A better way to stay connected
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-700 sm:text-lg sm:leading-relaxed">
          Connect with your friends, share your thoughts, and make every
          conversation meaningful with Flick. Simple, fast, and built for real connections.
        </p>
        <div className="mt-6">
          <button
            onClick={() => handlenavigate('/signup')}
            className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Start Chatting
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 bottom-0 z-0 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-white/50 blur-3xl sm:h-150 sm:w-150" />
      <div className="relative z-10 mt-10 w-full max-w-5xl px-4 flex justify-center">
        <img
          src={backimage}
          alt="Flick community members"
          className="h-auto max-h-[50vh] object-contain drop-shadow-xl"
        />
      </div>
    </main>
  );
};

export default Hero;