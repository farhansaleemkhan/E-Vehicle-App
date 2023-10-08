import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { showFailureToaster } from "../utils/toaster";
import { auth } from "../services/authService";
import { uploadImage } from "../services/imageService";
import { cloudinary, imageUploadUrl } from "../constants/config";
import { companyService } from "../services/company/companyService";

export default function Register() {
  const [comapny, setCompany] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    type: "company",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.getCurrentUserDetails()) navigate("/");
  }, [comapny]);

  //
  const handleChange = (e) => {
    setCompany((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary.upload_preset);

    try {
      let uploadedImageUrl = await uploadImage(imageUploadUrl, formData);
      setCompany((prev) => {
        return { ...prev, profilePicture: uploadedImageUrl };
      });
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = companyService.companySchema.validate(comapny);
    if (error) return showFailureToaster(error.message);

    try {
      // const isCreated = await companyService.addNewCompany({ ...comapny });
      // if (isCreated) navigate("/");

      await companyService.addNewCompany({ ...comapny });
    } catch (error) {}
  };

  return (
    <div className="registrationScreen">
      <form className="col-md-5 form" autoComplete="on" onSubmit={handleSubmit}>
        <div className="custom-form bg-white rounded p-5" style={{ height: "80vh", overflow: "auto" }}>
          <h3 style={{ borderBottom: "2px solid black", width: "37%" }}>Register Company:</h3>

          {/* <div style={{ margin: "1rem 1rem 1rem 0 " }}>
            <span style={{ marginRight: "1rem" }}>Register as company or employee?</span>
            <select value={user.type} name="type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="employee">Employee</option>
              <option value="company">Company</option>
            </select>
          </div>
          <h5>
            Selected Regi: <span style={{ borderBottom: "1px solid black" }}> {user.type}</span>
          </h5> */}

          {/* <div className="mb-3">
            <label for="upload" className="file-label">
              <span
              //  className="file-icon"
              >
                📁
              </span>
              Upload Profile Pic
            </label>
            <input
              className="form-control input form-control input-sm"
              type="file"
              id="upload"
              //   className="file-input"
              onChange={handleUploadImage}
            />
          </div> */}

          <label htmlFor="username">Company Username:</label>
          <input
            name="username"
            type="text"
            placeholder="Enter @username."
            className="form-control input"
            onChange={handleChange}
            autoComplete="username"
          />

          <label htmlFor="fullName">Company Full Name:</label>
          <input
            name="fullName"
            type="text"
            placeholder="Enter full name."
            className="form-control input"
            onChange={handleChange}
            autoComplete="name"
          />

          <label htmlFor="email">Company Email:</label>
          <input
            name="email"
            type="text"
            placeholder="Enter email address."
            className="form-control input"
            onChange={handleChange}
            autoComplete="email"
          />

          <label htmlFor="password">Company Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password."
            className="form-control input"
            onChange={handleChange}
            autoComplete="password"
          />

          <label htmlFor="phone">Company Phone No:</label>
          <input
            name="phone"
            type="phone"
            placeholder="Enter phone."
            className="form-control input"
            onChange={handleChange}
            autoComplete="phone"
          />

          <label htmlFor="address">Company Address:</label>
          <input
            name="address"
            type="address"
            placeholder="Enter address."
            className="form-control input"
            onChange={handleChange}
            autoComplete="address"
          />

          <label htmlFor="country">Company Country:</label>
          <input
            name="country"
            type="country"
            placeholder="Enter country."
            className="form-control input"
            onChange={handleChange}
            autoComplete="country"
          />

          <label htmlFor="city">Company City:</label>
          <input
            name="city"
            type="city"
            placeholder="Enter city."
            className="form-control input"
            onChange={handleChange}
            autoComplete="city"
          />

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mt-3 df" type="submit">
              Register
            </button>
          </div>
        </div>
      </form>

      <button className="btn btn-primary" style={{ position: "absolute", top: "40px", right: "40px" }}>
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
}
