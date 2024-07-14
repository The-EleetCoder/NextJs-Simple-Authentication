"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user)
      router.push("/login")
    } catch (err: any) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div>Signup</div>
  )
}

export default Signup