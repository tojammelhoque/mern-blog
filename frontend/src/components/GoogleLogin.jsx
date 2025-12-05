import React, { useState } from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import { showTost } from "@/utils/showTost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RouteIndex } from "@/utils/RouteName";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      setLoading(true);

      dispatch(loginStart());
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        {
          name: user.displayName,
          email: user.email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        loginSuccess({
          user: res.data.user,
        })
      );

      showTost("succes", res.data.message || "Logged in successfully");
      navigate(RouteIndex);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showTost("error", message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} className="w-full" onClick={handleLogin}>
      {" "}
      <FcGoogle />
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
}

export default GoogleLogin;
