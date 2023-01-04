import "./UserProfile.css";

// Hooks
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useState } from "react";

// components
import AvatarImageUpload from "../../components/AvatarImageUpload/AvatarImageUpload";

const UserProfile = () => {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { updateUser, error, isLoading } = useUpdateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(
      first_name,
      last_name,
      email,
      password,
      repeatPassword,
      birthdate
    );
  };

  return (
    <div className="user-profile">
      <h1 className="user-profile_heading heading-primary">My Profile</h1>
      <div className="user-profile_container">
        <form className="user-profile_form" onSubmit={handleSubmit}>
          <div className="user-profile_avatar-upload">
            <AvatarImageUpload />
          </div>

          <div className="form-left_container">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              placeholder="John"
              id="first-name"
              onChange={(e) => setFirst_Name(e.target.value)}
              value={first_name}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="john@smith.com"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button
              disabled={isLoading}
              className="user-profile_form-btn save-btn"
            >
              SAVE
            </button>
          </div>

          <div className="form-right_container">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              placeholder="Smith"
              id="last-name"
              onChange={(e) => setLast_Name(e.target.value)}
              value={last_name}
              required
            />

            <label htmlFor="birthdate">Birthdate</label>
            <input
              className="birthdate"
              type="date"
              placeholder="01-09-1997"
              id="birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
              required
            />

            <label htmlFor="password">Repeat Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
