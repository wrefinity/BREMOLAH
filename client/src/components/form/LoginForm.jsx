import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  loaderSize,
  loaderColor,
  validate,
} from "../../helpers/input";
import { loginUser } from "../../actions/users";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [, setCookies] = useCookies();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(loginData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(false)
      dispatch(loginUser(loginData, navigate, setCookies, toast));
      reset();
    } 
    else {
      setLoading(false)
    }
  }, [formErrors]);

  const reset = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form onSubmit={handleOnSubmit}>
              <div className="p-3 p-lg-5 border">
                <div className="container p-5 mb-4 bg-danger">
                  <h2 className="h3 mb-3 text-white text-center bold-text">
                    Login
                  </h2>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_email" className="text-black bold-text">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={loginData.email}
                      name="email"
                      onChange={(e) => handleInput(e, setLoginData)}
                      id="c_email"
                      placeholder="enter your email"
                    />
                     <p className="text-danger">{formErrors.email}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label
                      htmlFor="c_password"
                      className="text-black bold-text"
                    >
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="c_password"
                      placeholder="enter password"
                      value={loginData.password}
                      name="password"
                      onChange={(e) => handleInput(e, setLoginData)}
                    />
                    <p className="text-danger">{formErrors.password}</p>
                  </div>
                
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <p>
                      Already have an account?{" "}
                      <Link to="/signup" className="bold-text text-danger">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                    {!loading && (
                      <button className="btn btn-danger btn-lg btn-block bold-text">
                        Login
                      </button>
                    )}
                    {loading && (
                      <div className="d-flex justify-content-center">
                        <LineWave
                          color={loaderColor}
                          height={loaderSize}
                          width={loaderSize}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
