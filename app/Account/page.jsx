"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function Account() {
  const [id, setId] = useState("nothing");
  const [address, setaddress] = useState("nothing");
  const [phone, setphone] = useState("nothing");
  const [username, setuser] = useState("nothing");
  const [email, setemail] = useState("nothing");
  const [full, setfull] = useState("nothing");
  const router = useRouter();
  const [user, setUser] = React.useState({
    fullname: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confpassword: "",
    address: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [loginuser, setlogintUser] = React.useState({
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      toast.success("signup success");
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
    } catch (error) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);


  const onLogin = async () => {
    try {
      setLoading(true);
      setloggedIn(true);
      toast.success("Login success");
      const response = await axios.post("/api/users/login", loginuser);
      console.log("Login success", response.data);

      // router.push("/");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
      {
        errorNotify;
      }
      setloggedIn(false);
    } finally {
      setLoading(false);
      setloggedIn(true);
    }
  };
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setId(res.data.data._id);
        setfull(res.data.data.fullname);
        setemail(res.data.data.email);
        setuser(res.data.data.username);
        setphone(res.data.data.phone);
        setaddress(res.data.data.address);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails(); // Call the function when the component mounts
  }, []);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/')
    } catch (error) {
        console.log(error.message);
        toast.error(error.message)
    }
}

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8  ">
      <Toaster />
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
        My Account
      </h1>
      <div className="md:divide-x md:flex  ">
        {!loggedIn ? (
          <div className="flex-1 pb-8 md:pb-0 md:pr-10 xl:pr-20 font-MyFont">
            <h2 className="text-xl font-bold">Login</h2>
            <form className="mt-4">
              <div className="mb-4">
                <label className="font-MyFont font-medium">
                  {" "}
                  Email address
                  <input
                    placeholder="Enter Your Valid Email "
                    className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                    id="email"
                    type="text"
                    value={loginuser.email}
                    onChange={(e) =>
                      setlogintUser({ ...loginuser, email: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="font-MyFont font-medium">
                  {" "}
                  Password
                  <input
                    placeholder="Enter Your Password "
                    className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                    id="password"
                    type="password"
                    value={loginuser.password}
                    onChange={(e) =>
                      setlogintUser({ ...loginuser, password: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="mb-4">
                <Link
                  className="font-MyFont text-sm opacity-75 hover:opacity-100"
                  href=""
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                onClick={onLogin}
                type="submit"
                className="bg-textgray text-white rounded py-2 px-8 font-MyFont font-medium md:py-1 md:px-5"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 pb-8 md:pb-0 md:pr-10 xl:pr-20 font-MyFont">
            <h1 className="text-2xl font-bold font-main">Profile</h1>
            <div className="py-4 gap-y-2 flex flex-col text-xl font-MyFont rounded ">
              Welcome: {username}
              <hr />
              User id: {id}
              <hr />
              Full Name: {full}
              <hr />
              Phone number: {phone}
              <hr />
              Email: {email}
              <hr />
              Address: {address}
            </div>
            <button
                onClick={logout}
                type="submit"
                className="bg-textgray text-white rounded py-2 px-8 font-MyFont font-medium md:py-1 md:px-5"
              >
                logout
              </button>
  
          </div>
        )}

        <div className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
          <h2 className="text-xl font-MyFont font-bold">Register</h2>
          <form action="" className="mt-4">
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Full Name
                <input
                  placeholder="Enter Your Full Name"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  id="fullname"
                  type="text"
                  value={user.fullname}
                  onChange={(e) =>
                    setUser({ ...user, fullname: e.target.value })
                  }
                  name="fullName"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Email Address
                <input
                  placeholder="Enter Your Valid Email"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  id="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  name="email"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Username
                <input
                  placeholder="Enter Your Username"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  name="username"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Phone
                <input
                  placeholder="+919021457863 (or) 09932146687"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  id="phone"
                  type="number"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  name="phone"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Password
                <input
                  placeholder="Enter Your Password"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  name="password"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Confirm Password
                <input
                  placeholder="Confirm Your Password"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  id="confpassword"
                  type="password"
                  value={user.confpassword}
                  onChange={(e) =>
                    setUser({ ...user, confpassword: e.target.value })
                  }
                  name="confirmPassword"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Address
                <textarea
                  placeholder="No (27), 11 M, 370205, gujarat, India"
                  rows="4"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  name="address"
                  id="address"
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                ></textarea>
              </label>
            </div>
            <button
              onClick={onSignup}
              className="bg-textgray text-white rounded py-2 px-8 font-MyFont font-medium md:py-1 md:px-5"
            >
              {buttonDisabled ? "No signup" : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
