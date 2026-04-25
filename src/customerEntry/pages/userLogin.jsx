import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../shared/authApi";

const initialLoginForm = {
  email: "",
  password: "",
};

const initialSignupForm = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export default function UserLogin() {
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [signupForm, setSignupForm] = useState(initialSignupForm);
  const [loginStatus, setLoginStatus] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setLoginStatus("Enter both email and password.");
      return;
    }

    try {
      setIsLoggingIn(true);
      setLoginStatus("");

      const response = await loginUser(loginForm);
      window.localStorage.setItem("loggedInUser", JSON.stringify(response));
      navigate("/user");
    } catch (error) {
      console.error(error);
      setLoginStatus(
        error.message ||
          "Login is not ready from the backend yet. Finish the login API next."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async () => {
    if (
      !signupForm.fullName ||
      !signupForm.email ||
      !signupForm.phoneNumber ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      setSignupStatus("Fill in all fields to create your account.");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupStatus("Passwords do not match.");
      return;
    }

    try {
      setIsSigningUp(true);
      setSignupStatus("");

      const response = await registerUser({
        fullName: signupForm.fullName,
        email: signupForm.email,
        phoneNumber: signupForm.phoneNumber,
        password: signupForm.password,
      });

      setSignupStatus(response.message || "Account created successfully.");
      setLoginForm({
        email: signupForm.email,
        password: "",
      });
      setSignupForm(initialSignupForm);
      setShowSignup(false);
      setLoginStatus("Account created successfully. Add the login API next to sign in.");
    } catch (error) {
      console.error(error);
      setSignupStatus(
        error.message ||
          "Signup could not be completed. Check the backend auth configuration."
      );
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <Motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-amber-100"
    >
      <div className="relative w-96 rounded-lg bg-white p-8 shadow-md">
        <button
          onClick={() => navigate("/")}
          className="absolute left-3 top-3 text-sm text-gray-600 hover:text-black"
        >
          Back
        </button>

        <h2 className="mb-4 text-center text-xl font-bold">User Login</h2>

        <input
          className="mb-3 w-full rounded border p-2"
          name="email"
          value={loginForm.email}
          onChange={handleLoginChange}
          placeholder="Email"
          type="email"
        />

        <input
          className="mb-2 w-full rounded border p-2"
          name="password"
          value={loginForm.password}
          onChange={handleLoginChange}
          type="password"
          placeholder="Password"
        />

        <button
          onClick={() => setShowForgot(true)}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>

        {loginStatus ? (
          <div className="mb-4 rounded bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {loginStatus}
          </div>
        ) : null}

        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="flex-1 rounded bg-amber-500 py-2 text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>

          <button
            onClick={() => {
              setSignupStatus("");
              setShowSignup(true);
            }}
            className="flex-1 rounded border border-amber-500 py-2 text-amber-600 hover:bg-amber-50"
          >
            Sign Up
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSignup && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40"
          >
            <Motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-96 rounded-lg bg-white p-6"
            >
              <button
                onClick={() => setShowSignup(false)}
                className="absolute right-3 top-3 text-gray-500 hover:text-black"
              >
                Close
              </button>

              <h3 className="mb-4 text-center text-lg font-bold">
                Create Account
              </h3>

              <input
                className="mb-3 w-full rounded border p-2"
                name="fullName"
                value={signupForm.fullName}
                onChange={handleSignupChange}
                placeholder="Full Name"
              />

              <input
                className="mb-3 w-full rounded border p-2"
                name="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                placeholder="Email"
                type="email"
              />

              <input
                className="mb-3 w-full rounded border p-2"
                name="phoneNumber"
                value={signupForm.phoneNumber}
                onChange={handleSignupChange}
                placeholder="Phone Number"
                type="tel"
              />

              <input
                className="mb-3 w-full rounded border p-2"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                type="password"
                placeholder="Password"
              />

              <input
                className="mb-4 w-full rounded border p-2"
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                type="password"
                placeholder="Confirm Password"
              />

              {signupStatus ? (
                <div className="mb-4 rounded bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  {signupStatus}
                </div>
              ) : null}

              <button
                onClick={handleSignup}
                disabled={isSigningUp}
                className="w-full rounded bg-amber-500 py-2 text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSigningUp ? "Creating..." : "Sign Up"}
              </button>

              <p className="mt-3 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForgot && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40"
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-80 rounded-lg bg-white p-6 text-center shadow-lg"
            >
              <h3 className="mb-3 text-lg font-bold">Forgot Password</h3>
              <p className="text-sm text-gray-600">
                Add the backend reset flow next and we can connect this button
                too.
              </p>
              <button
                onClick={() => setShowForgot(false)}
                className="mt-4 rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
              >
                Close
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
}
