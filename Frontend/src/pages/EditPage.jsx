import { useDispatch, useSelector } from "react-redux";
import dp from "/dp.jpg";
import { useState } from "react";
import api from "../api/api";
import useRedirect from "../hook/useRedirect";
import { setUserData } from "../redux/features/userSlice";

const EditPage = () => {
  const dispatch = useDispatch()
  const { handlenavigate } = useRedirect()
  const { userData } = useSelector((state) => state.user);
  const {
    fullname,
    username,
    email,
    profilepic,
    createdAt,
  } = userData;


  const [newData, setNewData] = useState({
    fullname: userData.fullname,
    username: userData.username,
    gender: userData.gender || "",
    bio: userData.bio || "",
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", newData.fullname)
    formData.append("username", newData.username)
    formData.append("gender", newData.gender)
    formData.append("bio", newData.bio)
    formData.append("profilepic", image)

    try {
      const res = await api.put("/api/auth/update-profile", formData)
      if (res.data.success) {
        dispatch(setUserData(res.data.updatedUser))
        setNewData({
          fullname: "",
          username: "",
          gender: "",
          bio: ""
        })

        setImage(null)
        setPreview(false)

        handlenavigate('/profile')
      }

    } catch (error) {
      console.log(error?.response?.data)
    }

  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setImage(null)
      setPreview(file)
      return
    }
    if (file.size > 6 * 1024 * 1024) {
      setImage(null)
      setPreview(file)
      return
    }
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 px-0 sm:px-[20vw] pb-10">
      <div className="min-h-screen w-full px-5 py-8 sm:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Edit Profile
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Update your profile information
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex flex-col items-center border-b border-slate-800 pb-8">

            <div className="relative">


              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl" />

              <img
                src={preview || profilepic || dp}
                alt={fullname}
                className="relative h-28 w-28 rounded-full border-4 border-slate-800 object-cover shadow-xl sm:h-36 sm:w-36"
              />


              <label
                htmlFor="profilepic"
                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 border-slate-900 bg-orange-500 text-white shadow-lg transition hover:bg-orange-600"
              >
                <span className="text-lg">+</span>
              </label>

              <input
                onChange={() => handleFileChange(e)}
                id="profilepic"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>

            <h2 className="mt-4 text-xl font-semibold capitalize text-white">
              {fullname}
            </h2>

            <p className="mt-1 text-sm text-orange-400">
              @{username}
            </p>
          </div>


          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            <div>
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Full Name
              </label>

              <input
                name="fullname"
                type="text"
                onChange={handleChange}
                value={newData.fullname}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>


            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Username
              </label>

              <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">

                <span className="pl-4 text-slate-500">
                  @
                </span>

                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={newData.username}
                  placeholder="username"
                  className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-slate-600"
                />

              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="gender"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Gender
              </label>

              <div className="relative">
                <select
                  name="gender"
                  id="gender"
                  value={newData.gender}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-sm text-white outline-none transition-all duration-200 hover:border-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="" disabled>
                    Select gender
                  </option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Bio
              </label>

              <textarea
                name="bio"
                value={newData.bio}
                onChange={handleChange}
                id="bio"
                rows="4"
                placeholder="Tell people something about yourself..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">

              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Account
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Member since
                </span>

                <span className="text-sm text-slate-300">
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>

            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

              <button
                onClick={() => handlenavigate(-1)}
                type="button"
                className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:scale-[1.02] hover:shadow-orange-500/30"
              >
                Save Changes
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

