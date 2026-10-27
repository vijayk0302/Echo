import useRedirect from "../../hook/useRedirect";

const Navbar = () => {
  const { handlenavigate } = useRedirect();

  return (
    <nav className="relative flex h-20 w-full items-center justify-between bg-ui-bg px-6 sm:px-12 text-ui-text">
      
      <div 
        onClick={() => handlenavigate('/')} 
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold text-lg shadow-sm">
          F
        </div>
        <span className="text-xl font-bold tracking-tight">Flick</span>
      </div>

     
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center rounded-full border border-black/10 bg-white/10 px-6 py-2.5 backdrop-blur-md shadow-sm">
        <div className="flex gap-8 text-sm font-medium">
          <a href="#home" className="transition-colors hover:text-black/60">Home</a>
          <a href="#feature" className="transition-colors hover:text-black/60">Features</a>
          <a href="#contact" className="transition-colors hover:text-black/60">Contact</a>
          <a href="#about" className="transition-colors hover:text-black/60">About</a>
        </div>
      </div>

     
      <div className="flex items-center gap-3">
        <button
          onClick={() => handlenavigate('/login')}
          className="rounded-full bg-white/80 px-5 py-2 text-sm font-medium text-black transition-all hover:bg-white hover:shadow-sm"
        >
          Login
        </button>
        <button
          onClick={() => handlenavigate('/signup')}
          className="rounded-full border border-black/20 bg-transparent px-5 py-2 text-sm font-medium transition-all hover:bg-black hover:text-white"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;