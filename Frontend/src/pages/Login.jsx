import { useState } from "react"
import useRedirect from "../hook/useRedirect.js"
import { useToggle } from "../hook/useToggle.js"
import api from "../api/api.js"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/features/userSlice.js'


const Login = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { handlenavigate } = useRedirect()
  const { show, Toggle } = useToggle()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/api/auth/login', formData)
      dispatch(setUserData(res.data))
      handlenavigate('/profile')
      setFormData({
        email: "",
        password: "",
      })
    } catch (error) {
      console.error("Search failed:", error.response.data.message);
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (error) {
      setError('')
    }
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div className="min-h-screen relative bg-slate-950 flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="absolute -top-25 -left-25 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-25 -right-25 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
        <div className="grid min-h-150 md:grid-cols-2">
          <div
            className="hidden md:flex relative items-center justify-center overflow-hidden bg-linear-to-br from-orange-500 to-red-600 p-12 text-white transition-all duration-700"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10" />

            <div className="relative z-10 max-w-sm text-center">
              <h1 className="mb-5 text-4xl font-bold">
                Welcome Back!
              </h1>

              <p className="mb-8 text-white/80">
                Login to continue your journey with us and enjoy a seamless experience.
              </p>

              <button
                onClick={() => { handlenavigate("/signup") }}
                className="rounded-full border border-white px-8 py-3 font-semibold transition-all duration-300 hover:bg-white hover:text-orange-600 hover:scale-105"
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14 transition-all duration-700">
            <div className="w-full max-w-md">

              <div className="mb-8 flex justify-center md:hidden">
                <div className="rounded-full bg-white/10 p-1">
                  <button
                    className="rounded-full px-5 py-2 text-sm font-medium transition-all bg-orange-500 text-white"
                  >
                    Login
                  </button>

                  <button

                    onClick={() => { handlenavigate("/signup") }}
                    className="rounded-full  px-5 py-2 text-sm font-medium transition-all text-white"
                  >
                    Signup
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-orange-400">
                  WELCOME BACK
                </p>

                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Login to your account
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Enter your details to continue
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin} >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                  </label>

                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder={"you@example.com"}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-orange-400 hover:text-orange-300"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">
                    <input
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-16 text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />

                    <button

                      onClick={Toggle}
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                    >
                      {show ? "hide" : "show"}
                    </button>
                  </div>

                  {error && (
                    <p className="text-center text-sm mt-5 text-red-500 py-3 bg-slate-950 backdrop-blur-xl border border-red-500/20 rounded">
                      {error}
                    </p>
                  )}

                </div>
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/30 active:scale-[0.98]"
                >
                  <span className="relative z-10">
                    {loading ? "please wait.." : "Login"}
                  </span>

                  <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                </button>

              </form>
              <p className="mt-8 text-center text-sm text-gray-400">
                Don't have an account?
                <button
                  onClick={() => { handlenavigate("/signup") }}
                  className="font-semibold text-orange-400 transition-colors hover:text-orange-300"
                >
                  Sign up
                </button>
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Login