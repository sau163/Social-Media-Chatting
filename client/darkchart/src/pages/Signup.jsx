
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { isEmail, isValidPassword } from '../components/validator';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "", // Add confirmPassword to the state initialization
    avatar: ""
  });

  const [previewImage, setPreviewImage] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9]*$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value
    });

    if (name === "username") {
      setIsUsernameValid(usernameRegex.test(value));
    }

    if (name === "password") {
      setIsPasswordStrong(passwordRegex.test(value));
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    setSignUpDetails({
      ...signUpDetails,
      avatar: uploadedImage
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  };

  async function onSubmitHandler(e) {
    e.preventDefault();

    if (!signUpDetails.password || !signUpDetails.email || !signUpDetails.name || !signUpDetails.confirmPassword || !signUpDetails.userName) {
      toast.error("Please fill all the details");
      return;
    }
    if (signUpDetails.name.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }
    if (!isEmail(signUpDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }
    if (!isValidPassword(signUpDetails.password)) {
      toast.error("Invalid password provided");
      return;
    }
    if (signUpDetails.password !== signUpDetails.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }
    const formData = new FormData();
    formData.append("name", signUpDetails.name);
    formData.append("userName", signUpDetails.userName);
    formData.append("email", signUpDetails.email);
    formData.append("password", signUpDetails.password);
    formData.append("avatar", signUpDetails.avatar);

    const response = await dispatch(createAccount(formData));
    console.log(response);
    if (response?.payload?.data) {
      navigate("/");
    }

    console.log(signUpDetails);
    setSignUpDetails({
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: ""
    });
    setPreviewImage("");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem', background: 'linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))' }}>
      <form onSubmit={onSubmitHandler} noValidate style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Signup Page</h1>
        <label htmlFor="image_uploads" style={{ display: 'block', cursor: 'pointer', textAlign: 'center', marginBottom: '1rem' }}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <BsPersonCircle style={{ fontSize: '100px', color: '#ccc' }} />
          )}
        </label>
        <input
          onChange={handleImage}
          type="file"
          style={{ display: 'none' }}
          name="image_uploads"
          id="image_uploads"
          accept=".jpg, .jpeg, .png, .svg"
        />
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Name"
            value={signUpDetails.name}
            onChange={changeHandler}
            required
            name="name"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            value={signUpDetails.userName}
            onChange={changeHandler}
            required
            name="userName"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <p style={{ color: isUsernameValid ? 'green' : 'red', fontSize: '0.6rem', marginTop: '0.5rem' }}>
            {isUsernameValid ? 'Valid username' : 'Username can only contain letters and numbers'}
          </p>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Email"
            value={signUpDetails.email}
            onChange={changeHandler}
            required
            name="email"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={signUpDetails.password}
            onChange={changeHandler}
            required
            name="password"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <p style={{ color: isPasswordStrong ? 'green' : 'red', fontSize: '0.6rem', marginTop: '0.5rem' }}>
            {isPasswordStrong ? 'Strong password' : 'Password must be 6-16 characters long and include at least one number and one special character'}
          </p>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={signUpDetails.confirmPassword}
            onChange={changeHandler}
            required
            name="confirmPassword"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer', width: '100%', boxSizing: 'border-box' }}>
            Create Account
          </button>
        </div>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>or</p>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#007BFF' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
