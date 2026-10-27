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
    <>
      <div className="h-screen w-full bg-linear-to-b from-ui-bg from-5% to-white to-95%">
        <div
          onClick={() => handlenavigate('/')}
          className="flex items-center gap-2 px-3 py-4 cursor-pointer select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold text-lg shadow-sm">
            F
          </div>
          <span className="text-xl font-bold tracking-tight">Flick</span>
        </div>

        <div className="w-full h-fit px-2 flex justify-center items-center">
          <div className="px-10 py-4 mt-25 bg-transparent border border-black/10 backdrop-blur-md shadow-sm rounded-[15px]">
            <div className="mb-8 flex justify-center md:hidden">
              <div className="rounded-full bg-white/10 p-1">  
                <button
                  className="rounded-full px-5 py-2 text-sm font-medium transition-all bg-black text-white"
                >
                  Login
                </button>

                <button

                  onClick={() => { handlenavigate("/signup") }}
                  className="rounded-full  px-5 py-2 text-sm font-medium transition-all text-black"
                >
                  Signup
                </button>
              </div>
            </div>
            <h2 className="text-4xl font-bold mt-4 tracking-tight">Welcome Back</h2>
            <p className="text-lg text-black/80 font-normal tracking-wider py-5">Login to your Flick account</p>

            <form className="space-y-5" onSubmit={handleLogin} >
              <div>
                <label className="mb-2 block text-sm font-medium ">
                  Email
                </label>

                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={"you@example.com"}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none transition-all placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium ">
                    Password
                  </label>
                  <button
                    onClick={() => handlenavigate("/forget-password")}
                    type="button"
                    className="text-xs text-gray-400 "
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-16 outline-none transition-all placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    onClick={Toggle}
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs black"
                  >
                    {show ? "hide" : "show"}
                  </button>
                </div>

                {error && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-medium text-red-600 backdrop-blur-sm">
                    {error}
                  </p>
                )}

              </div>
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-black py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-black/30 active:scale-[0.98]"
              >
                <span className="relative z-10">
                  {loading ? "please wait.." : "Login"}
                </span>

                <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>

            </form>
            <div className="flex gap-3 justify-center items-center ">
              <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?
              </p>
              <button
                onClick={() => { handlenavigate("/signup") }}
                className="font-semibold text-sm text-black transition-colors mt-7.5"
              >
                Sign up
              </button>
            </div>

          </div>
        </div>

      </div>
    </>

  )
}

export default Login