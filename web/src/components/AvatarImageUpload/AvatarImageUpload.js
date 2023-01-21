import "./AvatarImageUpload.css";

// components

// temporary test image
import imG from "../../Archive/avatar-removebg-preview.png";

const AvatarImageUpload = () => {
  return (
    <div className="image-upload_avatar-container">
      <img src={imG} alt="avatar-img" className="avatar-img" />
      <label htmlFor="img" className="image-upload_btn avatar-btn">
        CHANGE AVATAR
      </label>
    </div>
  );
};

export default AvatarImageUpload;
