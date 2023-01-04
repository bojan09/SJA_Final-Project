import "./CreateAccount.css";

// Hooks
import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";

const CreateAccount = () => {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(first_name, last_name, email, password, repeatPassword);
  };

  return (
    <div className="create-account">
      <h1 className="create-account_heading heading-primary">Create Account</h1>
      <div className="create-account_container">
        <div className="create-account_left-container">
          <h1 className="create-account_secondary-heading">
            Create your <span>account</span>
          </h1>
          <p className="create-account_description">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.
          </p>
        </div>
        <div className="create-account_right-container">
          {/* The form */}
          <form className="create-account_form" onSubmit={handleSubmit}>
            <div className="create-account_form-container">
              <div className="input_container">
                <label htmlFor="first_name">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  onChange={(e) => setFirst_Name(e.target.value)}
                  value={first_name}
                  required
                />
              </div>

              <div className="input_container">
                <label htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Smith"
                  onChange={(e) => setLast_Name(e.target.value)}
                  value={last_name}
                  required
                />
              </div>
            </div>

            <div className="create-account_form-container">
              <div className="input_container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@smith.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="input_container">
                <label htmlFor="birthdate">Birthdate</label>
                <input
                  id="birthdate"
                  className="birthdate"
                  type="date"
                  placeholder="01-09-1997"
                  onChange={(e) => setBirthdate(e.target.value)}
                  value={birthdate}
                  required
                />
              </div>
            </div>

            <div className="create-account_form-container">
              <div className="input_container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <div className="input_container">
                <label htmlFor="password">Repeat Password</label>
                <input
                  type="password"
                  placeholder="********"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  required
                />
              </div>
            </div>

            <button disabled={isLoading} className="create-account_form-btn">
              Create Account
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
