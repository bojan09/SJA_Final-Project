import "./AvatarImageUpload.css";

// temporary test image
import imG from "../../Archive/avatar-removebg-preview.png";

const ImageUpload = () => {
  return (
    <div className="image-upload_avatar-container">
      <img src={imG} alt="avatar-img" className="avatar-img" />
      <label htmlFor="img" className="image-upload_btn avatar-btn">
        CHANGE AVATAR
      </label>
      <input className="change-avatar" type="file" id="img" />
    </div>
  );
};

export default ImageUpload;
