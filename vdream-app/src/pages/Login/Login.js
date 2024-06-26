import React from "react";
import "./Login.scss";


// Import form UI from material
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";





const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="Login">
      <div className="login-container">
        <div className="login-form">
          <div className="logo">Logo</div>
          <div className="login-form-container">
            <h2>Login your account</h2>
            <Box className="Login-fields">
              <TextField
                label="Email"
                id="outlined-start-adornment"
                sx={{ mb: 1, width: "100%" }}
              />
              <FormControl sx={{ mb: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <div className="actions">
                <Link>Forgot password?</Link>
                <Link to="/register">Don't have an account? Sign Up</Link>
              </div>
              <Button
                variant="contained"
                sx={{
                  mb: 1,
                  width: "100%",
                  background: "black",
                  height: "55px",
                }}
              >
                Login
              </Button>
            </Box>

            {/* <div className="login-options">
              <p>OR</p>
              <div className="login-options-container">
                <div className="google-login">
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"/>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="login-banner"></div>
      </div>
    </div>
  );
};

export default Login;
