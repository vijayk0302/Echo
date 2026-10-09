import { useEffect } from "react";
import api from "../api/api.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/userSlice.js";

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        dispatch(setUserData(res.data.user));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, [dispatch]);
};