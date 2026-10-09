import { useDispatch, useSelector } from "react-redux";
import useRedirect from "../hook/useRedirect";
import dp from '/dp.jpg'
import bckImage from '/backimage.jpg'
import { useEffect, useState } from "react";
import api from "../api/api";
import Model from "../components/profile/Model";
import { useParams } from "react-router-dom";
import { setSelectedUser } from "../redux/features/userSlice";


const Profile = () => {

  const dispatch = useDispatch()

  const { userData } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null)

  const isMine = !userId || userId === userData._id
  const targetId = isMine ? userData._id : userId

  const [show, setShow] = useState(false)
  const [tab, setTab] = useState("")
  const [loading, setloading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [list, setList] = useState({
    followers: [],
    following: []
  })
  const { handlenavigate } = useRedirect()

  const profile = isMine ? userData : profileData

  const fullname = profile?.fullname || "fullname"
  const username = profile?.username || "username"
  const profilepic = profile?.profilepic || dp
  const bio = profile?.bio || "i am new here"
  const following = profile?.following || []
  const followers = profile?.followers || []
  const gender = profile?.gender || "not set yet"

  const getProfile = async () => {
    if (!targetId) {
      return
    }
    setloading(true)
    try {
      const res = await api.get(`/api/user/getprofile-details/${targetId}`)
      setProfileData(res.data.user)
      if (userData && res.data.user.followers) {
        setIsFollowing(res.data.user.followers.includes(userData._id))
      }
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }

  const fetchConnections = async () => {
    setloading(true)
    try {
      const res = await api.get(`/api/user/getfollower/${targetId}`)
      if (res.data.success) {
        setList({
          followers: res.data.followers,
          following: res.data.following,
        })
      }
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }

  const handleToggle = async () => {
    setloading(true);
    try {
      if (isFollowing) {
        const res = await api.put(`/api/update/unfollow/${userId}`)
        if(res.data.success){
          setIsFollowing(false)
          fetchConnections()
        }
        
      } else {
        const res = await api.put(`/api/update/follow/${userId}`)
         if(res.data.success){
          setIsFollowing(true)
          fetchConnections()
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getProfile()
    fetchConnections()
  }, [show, userId])

  if (loading && !profile) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Loading profile...</p>
      </div>
    );
  }


  return (
    <>
      <div className="h-screen relative bg-slate-950 w-screen px-0 text-white sm:px-[20vw]">
        <div className="relative w-full h-full">
          <div style={{ backgroundImage: `url(${bckImage})` }} className={`w-full absolute top-0 h-70 bg-cover bg-center bg-no-repeat`}>
          </div>
          <div className="bg-[#0F172B] absolute top-[25%] h-full w-full rounded-t-[50px] sm:rounded-none p-1">
            <div className="w-full flex -mt-15 justify-center ">
              <img className="h-30 w-30 rounded-full border-white border-4 object-cover" src={profilepic || dp} alt="" />
            </div>
            <h1 className="text-center sm:text-4xl font-semibold text-2xl py-6 capitalize">{fullname}</h1>
            <p className="text-center sm:text-xl font-semibold text-lg py-2 text-gray-500">@{username}</p>
            <div className="mt-3 px-[10vw]">
              <h2 className="text-lg w-full sm:text-xl text-center leading-6 line-clamp-2">{bio}</h2>
            </div>
            <div className="flex justify-evenly items-center w-full h-20">

              {
                isMine ? (
                  <>
                    <button onClick={() => handlenavigate(`/edit-profile/${userData._id}`)} className="rounded-xl border  bg-white/5 px-5 py-2.5 text-sm font-normal transition-all duration-100 border-orange-500/30 active:scale-[0.95] hover:bg-orange-500/10">
                      Edit Profile
                    </button>
                    <button onClick={() => handlenavigate('/chat')} className="rounded-xl border  bg-white/5 px-5 py-2.5 text-sm font-normal active:scale-[0.95] transition-all duration-100 border-orange-500/30 hover:bg-orange-500/10">
                      Chats
                    </button>
                  </>) : (
                  <>
                    <button
                      onClick={handleToggle}
                      // disabled={loading}
                      className={`rounded-xl px-5 py-2.5 text-sm font-normal transition-all duration-100 active:scale-[0.95] ${isFollowing
                        ? 'border border-gray-600 bg-white/10 hover:bg-red-500/20 hover:border-red-500'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>

                      <button
                        onClick={() => {
                          dispatch(setSelectedUser(profileData))
                          handlenavigate('/chat')
                        }}
                        className="rounded-xl border bg-white/5 px-5 py-2.5 text-sm font-normal active:scale-[0.95] transition-all duration-100 border-orange-500/30 hover:bg-orange-500/10"
                      >
                        Message
                      </button>
                  </>

                )
              }

              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-normal shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]">
                Share Profile
              </button>
            </div>
            <div className="mx-auto mt-8 h-px w-[85%] bg-linear-to-r from-transparent via-slate-700 to-transparent" />
            <div className="w-full flex justify-evenly items-center mt-6">
              {/* <div className="text-center  capitalize">
                <p>0</p>
                <h2>posts</h2>
              </div> */}
              <div onClick={() => {
                setShow(true)
                setTab("followers")
              }} className="text-center cursor-pointer group">
                <p className="text-lg group-hover:text-orange-400 sm:text-2xl">{list.followers.length}</p>
                <h2 className="text-lg  sm:text-3xl ">followers</h2>
              </div>
              <div onClick={() => {
                setShow(true)
                setTab("followings")
              }} className="text-center cursor-pointer group">
                <p className="text-lg group-hover:text-orange-400 sm:text-2xl">{list.following.length}</p>
                <h2 className="text-lg  sm:text-3xl">following</h2>
              </div>
            </div>
          </div>
        </div>

        {
          show && (<Model setShow={setShow} tab={tab} followers={list.followers} following={list.following} />)
        }

      </div>
    </>
  );
};

export default Profile;