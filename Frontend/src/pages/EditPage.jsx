import { useDispatch, useSelector } from "react-redux";
import dp from "/dp.jpg";
import { useState } from "react";
import api from "../api/api";
import useRedirect from "../hook/useRedirect";
import { setUserData } from "../redux/features/userSlice";
import { FaChevronLeft } from "react-icons/fa";


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
    <div className="min-h-screen w-full bg-ui-bg px-4 py-8 sm:px-8 md:px-16 lg:px-24 overflow-y-auto">
      {/* Header text */}
      <div className="max-w-3xl mx-auto flex gap-5">
        <button className='sm:hidden text-white' onClick={() => handlenavigate(-1)} >
          <FaChevronLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Edit Profile
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Update your profile information
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full flex justify-center flex-col items-center mt-20 mb-12">
        <div className="relative rounded-[30px] border  w-full max-w-2xl bg-[#070606] px-6 pt-24 pb-8 shadow-2xl shadow-black/40 sm:px-10 sm:pt-28">

          {/* Overlapping Avatar */}
          <div className="absolute -top-20 left-40 mt-4 -translate-x-1/2 h-36 w-36 sm:h-40 sm:w-40">
            <img
              src={preview || profilepic || dp}
              alt={fullname || "Profile picture"}
              className="h-full w-full rounded-full border-4 border-white object-cover shadow-2xl"
            />

            <label
              htmlFor="profilepic"
              className="absolute bottom-1 right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-black bg-white text-black shadow-lg transition hover:scale-105"
            >
              <span className="text-xl font-bold">+</span>
            </label>

            <input
              onChange={handleFileChange}
              id="profilepic"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>


          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name & Username Side-by-Side on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="fullname"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  name="fullname"
                  type="text"
                  onChange={handleChange}
                  value={newData?.fullname || ""}
                  placeholder="full name"
                  className="w-full rounded-md border border-white bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#8F8F8F] "
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Username
                </label>
                <div className="flex items-center rounded-xl border border-white bg-transparent transition ">
                  <span className="pl-4 text-white">@</span>
                  <input
                    name="username"
                    onChange={handleChange}
                    type="text"
                    value={newData?.username || ""}
                    placeholder="username"
                    className="w-full rounded-md bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#8F8F8F]"
                  />
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="w-full">
              <label
                htmlFor="gender"
                className="mb-2 block text-sm font-medium text-white"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  id="gender"
                  value={newData?.gender || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white bg-[#070606] px-4 py-3 pr-10 text-sm text-white transition-all duration-200 "
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>


              </div>
            </div>

            {/* Bio Textarea */}
            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-white"
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={newData?.bio || ""}
                onChange={handleChange}
                id="bio"
                rows="4"
                placeholder="Tell people something about yourself..."
                className="w-full rounded-md border border-white bg-[#070606] px-4 py-3 pr-10 text-sm text-white transition-all duration-200 "
              />
            </div>

            {/* Account Info Box */}
            <div className="rounded-md border border-white bg-transparent p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white">
                Account
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-white">Member since</span>
                <span className="text-sm text-white">
                  {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <button
                onClick={() => handlenavigate(-1)}
                type="button"
                className="w-full sm:w-auto rounded-xl border border-red-900/50 bg-transparent px-8 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
              >
                Discard
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-slate-200"
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

