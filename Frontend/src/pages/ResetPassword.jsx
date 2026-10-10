import React, { useState } from 'react'
import api from '../api/api'
import { useParams, Link } from 'react-router-dom'
import { useToggle } from '../hook/useToggle'
import useRedirect from '../hook/useRedirect'

const ResetPassword = () => {
  const {handlenavigate}=useRedirect()
  const { token } = useParams()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { show, Toggle } = useToggle()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true)
      const res = await api.post(`/api/auth/forget-password/${token}`, { password })
      console.log(res.data.message)
      setTimeout(() =>handlenavigate("/login", { replace: true }), 1500);
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to reset password."
      );
    } finally {
      setLoading(false)
      setConfirmPassword("")
      setPassword("")
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-gray-900 p-8 text-white"
      >
        <h1 className="text-2xl font-bold">Reset your password</h1>

        <div className="relative my-7">
          <input
            required
            name="password"
            value={password}
            onChange={(e) => {
              if (error) {
                setError("")
              }
              setPassword(e.target.value)
            }}
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

        <div className="relative">
          <input
            required
            name="password"
            value={confirmPassword}
            onChange={(e) => {
              if (error) {
                setError("")
              }
              setConfirmPassword(e.target.value)
            }}
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

        <button
          disabled={loading}
          type="submit"
          className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition disabled:cursor-not-allowed hover:bg-orange-600 active:scale-[0.98]"
        >
          {loading ? "Please wait" : "Submit"}
        </button>

        <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 transition hover:text-orange-500">
          Back to login
        </Link>
      </form>
    </main>
  )
}

export default ResetPassword