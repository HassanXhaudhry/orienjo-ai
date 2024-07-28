import React, { useState, useRef, Fragment, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ArrowLeft from "../assets/ArrowLeft.svg";
import api from "../api";
import { API_URLS } from "../utils/API_URLS";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../reducers/user.reducer";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.token);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const [signupName, setSignupName] = useState("signupName");
  const [signupEmail, setSignupEmail] = useState("signupEmail");
  const [loginPassword, setLoginPassword] = useState("loginPassword");
  const [signupPassword, setSignupPassword] = useState("singuPassword");
  const [confirmPassword, setConfirmPassword] = useState("confirmPassword");
  const [newPassword, setNewPassword] = useState("newPassword");
  const [confirmNewPassword, setConfirmNewPassword] =
    useState("confirmNewPassword");
  const [emailInput, setInputEmail] = useState(true);

  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const emailRef = useRef("");

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");

  const handleInputChange = (ref, value, nextRef) => {
    if (value !== "") {
      ref.current.focus();
    }
    switch (ref) {
      case pin1Ref:
        setPin1(value);
        if (value !== "") {
          pin2Ref.current.focus();
        }
        break;
      case pin2Ref:
        setPin2(value);
        if (value !== "") {
          pin3Ref.current.focus();
        }
        break;
      case pin3Ref:
        setPin3(value);
        if (value !== "") {
          pin4Ref.current.focus();
        }
        break;
      case pin4Ref:
        setPin4(value);
        if (value !== "") {
          pin5Ref.current.focus();
        }
        break;
      case pin5Ref:
        setPin5(value);
        if (value !== "") {
          pin6Ref.current.focus();
        }
        break;
      case pin6Ref:
        setPin6(value);
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (ref, e) => {
    if (e.key === "Backspace" && ref.current.selectionStart === 0) {
      switch (ref) {
        case pin2Ref:
          pin1Ref.current.focus();
          break;
        case pin3Ref:
          pin2Ref.current.focus();
          break;
        case pin4Ref:
          pin3Ref.current.focus();
          break;
        case pin5Ref:
          pin4Ref.current.focus();
          break;
        case pin6Ref:
          pin5Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const toggleLoginPassword = () => {
    setLoginPassword(!loginPassword);
  };
  const toggleSignupPassword = () => {
    setSignupPassword(!signupPassword);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };
  const toggleNewPassword = () => {
    setNewPassword(!newPassword);
  };
  const toggleConfirmNewPassword = () => {
    setConfirmNewPassword(!confirmNewPassword);
  };

  const toggleSection = () => {
    setShowLogin(!showLogin);
    setShowSignup(!showSignup);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
  };

  const handleBackClick = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  const handleResetPasswordClick = () => {
    setShowExplain(true);
    setShowLogin(false);
    setShowForgotPassword(false);
  };

  const handleBackDescribeClick = () => {
    setShowExplain(false);
    setShowForgotPassword(true);
  };
  const getPinCode = (pin1Ref, pin2Ref, pin3Ref, pin4Ref, pin5Ref, pin6Ref) => {
    const pin1 = pin1Ref.current.value.trim();
    const pin2 = pin2Ref.current.value.trim();
    const pin3 = pin3Ref.current.value.trim();
    const pin4 = pin4Ref.current.value.trim();
    const pin5 = pin5Ref.current.value.trim();
    const pin6 = pin6Ref.current.value.trim();
    return `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
  };

  const handleVerifyClick = () => {
    const pinCode = getPinCode(
      pin1Ref,
      pin2Ref,
      pin3Ref,
      pin4Ref,
      pin5Ref,
      pin6Ref
    );
    const valuesForApi = {
      otp: pinCode,
      email: emailRef.current,
    };
    api
      .post(API_URLS.user.verifyOTP, valuesForApi)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setShowResetPassword(true);
          setShowExplain(false);
        }, 2000);
      })
      .finally(() => {
        setShowResetPassword(true);
      });
  };

  const handleBackToExplain = () => {
    setShowResetPassword(false);
    setShowExplain(true);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Fragment>
        {showLogin ? (
          <div className="bg-white sm:w-[420px] w-[270px] h-auto rounded-xl">
            <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
              Login
              <p className="text-xs font-Inter text-[#9A9AB0] py-1">
                Please enter your details to Login.
              </p>
              <div>
                <Formik
                  initialValues={{
                    email: "",
                    loginPassword: "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .required("Email is required")
                      .test(
                        "valid-email",
                        "Email must be valid",
                        function (value) {
                          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                        }
                      ),
                    loginPassword: Yup.string()
                      .min(8, "Must be 8 characters or more")
                      .required("Password is required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    let valueForApi = {
                      username: values.email,
                      password: values.loginPassword,
                    };
                    debugger;
                    api
                      .post(API_URLS.user.login, valueForApi)
                      .then((res) => {
                        debugger;
                        if (res.status == 200) {
                          dispatch(setToken(res.data.access));
                          navigate("/dashboard");
                        }
                        console.log(res);
                      })
                      .catch(function (error) {
                        console.error(error);
                      });
                  }}
                >
                  {(formik) => (
                    <form
                      className="flex flex-col items-center gap-4 mt-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">Email</p>
                        <div className="relative flex">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">Password</p>
                        <div className="relative flex">
                          <input
                            type={loginPassword ? "password" : "text"}
                            placeholder="Enter your password"
                            name="loginPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.loginPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {loginPassword ? (
                              <FiEye onClick={toggleLoginPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleLoginPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.loginPassword &&
                        formik.errors.loginPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.loginPassword}
                          </div>
                        ) : null}

                        <div className="font-Mulish text-xs text-[#9A9AB0] flex justify-end pr-3 py-4">
                          <p
                            className=" hover:underline cursor-pointer"
                            onClick={handleForgotPasswordClick}
                          >
                            Forgot Password?
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <button
                            type="submit"
                            className="w-[200px] font-Inter h-[33px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm my-3 sm:my-0"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
                <div className="flex text-xs py-4 justify-center pt-10">
                  <p className="text-[#11142D]">Don’t have an Account?</p>
                  &nbsp;
                  <p
                    className="text-[#0071BD] hover:underline cursor-pointer"
                    onClick={toggleSection}
                  >
                    Signup
                  </p>
                </div>
              </div>
            </div>
        ) : null}

        {showSignup ? (
          <div className="bg-white sm:w-[420px] w-[280px] h-auto rounded-xl">
            <div className="sm:my-2.5 sm:mx-16 my-2 mx-6 font-Inter text-lg pt-4">
              Signup
              <p className="sm:text-[11px] text-[9px] font-Inter text-[#9A9AB0]">
                Please enter your details to create your free account.
              </p>
              <div>
                <Formik
                  initialValues={{
                    signupName: "",
                    signupEmail: "",
                    signupPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={Yup.object({
                    signupName: Yup.string().required("Name is required"),
                    signupEmail: Yup.string()
                      .required("Email is required")
                      .test(
                        "valid-email",
                        "Email must be valid",
                        function (value) {
                          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                        }
                      ),
                    signupPassword: Yup.string()
                      .min(8, "Must be 8 characters or more")
                      .required("Password is required"),
                    confirmPassword: Yup.string()
                      .oneOf(
                        [Yup.ref("signupPassword"), null],
                        "Passwords must match"
                      )
                      .required("Password is required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    let valueForApi = {
                      fullname: values.signupName,
                      email: values.signupEmail,
                      password: values.signupPassword,
                      is_superuser: false,
                    };
                    api
                      .post(API_URLS.user.signUp, valueForApi)
                      .then((res) => {
                        debugger;
                        console.log(res);
                      })
                      .catch(function (error) {
                        console.error(error);
                      });
                  }}
                >
                  {(formik) => (
                    <Form
                      className="flex flex-col items-center gap-2"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">Name</p>
                        <div className="relative flex">
                          <input
                            type={signupName ? "text" : "text"}
                            placeholder="Enter your name"
                            name="signupName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.signupName}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                        </div>
                        {formik.touched.signupName &&
                        formik.errors.signupName ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.signupName}
                          </div>
                        ) : null}
                      </div>

                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">Email</p>
                        <div className="relative flex">
                          <input
                            type={signupEmail ? "email" : "text"}
                            placeholder="Enter your email"
                            name="signupEmail"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.signupEmail}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                        </div>
                        {formik.touched.signupEmail &&
                        formik.errors.signupEmail ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.signupEmail}
                          </div>
                        ) : null}
                      </div>
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">Password</p>
                        <div className="relative flex">
                          <input
                            type={signupPassword ? "password" : "text"}
                            placeholder="Enter password"
                            name="signupPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.signupPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {signupPassword ? (
                              <FiEye onClick={toggleSignupPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleSignupPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.signupPassword &&
                        formik.errors.signupPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.signupPassword}
                          </div>
                        ) : null}
                      </div>

                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">
                          Confirm Password
                        </p>
                        <div className="relative flex">
                          <input
                            type={confirmPassword ? "password" : "text"}
                            placeholder="Enter password again"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {confirmPassword ? (
                              <FiEye onClick={toggleConfirmPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleConfirmPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}

                        <div className="flex flex-col items-center py-4">
                          <button
                            type="submit"
                            className="w-[200px] font-Inter h-[33px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm my-2 sm:my-0"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
                <div className="flex text-xs justify-center py-4">
                  <p className="text-[#11142D]">Already have an Account?</p>
                  &nbsp;
                  <p
                    className="text-[#0071BD] hover:underline cursor-pointer"
                    onClick={toggleSection}
                  >
                    Login
                  </p>
                </div>
              </div>
            </div>
        ) : null}

        {showResetPassword && (
          <div className="bg-white sm:w-[420px] sm:h-[470px] w-[270px] h-[500px] rounded-xl font-Mulish">
            <div className="flex">
              <div
                className="sm:ml-16 mt-6 sm:mb-0 mb-4 ml-8 rounded-sm bg-gradient-to-b bg-white hover:bg-[#E1E1E1] border border-[#E1E1E1]"
                onClick={handleBackToExplain}
              >
                <img src={ArrowLeft} alt="" className="cursor-pointer" />
              </div>
              <p className="ml-2 mt-[26.5px] font-Mulish text-sm font-semibold">
                Back
              </p>
            </div>
            <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
              Reset Password
              <div>
                <Formik
                  initialValues={{
                    newPassword: "",
                    confirmNewPassword: "",
                  }}
                  validationSchema={Yup.object({
                    newPassword: Yup.string()
                      .min(8, "Must be 8 characters or more")
                      .required("Required"),
                    confirmNewPassword: Yup.string()
                      .oneOf(
                        [Yup.ref("newPassword"), null],
                        "Passwords must match"
                      )
                      .required("Required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    // Handle form submission logic here
                    // Remember to call setSubmitting(false) when done
                  }}
                >
                  {(formik) => (
                    <form
                      className="flex flex-col items-center gap-4 mt-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">
                          New Password
                        </p>
                        <div className="relative flex">
                          <input
                            type={newPassword ? "password" : "text"}
                            placeholder="Set new password"
                            name="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.loginPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {newPassword ? (
                              <FiEye onClick={toggleNewPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleNewPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.newPassword &&
                        formik.errors.newPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.newPassword}
                          </div>
                        ) : null}
                      </div>
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">
                          Confirm Password
                        </p>
                        <div className="relative flex">
                          <input
                            type={confirmNewPassword ? "password" : "text"}
                            placeholder="Confirm password"
                            name="confirmNewPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmNewPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0 transition"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {confirmNewPassword ? (
                              <FiEye onClick={toggleConfirmNewPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleConfirmNewPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.confirmNewPassword &&
                        formik.errors.confirmNewPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.confirmNewPassword}
                          </div>
                        ) : null}
                      </div>
                    </form>
                  )}
                  <div className="flex flex-col items-center my-10">
                    <button
                      type="submit"
                      className="w-[200px] font-Inter h-[33px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm my-3 sm:my-0"
                    >
                      Reset
                    </button>
                  </div>
                </Formik>
              </div>
            </div>
          </div>
        )}

        {showExplain && (
          <div className="font-Mulish bg-white sm:w-[420px] sm:h-[470px] w-[270px] h-[500px] rounded-xl">
            <div className="flex">
              <div
                className="sm:ml-16 mt-6 sm:mb-0 mb-4 ml-8 rounded-sm bg-gradient-to-b bg-white hover:bg-[#E1E1E1] border border-[#E1E1E1]"
                onClick={handleBackDescribeClick}
              >
                <img src={ArrowLeft} alt="" className="cursor-pointer" />
              </div>
              <p className="ml-2 mt-[26.5px] font-Mulish text-sm font-semibold">
                Back
              </p>
            </div>
            <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
              Forgot Password
              <p className="text-xs font-Inter text-[#9A9AB0] my-3">
                Enter the email address you used when you joined and we’llsend
                you instructions to reset your password. <br />
                <br />
                For security reasons, we do NOT store your password. So rest
                assured that we will never send your password via email.
              </p>
              <p className="font-Mulish text-xs font-bold my-5">
                Enter OTP Sent Via Email
              </p>
              <div className="flex justify-center items-center sm:gap-3 gap-2 mb-3">
                <input
                  ref={pin1Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin1Ref, e.target.value, pin2Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin1Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin2Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin2Ref, e.target.value, pin3Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin2Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin3Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin3Ref, e.target.value, pin4Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin3Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin4Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin4Ref, e.target.value, pin5Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin4Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin5Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin5Ref, e.target.value, pin6Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin5Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin6Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) => handleInputChange(pin6Ref, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(pin6Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="w-[100px] font-Inter h-[36px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm my-5"
                onClick={handleVerifyClick}
              >
                Verify
              </button>
            </div>
          </div>
        )}

        {showForgotPassword && (
          <div className="bg-white sm:w-[420px] sm:h-[470px] w-[270px] h-[500px] rounded-xl">
            <div>
              {emailInput && (
                <div>
                  <div className="flex">
                    <div
                      className="sm:ml-16 mt-6 sm:mb-0 mb-4 ml-8 rounded-sm bg-gradient-to-b bg-white hover:bg-[#E1E1E1] border border-[#E1E1E1]"
                      onClick={handleBackClick}
                    >
                      <img src={ArrowLeft} alt="" className="cursor-pointer" />
                    </div>
                    <p className="ml-2 mt-[26.5px] font-Mulish text-sm font-semibold">
                      Back
                    </p>
                  </div>
                  <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
                    Forgot Password
                    <p className="text-xs font-Inter text-[#9A9AB0] my-3">
                      Enter the email address you used when you joined and
                      we’llsend you instructions to reset your password. <br />
                      <br />
                      For security reasons, we do NOT store your password. So
                      rest assured that we will never send your password via
                      email.
                    </p>
                    <Formik
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .required("Email is required")
                          .test(
                            "valid-email",
                            "Email must be valid",
                            function (value) {
                              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                            }
                          ),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        api
                          .post(API_URLS.user.forgetPassword, values)
                          .then((res) => {
                            console.log(res);
                            emailRef.current = values.email;
                            handleResetPasswordClick();
                          })
                          .catch(function (error) {
                            console.error(error);
                          });
                      }}
                    >
                      {(formik) => (
                        <form
                          className="flex flex-col items-center gap-4 mt-8"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="font-Mulish sm:w-[300px] w-[200px]">
                            <p className="pb-1 text-xs font-semibold">Email</p>
                            <div className="relative flex">
                              <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                 className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                              />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                              <div className="text-red-700 text-xs">
                                {formik.errors.email}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex flex-col mt-7">
                            <button
                              type="submit"
                              className="w-[170px] font-Inter h-[36px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm mt-3 sm:my-0"
                            >
                              Reset Password
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default Login;
