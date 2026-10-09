import { ArrowRight, MessageCircle, ShieldCheck, Zap, Users } from "lucide-react";
import useRedirect from "../hook/useRedirect.js";


const Home = () => {

  const { handlenavigate } = useRedirect()
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
   
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Logo */}
        <button
          
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20">
            <MessageCircle size={24} />
          </div>

          <span className="text-2xl font-bold tracking-tight">Echo</span>
        </button>

        
        <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <a href="#features" className="transition hover:text-orange-400">
            Features
          </a>
          <a href="#about" className="transition hover:text-orange-400">
            About
          </a>
          <a href="#contact" className="transition hover:text-orange-400">
            Contact
          </a>
        </div>

        {/* Navbar Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {handlenavigate("/login")}}
            className="hidden rounded-full px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:text-white sm:block"
          >
            Login
          </button>

          <button
            onClick={() => {handlenavigate("/signup")}}
            className="rounded-full bg-linear-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:scale-105 hover:shadow-orange-500/30"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-2 lg:px-10 lg:pb-32 lg:pt-24">
        {/* Hero Content */}
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            A better way to stay connected
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Conversations
            <span className="block bg-linear-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              that echo.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg lg:mx-0">
            Connect with your friends, share your thoughts, and make every
            conversation meaningful with Echo — simple, fast, and built for
            real connections.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <button
              onClick={() => {handlenavigate("/signup")}}
              className="group flex items-center justify-center gap-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 px-7 py-4 font-semibold text-white shadow-xl shadow-orange-500/20 transition hover:scale-105 hover:shadow-orange-500/30"
            >
              Start Chatting
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => {handlenavigate("/login")}}
              className="rounded-full border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:border-orange-400/50 hover:bg-orange-500/10"
            >
              I already have an account
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-5 text-sm text-gray-400 lg:justify-start">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-400" />
              Secure conversations
            </div>

            <div className="flex items-center gap-2">
              <Zap size={18} className="text-orange-400" />
              Fast messaging
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-full bg-linear-to-r from-orange-500/20 to-red-600/20 blur-3xl" />

          <div className="relative rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            {/* Window Header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-orange-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <span className="text-xs text-gray-500">echo.app</span>

              <MessageCircle size={18} className="text-orange-400" />
            </div>

            {/* Fake Chat Preview */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-red-600 font-bold">
                  AS
                </div>

                <div>
                  <h3 className="font-semibold">Aarav Sharma</h3>
                  <p className="text-xs text-green-400">Online now</p>
                </div>

                <span className="ml-auto rounded-full bg-green-400/10 px-3 py-1 text-xs text-green-400">
                  Active
                </span>
              </div>

              <div className="space-y-4 rounded-2xl bg-black/10 p-4">
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-200">
                  Hey! Welcome to Echo.
                </div>

                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-linear-to-r from-orange-500 to-red-500 px-4 py-3 text-sm text-white">
                  This looks amazing. I love the design!
                </div>

                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-200">
                  Let's stay connected.
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex-1 text-sm text-gray-500">
                  Type a message...
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-red-500">
                  <ArrowRight size={17} />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                <Users size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold">Stay connected</p>
                <p className="text-xs text-gray-500">Anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 border-t border-white/10 bg-white/2 px-6 py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Why Echo?
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to connect
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Designed to make conversations effortless, enjoyable, and
              accessible.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Simple Conversations",
                description:
                  "Enjoy a clean and intuitive experience focused on the people who matter.",
              },
              {
                icon: Zap,
                title: "Fast & Reliable",
                description:
                  "Send messages quickly and stay connected without unnecessary complexity.",
              },
              {
                icon: ShieldCheck,
                title: "Privacy First",
                description:
                  "Keep your conversations protected with a secure messaging experience.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500/20 to-red-500/20 text-orange-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="about"
        className="relative z-10 px-6 py-20 text-center lg:px-10"
      >
        <div className="mx-auto max-w-4xl rounded-4xl border border-orange-400/20 bg-linear-to-br from-orange-500/10 to-red-600/10 px-6 py-14 backdrop-blur-xl sm:px-12">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Ready to make your voice heard?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            Join Echo today and start creating conversations that last.
          </p>

          <button
            onClick={() => {handlenavigate("/signup")}}
            className="mt-8 rounded-full bg-linear-to-r from-orange-500 to-red-500 px-8 py-4 font-semibold shadow-xl shadow-orange-500/20 transition hover:scale-105"
          >
            Create Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/10 px-6 py-7 lg:px-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Echo. All rights reserved.</p>

          <p>
            Built for meaningful conversations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;