import React from 'react';

function Login(props) {

    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handleRegister, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError
    } = props;

    return(
        <section className="login">
            <div className='loginContainer'>
                <label>Username</label>
                <input 
                    type='text' 
                    autoFocus 
                    required value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <p className='errorMsg'>{emailError}</p>

                <label>Password</label>
                <input 
                    type='password' 
                    required value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <p className='errorMsg'>{passwordError}</p>
                <div className='btnContainer'>
                    {hasAccount ? (
                            <>
                            <button onClick={handleLogin}>Login</button>
                            <p>
                                Don't have an account? 
                                <span onClick={() => setHasAccount(!hasAccount)}>Register</span></p>
                            </>
                        ) : (
                            <>
                            <button onClick={handleRegister}>Register</button>
                            <p>
                                Have an account? 
                                <span onClick={() => setHasAccount(!hasAccount)}>Login</span></p>
                            </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;