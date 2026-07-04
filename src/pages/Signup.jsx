import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log("name", name, "value", value)
        setFormData(prev => ({...prev, [name]: value }))
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        // console.log("button clicked")
        const { name, email, password } = formData
        // console.log("name", name, "email", email, "password", password)
        if(!name?.trim()) {
            toast.error("Please enter your name")
        }
        else if(!email?.trim()) {
            toast.error("Please enter your email")
        }
        else if(!password?.trim()) {
            toast.error("Please enter your password")
        }
        // console.log("formData", formData)
        // api integration
        try {
            setLoading(true)
            const response = await fetch("https://neo-g-backend-9d5c.vercel.app/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            // console.log("response", response)
            if(!response.ok) {
                if(response.status === 409) {
                    throw new Error("User already exists")
                }
                throw new Error("Failed to register user")
            }
            const data = await response.json()
            // console.log("data", data)
            toast.success("User registered successfully")
            setFormData({ name: "", email: "", password: "" })
            navigate("/")
        } catch (error) {
            toast.error(error?.message)
            console.error("Error while registering user")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center min-vh-100'>
            <h3 style={{ color: "teal"}}>Nexora</h3>
            <h2 className="fw-bold">Let's Get You Started</h2>
            <p className="text-muted text-center text-sm" style={{ maxWidth: "320px" }}>Set up your account and begin your journey with Nexora.</p>

            <form onSubmit={handleSignIn} className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                </div>
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={`${isVisible ? "text" : "password"}`} className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    <button type="button" className="btn position-absolute bottom-0 end-0 border-0" onClick={() => setIsVisible(!isVisible)}>
                        {/* <span className="position-absolute bottom-0 end-0 me-3 pb-2" onClick={() => setIsVisible(!isVisible)}> */}
                            {isVisible ? ( <i className="bi bi-eye"></i> ) : ( <i className="bi bi-eye-slash"></i> )}
                        {/* </span> */}
                    </button>
                </div>
                <button style={{ backgroundColor: "teal" }} className="btn btn-primary w-100 border-0" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                    {!loading && "Create account"}
                </button>
                {/* <hr /> */}
                {/* <button type="button" className="btn btn-outline-primary w-100">Sign up with Google</button> */}
            </form>
            <div className="mt-3">
                <p>Already have an account? 
                    <span className="ms-2 fw-semibold"><Link to={"/"} className="text-decoration-none" style={{ color: "teal"}}>Sign in</Link></span>
                </p>
            </div>
            <Toaster />
        </div>
    )
}

export default Signup