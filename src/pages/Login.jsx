import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        // console.log("button clicked")
        // console.log("email", email, "password", password)
        if (!email?.trim()) {
            toast.error("Please enter your email")
        }
        else if (!password?.trim()) {
            toast.error("Please enter your password")
        }
        // api integration
        else {
            try {
                setLoading(true)
                const response = await fetch("https://neo-g-backend-9d5c.vercel.app/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password })
                })
                console.log("response", response)
                if (!response.ok) {
                    throw new Error("Failed to login")
                }
                const data = await response.json()
                // console.log("data", data)
                localStorage.setItem("token", data?.token)
                toast.success("User Login Successfully")
                setEmail("")
                setPassword("")
                navigate("/dashboard")
            } catch (error) {
                toast.error("Failed to login")
                console.error("Error while logging in user", error?.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center min-vh-100'>
            <h3 style={{ color: "teal" }}>Nexora</h3>
            <h2 className="fw-bold">Welcome Back!</h2>
            <p className="text-muted">Sign in to continue to your workspace.</p>

            <form onSubmit={handleSignIn} className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={`${isVisible ? "text" : "password"}`} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="button" className="btn position-absolute bottom-0 end-0 border-0" onClick={() => setIsVisible(!isVisible)}>
                        {/* <span className="position-absolute bottom-0 end-0 me-3 pb-2" onClick={() => setIsVisible(!isVisible)}> */}
                        {isVisible ? (<i className="bi bi-eye"></i>) : (<i className="bi bi-eye-slash"></i>)}
                        {/* </span> */}
                    </button>
                </div>
                <button style={{ backgroundColor: "teal" }} className="btn btn-primary w-100 border-0" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                    {!loading && "Sign in"}
                </button>
                {/* <hr /> */}
                {/* <button type="button" className="btn btn-outline-primary w-100">Sign in with Google</button> */}
            </form>
            <div className="mt-3">
                <p>Don't have an account?
                    <span className="ms-2 fw-semibold"><Link to={"/signup"} className="text-decoration-none" style={{ color: "teal" }}>Sign up</Link></span>
                </p>
            </div>
            <Toaster />
        </div>
    )
}

export default Login