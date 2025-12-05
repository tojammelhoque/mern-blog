import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RouteIndex, RouteSignUp } from "@/utils/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { showTost } from "@/utils/showTost";
import axios from "axios";
import GoogleLogin from "@/components/GoogleLogin";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values) {
    try {
      dispatch(loginStart());
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        values,
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

      navigate(RouteIndex);
      showTost("succes", res.data.message);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
        dispatch(loginFailure(message));
      showTost("error", message);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-96 p-10">
        <CardHeader className="justify-center">
          <CardTitle>Sign In Your Account</CardTitle>
        </CardHeader>
        <div>
          <GoogleLogin />
        </div>
        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
              <div className="mt-5 flex justify-end">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link className="text-blue-500" to={RouteSignUp}>
                    {" "}
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default SignIn;
