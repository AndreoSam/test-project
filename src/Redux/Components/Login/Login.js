import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material'
import { loginUser } from '../../Reducer/mediaSlice';
import axios from 'axios';

const Login = () => {
  let [emailerror, setemailError] = useState(false);
  let [passworderror, setpasswordError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();

  //handle Change
  const changeHandler = (event) => {
    let { name, value } = event.target
    setData({ ...data, [name]: value })
  }


  //Submit Button:
  let submitHandler = (event) => {
    event.preventDefault();
    console.log("Submitted Values: ", data);
    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    axios.post( "https://webskitters-student.onrender.com/login", formData, {
      header: {
        'Content-Type': 'application/form-data',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((res) => {
        console.log('axios for post:', res.data);
        setData(res.data)
        if (res.data.status === 200) {
          window.sessionStorage.setItem('token', res.data.token)
          alert("Login Successfully!")
        } else {
          alert("Login Not Successfully!")
        }

        // navigate('pro')

      })
      .catch((err) => console.log('axios post error:', err))


  };


  return (
    <div className='form_css_main'
      onSubmit={submitHandler}
    >
      <form>
        <div>
          <Typography>Login</Typography>
        </div>
        <div className='form_css'>
          <TextField
            className="input_data_css" type="text" name="email" label="email" onChange={changeHandler}
          />
          <TextField
            className="input_data_css" type="password" name="password" label="password" onChange={changeHandler}
          />

          <div>
            {emailerror ? (
              <p className="error-message">Enter your email</p>
            ) : (
              ""
            )}
            {passworderror ? (
              <p className="error-message">Enter your password</p>
            ) : (
              ""
            )}
          </div>
          <Button type="submit" className='registration_icon'>
            Login
          </Button>

          <Link to="/" style={{ textDecoration: "none" }}
          >
            Don't have an account?
          </Link>
        </div>
      </form >
    </div >
  )
}

export default Login