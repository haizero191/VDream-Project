import React, { useEffect, useState } from "react";
import "./Register.scss";

// Import Grid layout from material UI

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



// Usable Mutil-step-form
import {
  MSContrainer,
  MSNav,
  MSContent,
  MSNextButton,
  MSTitle,
  MSDesc,
  MSIcon,
} from "../../components/MutilStep/MutilStep";

const EmailForm_Option = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div className="EmailForm_Option">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          inputProps={{ "data-ms": "Email" }}
        />
        <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
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
        <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "Confirm Password"}
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
            label="Confirm Password"
          />
        </FormControl>
      </Box>
    </div>
  );
};

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [initConfig, setInitConfig] = useState([
    {
      id: "register-form-1",
      title: "Enter your email",
      desc: "Enter the email address you want to use to create the account, the email address is unique, and make sure the email hasn't been created before.",
      status: "active",
      icon: "bi bi-envelope-at",
      render: () => <EmailForm_Option />,
      handler: (formData) => {
        console.log(formData);
        return true;
      },
    },
    {
      id: "register-form-2",
      title: "Verify your email",
      desc: "Verify your email by entering the secret code sent to your email. Do not share this code in any way.",
      status: "coming",
      icon: "bi bi-envelope-check",
      render: () => <h1>Form 2</h1>,
      data: {},
      handler: (form) => {
        return true;
      },
    },
    {
      id: "register-form-3",
      title: "Registered account type",
      desc: `Personal Account:  Use the service for personal, non-commercial purposes.
      Organization Account:  Businesses, non-profit organizations.
      `,
      status: "coming",
      icon: "bi bi-person-bounding-box",
      render: () => <h1>Form 3</h1>,
      data: {},
      handler: (form) => {
        return true;
      },
    },
    {
      id: "register-form-4",
      title: "Complete your profile",
      desc: `Fill in the information to complete your application.`,
      status: "coming",
      icon: "bi bi-info-circle",
      render: () => <h1>Form 4</h1>,
      data: {},
      handler: (form) => {
        return true;
      },
    },
  ]);

  useEffect(() => {
    if (currentStep > 0) {
      var formlist = initConfig;
      formlist[currentStep].status = "active";
      formlist[currentStep - 1].status = "finished";
      setInitConfig([...formlist]);
    }
  }, [currentStep]);

  const onNextStepHandler = () => {
    // Async handle here...
    return true;
  };

  return (
    <div className="Register">
      <div className="register-container">
        <MSContrainer options={initConfig}>
          <Box sx={{ height: "100%" }}>
            <Grid container height={"100%"}>
              <Grid item xs={8}>
                <div className="form-step-group">
                  {/* Form content render */}
                  <div className="form-step-group-container">
                    <MSContent />
                    <MSNextButton />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-step-desc">
                  <MSNav></MSNav>
                  <div className="form-step-desc-container">
                    <MSIcon />
                    <MSTitle />
                    <MSDesc />
                  </div>
                  <div className="bottom-title">
                    <p>Be your self</p>
                    <p>Build your future</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </MSContrainer>
      </div>
    </div>
  );
};

export default Register;
