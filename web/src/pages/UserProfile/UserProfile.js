import "./UserProfile.css";

// components
import AvatarImageUpload from "../../components/AvatarImageUpload/AvatarImageUpload";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h1 className="user-profile_heading heading-primary">My Profile</h1>
      <div className="user-profile_container">
        <form className="user-profile_form">
          <div className="user-profile_avatar-upload">
            <AvatarImageUpload />
          </div>

          <div className="form-left_container">
            <label htmlFor="first-name">First Name</label>
            <input type="text" placeholder="John" id="first-name" required />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="john@smith.com"
              id="email"
              required
            />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="********" required />

            <button className="user-profile_form-btn save-btn">SAVE</button>
          </div>

          <div className="form-right_container">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" placeholder="Smith" id="last-name" required />

            <label htmlFor="birthdate">Birthdate</label>
            <input
              className="birthdate"
              type="date"
              placeholder="01-09-1997"
              id="birthdate"
              required
            />

            <label htmlFor="password">Repeat Password</label>
            <input type="password" placeholder="********" required />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
