import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "bootstrap/js/dist/dropdown";

const NavBar = () => {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) {
            axios
                .get("http://127.0.0.1:8000/api/profile/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                })
                .then((response) => {
                    setProfilePicture(response.data.profile_picture);
                })
                .catch((err) => {
                    console.error("Failed to fetch profile picture:", err);
                });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (dropdownRef.current) {
            new Dropdown(dropdownRef.current);
        }
    }, [dropdownRef]);

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    TaskManager
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">
                                Tasks
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <button
                                    ref={dropdownRef}
                                    className="btn dropdown-toggle d-flex align-items-center"
                                    id="profileDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        margin: 0,
                                    }}
                                >
                                    <img
                                        src={profilePicture || "https://via.placeholder.com/50"}
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            border: "2px solid white",
                                        }}
                                    />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            Edit Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
