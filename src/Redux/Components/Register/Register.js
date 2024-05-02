import React, { useState } from 'react'
import "./Register.css"
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Typography } from '@mui/material';
import { registerUser } from '../../Reducer/mediaSlice';
import { useDispatch } from "react-redux";

const Register = () => {
    const [img, setImg] = useState("");
    let [state, setState] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        first_school: "",
        errors: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            first_school: ""
        },
    });

    let [nameerror, setnameError] = useState(false);
    let [emailerror, setemailError] = useState(false);
    let [mobileerror, setmobileError] = useState(false);
    let [passworderror, setpasswordError] = useState(false);
    let [first_schoolerror, setfirst_schoolError] = useState(false);
    let [imgerror, setImgerror] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    // validation for email and password
    const isEmail = (email) =>
        /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);
    const isPassword = (pass) =>
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

    //handle Change
    const handleChange = (event) => {
        let { value, name } = event.target;
        // console.log(name, value);
        let err = state.errors;

        switch (name) {
            case "name":
                if (!value || value.length < 1 || value.length > 16) {
                    setnameError(true);
                    err.name = "*First name should be between 1 and 10 characters.";
                } else {
                    setnameError(false);
                    err.name = "";
                }
                break;

            case "email":
                if (!isEmail(value)) {
                    setemailError(true);
                    err.email = "*Email is invalid. Pleae re-enter..";
                } else {
                    setemailError(false);
                    err.email = "";
                }
                break;

            case "mobile":
                if (!value || value.length !== 10) {
                    setmobileError(true);
                    err.mobile = "*Enter 10 digit phone number..";
                } else {
                    setmobileError(false);
                    err.mobile = "";
                }
                break;

            case "password":
                if (!isPassword(value)) {
                    setpasswordError(true);
                    err.password =
                        "*Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $).";
                } else {
                    setpasswordError(false);
                    err.password = "";
                }
                break;

            case "first_school":
                if (!value || value.length < 1 || value.length > 15) {
                    setfirst_schoolError(true);
                    err.first_school = "*School name should be between 1 and 10 characters.";
                } else {
                    setfirst_schoolError(false);
                    err.first_school = "";
                }
                break;

            default:
                // console.log("");
                break;
        }
        setState({ ...state, [name]: value, errors: err });
    };

    //handle image
    const handleImage = ((file) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            if (fileReader.result === 0) {
                setImgerror(true);
                console.log("no image found", fileReader.result);
            } else {
                setImgerror(false);
                setImg(fileReader.result);
                console.log("uploaded image", fileReader.result);
            }
        })
        fileReader.readAsDataURL(file);
    })

    //submit handler
    const submitHandler = (event) => {
        event.preventDefault();

        if (state.name.length < 1 || state.email.length < 1 || state.mobile.length < 1 || state.password.length < 1 || state.first_school.length < 1 || !img) {
            if (state.name.length < 1) {
                setnameError(true);
                state.errors.name = "*First name can't be empty.";
            }
            if (state.email.length < 1) {
                setemailError(true);
                state.errors.email = "*Email field is empty.";
            }

            if (state.mobile.length < 1) {
                setmobileError(true);
                state.errors.mobile = "*Mobile field is empty.";
            }
            if (state.password.length < 1) {
                setpasswordError(true);
                state.errors.password = "*Password field is empty.";
            }
            if (state.first_school.length < 1) {
                setfirst_schoolError(true);
                state.errors.first_school = "*First_school field is empty.";
            }
            if (!img) {
                setImgerror(true);
            }
        }
        else {
            if (!nameerror && !emailerror && !mobileerror && !passworderror && !first_schoolerror && !imgerror) {
                let formData = new FormData();
                formData.append("name", state.name);
                formData.append("email", state.email);
                formData.append("mobile", state.mobile);
                formData.append("password", state.password);
                formData.append("first_school", state.first_school);
                formData.append("img", img);

                dispatch(registerUser(formData));
                alert("Registration successful!")
                // toast.success("Registration successful!");
                // navigate("/")
            } else {
                // alert("Please fix the below erros!");
                // toast.error("Please fix the below erros!");
            }
        }

        console.log("Submit errors: ", imgerror);

        console.log("Submitted value: ", state, img);
    };
    return (
        <div className='form_css_main'
            onSubmit={submitHandler}
        >
            <form>
                <div>
                    <Typography>Create a new account</Typography>
                </div>
                <div className='form_css'>
                    <TextField
                        className="input_data_css" type="text" name="name" label="name" onChange={handleChange}
                    />

                    <TextField
                        className="input_data_css" type="text" name="email" label="email" onChange={handleChange}
                    />
                    <TextField
                        className="input_data_css" type="number" name="mobile" label="mobile" onChange={handleChange}
                    />
                    <TextField
                        className="input_data_css" type="password" name="password" label="password" onChange={handleChange}
                    />
                    <TextField
                        className="input_data_css" type="text" name="first_school" label="first_school" onChange={handleChange}
                    />
                    <div>
                        <label style={{ color: "black" }} >Please upload an image:
                            <input type="file" name='img' onChange={(event) => {
                                handleImage(event.target.files[[0]])
                            }} />
                        </label>
                    </div>
                    <div>
                        {state.errors.name ? (
                            <p className="error-message">{state.errors.name}</p>
                        ) : (
                            ""
                        )}

                        {state.errors.email ? (
                            <p className="error-message">{state.errors.email}</p>
                        ) : (
                            ""
                        )}

                        {state.errors.mobile ? (
                            <p className="error-message">{state.errors.mobile}</p>
                        ) : (
                            ""
                        )}
                        {state.errors.password ? (
                            <p className="error-message">{state.errors.password}</p>
                        ) : (
                            ""
                        )}
                        {state.errors.first_school ? (
                            <p className="error-message">{state.errors.first_school}</p>
                        ) : (
                            ""
                        )}
                        {imgerror ? (
                            <p className="error-message">*Please upload an image!</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <Button type="submit" className='registration_icon'>
                        Submit
                    </Button>

                    <Link to="login" style={{ textDecoration: "none" }}
                    >
                        Already have an account?
                    </Link>
                </div>
            </form >
        </div >
    )
}

export default Register