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
        <div className="h-screen w-full flex justify-center items-center bg-slate-950 overflow-hidden sm:px-0 px-5">
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl px-10 py-15 sm:px-20 sm:py-30 rounded-xl">
            <form onSubmit={handleVerify} className="space-y-5">

              <div className="text-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-white">
                  Verify your email
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  We sent a 6-digit verification code to
                </p>

                <p className="mt-1 font-medium text-orange-400">
                  {formData.email}
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-center text-2xl font-semibold tracking-[0.5em] text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />

              {error && (
                <p className="text-center text-sm text-red-500 py-3 bg-slate-950 backdrop-blur-xl border border-red-500/20 rounded">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>

            </form>
          </div>

        </div>
      ) : (<div className="min-h-screen relative bg-slate-950 flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="absolute -top-25 -left-25 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-25 -right-25 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

        <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="grid min-h-150 md:grid-cols-2">
            <div
              className="hidden md:flex relative items-center justify-center overflow-hidden bg-linear-to-br order-2 from-orange-500 to-red-600 p-12 text-white transition-all duration-700"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10" />

              <div className="relative z-10 max-w-sm text-center">
                <h1 className="mb-5 text-4xl font-bold">
                  Join Us Today!
                </h1>

                <p className="mb-8 text-white/80">
                  Create an account and start exploring everything we have to offer.
                </p>

                <button
                  onClick={() => { handlenavigate("/login") }}
                  className="rounded-full border border-white px-8 py-3 font-semibold transition-all duration-300 hover:bg-white hover:text-orange-600 hover:scale-105"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14 transition-all duration-700">
              <div className="w-full max-w-md">

                <div className="mb-8 flex justify-center md:hidden">
                  <div className="rounded-full bg-white/10 p-1">
                    <button
                      onClick={() => { handlenavigate("/login") }}
                      className="rounded-full px-5 py-2 text-sm font-medium transition-all text-white"
                    >
                      Login
                    </button>

                    <button
                      className="rounded-full px-5 py-2 text-sm font-medium transition-all bg-orange-500 text-white"
                    >
                      Signup
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="mb-2 text-sm font-medium text-orange-400">
                    GET STARTED
                  </p>

                  <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Create your account
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Fill in your details to get started.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSignup} >
                  <div >
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Full Name
                    </label>

                    <input
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div >
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      User Name
                    </label>

                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>


                  <div >
                    <label className="mb-2 mt-5 block text-sm font-medium text-gray-300">
                      Email
                    </label>

                    <input
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='you@example.com'
                      type="email"
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
                        name='password'
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

                    <label className="flex cursor-pointer items-start pt-5 gap-3 text-sm text-gray-400">
                      <input
                        required
                        type="checkbox"
                        className="mt-1 accent-orange-500"
                      />

                      <span>
                        I agree to the{" "}
                        <span className="text-orange-400">
                          Terms & Conditions
                        </span>
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/30 active:scale-[0.98]"
                  >
                    <span className="relative z-10">
                      Create Account
                    </span>

                    <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                  </button>

                </form>
                <p className="mt-8 text-center text-sm text-gray-400">
                  Already have an account?
                  <button
                    onClick={() => { handlenavigate("/login") }}
                    className="font-semibold text-orange-400 transition-colors hover:text-orange-300"
                  >
                    Login
                  </button>
                </p>

              </div>

            </div>

          </div>
        </div>
      </div>)
    }

  </>

  )
}

export default SignUp