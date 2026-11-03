import { useDispatch, useSelector } from "react-redux";
import useRedirect from "../hook/useRedirect";
import dp from '/dp.jpg'
import bckImage from '/backimage.jpg'
import { useEffect, useState } from "react";
import api from "../api/api";
import Model from "../components/profile/Model";
import { useParams } from "react-router-dom";
import { setSelectedUser } from "../redux/features/userSlice";
import { FaChevronLeft } from "react-icons/fa";


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
  const bio = profile?.bio || 'Digital explorer and creator at heart. Turning big ideas into simple, elegant solutions.Always learning, building, and moving forward.'
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
        if (res.data.success) {
          setIsFollowing(false)
          fetchConnections()
        }

      } else {
        const res = await api.put(`/api/update/follow/${userId}`)
        if (res.data.success) {
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
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
        <p>Loading profile...</p>
      </div>
    );
  }


  return (
    <>
      <div className="bg-ui-bg min-h-screen w-full p-1">
        <div className=" mx-auto my-2  h-full sm:w-167.5 px-2">
          <div className="flex gap-5">
            <button className='text-white text-2xl sm:hidden' onClick={() => handlenavigate(-1)} >
              <FaChevronLeft />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Profile</h1>
          </div>
          <div className="md:h-72.5 md:w-163.5 ">
            <img className="h-full w-full object-center object-cover rounded-xl" src={bckImage} alt="" />
          </div>
          <div className="md:h-fit md:p-20 pt-22 p-2 relative md:w-163.5 mt-3 sm:bg-[#070606] bg-transparent rounded-xl text-white">
            <div className="h-30 w-30 absolute -top-15 left-10 sm:left-20 rounded-full border-3 overflow-hidden">
              <img className="object-center w-full h-full object-cover" src={profilepic || dp} alt="" />
            </div>
            <div className="flex gap-5">
              <h1 className="text-[#8f8f8f] text-2xl ">@{username}</h1>
              <div className="bg-[#8f8f8f] h-px w-6.25 sm:hidden rotate-90 mt-4"></div>
              <p className="mt-1">{fullname}</p>
            </div>
            <p className="text-[#919191] w-[320px] h-fit mt-4 text-sm sm:text-[15px]">{bio}</p>
            <div className="sm:w-87.5 sm:h-28.75 bg-[#070606] sm:bg-[#464646] mt-5 rounded-xl flex justify-evenly items-center">
              <div className="text-center" onClick={() => {
                setShow(true)
                setTab("followers")
              }}>
                <span className="text-[30px]">{list.followers.length}</span>
                <p className="text-lg sm:text-[24px]">followers</p>
              </div>
              <div className="text-center" onClick={() => {
                setShow(true)
                setTab("followings")
              }}>
                <span className="text-[30px]">{list.following.length}</span>
                <p className="text-lg sm:text-[24px]">following</p>
              </div>
            </div>
            <div className="flex md:w-87.5 mt-4 justify-between px-2 pb-5 sm:px-0">
              {isMine ? (
                <>
                  <button onClick={() => handlenavigate(`/edit-profile/${userData._id}`)} className="border text-[20px] rounded-[10px] px-9 py-3">
                    Edit
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
                </>)}
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="border text-[20px] rounded-[10px] px-9 py-3">Share</button>
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