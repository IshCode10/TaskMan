import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        profile_picture: null,
    });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profile_picture") {
            setFormData({ ...formData, profile_picture: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const submitData = new FormData();
        submitData.append("username", formData.username);
        submitData.append("password", formData.password);
        submitData.append("email", formData.email);
        if (formData.profile_picture) {
            submitData.append("profile_picture", formData.profile_picture);
        }

        axios
            .post("http://127.0.0.1:8000/api/register/", submitData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(() => setSuccess("User registered successfully."))
            .catch(() => setError("Registration failed."));
    };

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        name="profile_picture"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
