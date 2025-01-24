import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            })
            .then((response) => {
                setProfilePicture(response.data.profile_picture);
            })
            .catch(() => setError("Failed to load profile."));
    }, []);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData();
        if (selectedFile) {
            formData.append("profile_picture", selectedFile);
        }

        axios
            .put("http://127.0.0.1:8000/api/profile/", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setSuccess("Profile picture updated successfully.");
                setProfilePicture(URL.createObjectURL(selectedFile));
                setSelectedFile(null);
            })
            .catch(() => setError("Failed to update profile picture."));
    };

    return (
        <div className="container">
            <h1>Edit Profile</h1>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Profile Picture</label>
                    <input type="file" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    {selectedFile && (
                        <div>
                            <p>Selected File Preview:</p>
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected Preview"
                                className="profile-preview"
                            />
                        </div>
                    )}
                    {profilePicture && !selectedFile && (
                        <div>
                            <p>Current Profile Picture:</p>
                            <img src={profilePicture} alt="Current Profile" className="profile-preview" />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
