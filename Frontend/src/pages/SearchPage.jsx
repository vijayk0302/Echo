import React, { useEffect, useState } from 'react'
import { useDebounce } from '../hook/useDebounce'
import api from '../api/api.js'
import dp from '/dp.jpg'
import { CiSearch } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { RiLoader4Fill } from "react-icons/ri";
import useRedirect from '../hook/useRedirect.js';

const SearchPage = () => {

  const { handlenavigate } = useRedirect()
  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebounce(query, 500)

  useEffect(() => {
    const fetchQueryResult = async () => {
      if (!debouncedSearch.trim()) {
        setLoading(false)
        setResult([])
        return
      }
      try {
        setLoading(true)
        const res = await api.get(`/api/user/search?query=${debouncedSearch}`)
        if (res.data.success) {
          setResult(res.data.users)
        }
      } catch (error) {
        console.error("Search failed:", error.response.data.message);
        setResult([])
      } finally {
        setLoading(false)
      }
    }
    fetchQueryResult()
  }, [debouncedSearch])

  const clearSearch = () => {
    setQuery("");
    setResult([]);
  }

  return (
    <div className='bg-ui-bg w-full flex justify-center text-white h-screen'>
      <div className='w-full h-fit mt-3  bg-[#070606] max-w-md sm:px-7 px-5 rounded-[15px]'>
        <h1 className="text-2xl pt-2 text-left font-bold tracking-tight"> Search </h1>
        <p className="text-sm py-3 text-left text-[#8F8F8F]"> Find people and discover new connections </p>
        <div className='w-full relative'>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search username....'
            className="w-full rounded-full px-4 py-2.5 border  text-white transition-all placeholder:text-[#8F8F8F]" type="text" />
          {
            !query && <CiSearch className='absolute top-2 right-4 text-3xl font-bold text-[#8F8F8F]' />
          }

          {
            loading ? (<RiLoader4Fill className="absolute text-3xl right-4 top-1/2 -translate-y-1/2 animate-spin text-white" />) : query ? (<button onClick={clearSearch} className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white "><RxCrossCircled className='text-2xl text-[#8F8F8F]' /></button>) : null
          }
        </div>

        <div className='mt-5'>
          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <RiLoader4Fill className="animate-spin text-2xl text-white" /> Searching... </div>
            </div>)
          }
          {
            result.map((user) => (
              <div
                onClick={() => handlenavigate(`/profile/${user._id}`)}
                key={user._id}
                className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <img
                  src={user.profilepic || dp}
                  alt={user.username}
                  className="h-10 w-10 rounded-full object-cover border border-white/10"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-white truncate">
                    {user.username}
                  </span>
                  {user.fullName && (
                    <span className="text-xs text-gray-400 truncate">
                      {user.fullName}
                    </span>
                  )}
                </div>
              </div>
            ))
          }
          {
            !loading && query.trim() && result.length === 0 && (
              <div className='bg-[#070606] mt-3 pb-4'>
                <h2 className="text-sm font-semibold text-slate-300"> No users found
                </h2>
                <p className="mt-1 text-xs text-[#8F8F8F]"> Try searching with a different username.</p>
              </div>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default SearchPage