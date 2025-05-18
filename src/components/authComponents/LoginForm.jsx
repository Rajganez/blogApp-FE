import { useState } from "react";
import { clientAPI } from "../../api/api-axios.js";
import { LOG_IN, SIGN_UP } from "../../api/constants.js";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ role }) => {
  const navigate = useNavigate();

  const initialData = {
    name: "",
    email: "",
    password: "",
    Role: role,
  };

  const [formdata, setformData] = useState(initialData);
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  // Signup API
  const signUpAPI = async () => {
    try {
      const response = await clientAPI.post(SIGN_UP, formdata);
      if (response.status === 201) {
        alert("User Created. Please Login");
        setformData(initialData);
        setError("");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        // Error handling done for all the errors
        if (status === 403) {
          alert("User already exists. Please Login");
        } else if (status === 400) {
          alert("Something went wrong. Please Try again");
        } else if (status === 500) {
          alert("Server error. Please try again later");
        } else {
          alert(data?.msg || "Unexpected error occurred.");
        }
      } else {
        alert("Unable to connect to the server.");
      }
    }
  };

  // Login API
  const logInAPI = async () => {
    try {
      const response = await clientAPI.post(LOG_IN, formdata, {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.setItem("auth", "OK");
        alert(response.data.msg);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong")
    }
  };

  // Submit function form handling done
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|dev|co\.in)$/;
    const passwordPattern = /^[a-zA-Z]{4,15}/;

    if (formdata.Role === "SignUp" && formdata.name === "")
      setError("Name Required");
    else if (!emailPattern.test(formdata.email))
      setError("Please Validate your Email");
    else if (!passwordPattern.test(formdata.password))
      setError("Password must be 6-15 characters long.");
    else {
      setError("");
      if (formdata.Role === "SignUp") {
        signUpAPI();
      } else if (formdata.Role === "SignIn") {
        logInAPI();
      }
    }
  };

  return (
    <div className="md:w-10/12 w-1/2">
      <form>
        <div className="grid grid-cols-2 items-center">
          {role === "SignUp" && (
            <>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="lg:text-xl text-sm text-cyan-300"
                >
                  Name{" "}
                </label>
              </div>
              <div className="mb-5">
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={formdata.name}
                  placeholder="Enter Your Name"
                  required
                  onChange={handleFormChange}
                  className="text-amber-300 border-black border-b pl-2 text-center"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="lg:text-xl text-sm text-cyan-300">
              Email{" "}
            </label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              placeholder="Enter Your Email"
              required
              onChange={handleFormChange}
              className="text-amber-300 border-black border-b pl-2 text-center"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:gap-5 mt-5">
          <div>
            <label
              htmlFor="password"
              className="lg:text-xl text-sm text-cyan-300"
            >
              Password{" "}
            </label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formdata.password}
              required
              onChange={handleFormChange}
              className="text-amber-300 border-black border-b pl-2 text-center"
            />
          </div>
        </div>
        <button
          className="hover:bg-[#64ffda] hover:text-black p-1 mt-6 w-full border rounded-3xl text-white shadow-blue-300 shadow-2xs cursor-pointer"
          onClick={handleSubmit}
        >
          {role === "SignIn" ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default LoginForm;
