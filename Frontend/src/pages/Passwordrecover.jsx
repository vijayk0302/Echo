import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import api from "../api/api";
import { MdMessage } from "react-icons/md";

const Passwordrecover = () => {
    const [email, setEmail] = useState("")
    const [step, setStep] = useState("first")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/api/auth/forget-password', { email })
            console.log(res.data)
            if (res.data.success) {
                setStep("second")
            }
        } catch (error) {
            setError(error.response?.data?.message ||
                "Something went wrong")

        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            {
                step === "second" ? (
                    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center px-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center shadow-2xl shadow-orange-500/10 backdrop-blur-xl">

                           
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                               <MdMessage className="text-4xl text-orange-500" />
                            </div>

                        
                            <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                                Check Your Email
                            </h1>

                            
                            <p className="mx-auto max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
                                We've sent you a password reset link. Please check your email inbox
                                or spam folder to reset your password.
                            </p>

                            <p className="mt-6 text-sm text-slate-500">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>

                        </div>
                    </div>
                ) : (<>
                    <div className="min-h-screen w-full bg-slate-950 text-white flex justify-center items-center px-4">
                        <div className="w-full max-w-md border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl shadow-2xl p-6 sm:p-8">

                            <h1 className="text-center text-2xl font-bold tracking-wide">
                                Forgot Password?
                            </h1>

                            <p className="text-center text-sm text-slate-400 mt-3 leading-6">
                                Enter your registered email address. We'll send you an email to
                                verify your identity and reset your password.
                            </p>


                            <form onSubmit={handleSubmit} className="mt-7">

                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            if (error) {
                                                setError("")
                                            }
                                            setEmail(e.target.value)
                                        }}
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                                    />
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
                                    {loading ? "Please wait" : "Send Email"}
                                </button>
                            </form>

                            <a
                                href="/login"
                                className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 transition hover:text-orange-500"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Login
                            </a>

                        </div>
                    </div>
                </>)
            }
        </>

    )
}

export default Passwordrecover