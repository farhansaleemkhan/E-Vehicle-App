import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import Error from '../Components/Error';

const LoginScreen = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    function myFunction() {
        let x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    async function Login (){
            const user={
                email,
                password
            }
            try {
                setLoading(true)
                const result =(await axios.post('/api/User/login', user)).data;
                setLoading(false)

                localStorage.setItem('currentUser', JSON.stringify(result));
                window.location.href='/home';

            } catch (error) {
                console.log(error)
                setLoading(false);
                setError(true)
            }
    }

  return (
    <div>
        {loading && <Loader />}

        <div className='row justify-content-center m-5'>
            <div className='col-md-5 shadow m-5'>
                {error && <Error message="Invalid Email or Password" />}
                <h2>Login</h2>
                <input type='email' className='form-control' placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input><br />
                <input type='password' id='myInput' className='form-control' placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input><br />
                <input type="checkbox" onClick={myFunction} />Show Password<br />
                <button className='btn btn-primary m-3' onClick={Login}>Log In</button>
            </div>
        </div>
    </div>
  )
}

export default LoginScreen;