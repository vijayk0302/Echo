import { useState } from "react"
import useRedirect from "../hook/useRedirect.js"
import { useToggle } from "../hook/useToggle.js"
import api from "../api/api.js"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/features/userSlice.js'

const SignUp = () => {

  const dispatch = useDispatch()

  const [step, setStep] = useState("signup");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handlenavigate } = useRedirect()
  const { show, Toggle } = useToggle()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    username: ""
  })

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await api.post('/api/auth/signup', formData)
      if (res.data.success) {
        setStep("verify");
      }

    } catch (error) {
      setError(error.response?.data?.message ||
        "Something went wrong")
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

  const handleVerify = async (e) => {
    e.preventDefault()
    setError("");
    try {
      setLoading(true);
      const res = await api.post('/api/auth/verify', {
        email: formData.email,
        code: otp
      })

      if (res.data.success) {
        dispatch(setUserData(res.data.user));
        handlenavigate("/profile");
      }

    } catch (error) {
      setError(error.response?.data?.message ||
        "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (<>

    {
      step === "verify" ? (
        <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-ui-bg from-30% to-white px-4 py-6 text-ui-text">

          <div
            onClick={() => handlenavigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-lg font-bold text-white shadow-sm">
              F
            </div>
            <span className="text-xl font-bold tracking-tight">Flick</span>
          </div>


          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />
          
          <div className="relative z-10 flex min-h-[calc(100vh-100px)] w-full items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-black/10 bg-transparent p-8 backdrop-blur-md shadow-xl sm:p-10">

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Verify your email
                  </h1>

                  <p className="mt-2 text-sm text-gray-600">
                    We sent a 6-digit verification code to
                  </p>

                  <p className="mt-1 font-semibold text-gray-900 break-all">
                    {formData.email}
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      if (error) setError('');
                      setOtp(e.target.value);
                    }}
                    placeholder="000000"
                    className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-center text-2xl font-bold tracking-[0.4em] sm:tracking-[0.5em] text-gray-900 outline-none transition-all placeholder:text-gray-400 placeholder:tracking-normal focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/10"
                  />
                </div>


                {error && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-medium text-red-600 backdrop-blur-sm">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>

            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen bg-linear-to-b from-ui-bg from-30% to-white ">
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
            <div className="px-10 py-4 my-8 bg-transparent border border-black/10 backdrop-blur-md shadow-sm rounded-[15px]">
              <div className="mb-8 flex justify-center md:hidden">
                <div className="rounded-full bg-white/10 p-1">
                  <button onClick={() => { handlenavigate("/login") }}
                    className="rounded-full px-5 py-2 text-sm font-medium transition-all  text-black"
                  >
                    Login
                  </button>

                  <button
                    className="rounded-full  px-5 py-2 text-sm font-medium transition-all bg-black text-white"
                  >
                    Signup
                  </button>
                </div>
              </div>
              <h2 className="text-4xl font-bold mt-4 tracking-tight">Get Started</h2>
              <p className="text-lg text-black/80 font-normal tracking-wider py-5">create your account</p>

              <form className="space-y-5" onSubmit={handleSignup} >
                <div >
                  <label className="mb-2 block text-sm font-medium ">
                    Full Name
                  </label>

                  <input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div >
                  <label className="mb-2 block text-sm font-medium ">
                    User Name
                  </label>

                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>


                <div >
                  <label className="mb-2 mt-5 block text-sm font-medium ">
                    Email
                  </label>

                  <input
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='you@example.com'
                    type="email"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium ">
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-16 text-black outline-none transition-all placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />

                    <button
                      onClick={Toggle}
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs "
                    >
                      {show ? "hide" : "show"}
                    </button>
                  </div>

                  {error && (
                    <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-medium text-red-600 backdrop-blur-sm">
                      {error}
                    </p>
                  )}

                  <label className="flex cursor-pointer items-start pt-5 gap-3 text-sm text-gray-400">
                    <input
                      required
                      type="checkbox"
                      className="mt-1 accent-gray-700"
                    />

                    <span>
                      I agree to the{" "}
                      <span className="text-black">
                        Terms & Conditions
                      </span>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-black py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-black/30 active:scale-[0.98]"
                >
                  <span className="relative z-10">
                    {loading ? "please wait.." : "Create Account"}
                  </span>

                  <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                </button>

              </form>
              <div className="flex gap-3 justify-center items-center ">
                <p className="mt-8 text-center text-sm text-gray-500">
                  Already have an account?
                </p>
                <button
                  onClick={() => { handlenavigate("/login") }}
                  className="font-semibold text-sm text-black transition-colors mt-7.5"
                >
                  Login
                </button>
              </div>

            </div>
          </div>
        </div>
      )
    }


  </>

  )
}

export default SignUp