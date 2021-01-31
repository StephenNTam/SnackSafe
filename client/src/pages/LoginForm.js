import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    props.history.push('/');
  }

  // handle button click of register form
  const handleRegister = () => {
    props.history.push('/register');
  }
 
  return (
    <div className="login-reg-form">
      <div className="search-bg">
          <div style={{marginTop: 10, fontWeight:"bold", fontSize: 25 }}>
              <br />
              Login
              <br />
              <br />
          <div>
              Username
              <br />
              <input type="text" {...username} autoComplete="new-password" style={{width:"25%"}} />
          </div>
          <div style={{ marginTop: 10 }}>
              Password
              <br />
              <input type="password" {...password} autoComplete="new-password" style={{width:"25%"}} />
          </div>
              {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
              <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
          </div>
          <div>
            <br/>
            <>No Account? </>
            <Link onClick={handleRegister}>Register</Link>
          </div>
          
          <link>
          </link>
      </div>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;