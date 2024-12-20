import React from 'react'
import "./login.css"

const Login = () => {
    const loginwithgoogle = ()=>{
        window.open("http://localhost:8000/auth/google/callback","_self")
    }
  return (
    <>
        <div className="login-page">
            <h1 style={{textAlign:"center"}}>Login</h1>
            <div className="form">
                <form className='login-form'>
                    <input type="text" autoComplete="username" name="username" id="username" placeholder='Enter your username' />
                    <input type="password" autoComplete="current-password" name="password" id="password" placeholder='Enter your Password'  />
                    <button>Login</button>
                    <p className='message'>Not Registerd? <a href="#">Create an account</a></p>
                </form>
               
                <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google
                </button>
            </div>
        </div>
    </>
  )
}

export default Login