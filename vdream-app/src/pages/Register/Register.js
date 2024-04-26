import React, { useEffect, useState } from "react";
import "./Register.scss";
import axios from "axios";

// Import Grid layout from material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Usable Mutil-step-form
import {
  MSContrainer,
  MSNav,
  MSContent,
  MSNextButton,
  MSTitle,
  MSDesc,
  MSIcon,
  useMS,
} from "../../components/MutilStep/MutilStep";

const Register_Form_1 = ({ option }) => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // URL cơ sở cho API của bạn
    timeout: 10000, // Thời gian chờ mặc định (tính bằng mili giây)
    headers: {
      'Content-Type': 'application/json' // Loại nội dung mặc định
    }
  });
  const [statusForm, setStatusForm] = useState(null);

  const MS = useMS();

  useEffect(() => {

  

  }, [formData]);

  const onHandleForm = () => {
    if (statusForm === "success") {
      const form = document.querySelector(".EmailForm_Option");
      const elements = form.querySelectorAll("[data-ms]");
      const dataObject = {};
      elements.forEach((element) => {
        const dataMsValue = element.getAttribute("data-ms");
        dataObject[dataMsValue] = element.value;
      });

      setFormData(dataObject);

      instance.post('/api/accounts/register', dataObject).then(response => {
        if(!response.data.success) {
          alert(response.data.message)
        }
        else {
          MS.next();
        }
      })

    }
  };

  const handleConfirmPasswordChange = (event) => {
    const passwordInput = document.querySelector('input[data-ms="Password"]');
    var passwordInputValue = passwordInput.value;
    if (event.target.value === passwordInputValue) {
      setStatusForm("success");
    } else setStatusForm("error");

    if (event.target.value === "") {
      setStatusForm(null);
    }
  };

  return (
    <div className="EmailForm_Option">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { mb: 3, width: "100%" },
        }}
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          inputProps={{ "data-ms": "Email" }}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          inputProps={{ "data-ms": "Password" }}
        />

        <TextField
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          type="password"
          helperText={
            statusForm === "success"
              ? "Match"
              : statusForm === "error"
              ? "Not match"
              : ""
          }
          color={statusForm}
          focused={statusForm ? true : false}
          onChange={handleConfirmPasswordChange}
        />
      </Box>

      <Button variant="contained" onClick={onHandleForm}>
        next
      </Button>
    </div>
  );
};

const Register = () => {
  const initConfig = [
    {
      id: "register-form-1",
      title: "Create your account",
      desc: "Register your account with email address and password.",
      status: "active",
      icon: "bi bi-envelope-at",
      render: (option) => <Register_Form_1 option={option} />,
    },
    {
      id: "register-form-2",
      title: "Verify your email",
      desc: "Verify your email by entering the secret code sent to your email. Do not share this code in any way.",
      status: "coming",
      icon: "bi bi-envelope-check",
      render: () => <h1>Form 2</h1>,
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
    },
    {
      id: "register-form-4",
      title: "Complete your profile",
      desc: `Fill in the information to complete your application.`,
      status: "coming",
      icon: "bi bi-info-circle",
      render: () => <h1>Form 4</h1>,
    },
  ];

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
