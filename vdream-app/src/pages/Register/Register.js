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
  const [statusForm, setStatusForm] = useState(null);
  const [statusFields, setStatusFields] = useState({
    Email: {
      status: null,
      error: true,
      message: "",
    },
    Password: {
      status: null,
      error: true,
      message: "",
    },
    ConfirmPassword: {
      status: null,
      error: true,
      message: "",
    },
  });

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // URL cơ sở cho API của bạn
    timeout: 10000, // Thời gian chờ mặc định (tính bằng mili giây)
    headers: {
      "Content-Type": "application/json", // Loại nội dung mặc định
    },
  });
  const MS = useMS();

  useEffect(() => {
    checkFormValid(statusFields)
    // if (checkFormValid(statusFields)) {
    //   instance.post("/api/accounts/register", formData).then((response) => {
    //     if (!response.data.success) {
    //       alert(response.data.message);
    //     } else {
    //       MS.next();
    //     }
    //   });
    // }
  }, [formData]);

  // Check form submit valid
  const checkFormValid = (obj) => {
    return Object.values(obj).reduce((acc, fieldValue) => {
      console.log(fieldValue.status === "success" )
      return (
        acc && fieldValue.status === "success" && fieldValue.error === false
      );
    }, true);
  };

  // Xử lí submit form
  const onHandleForm = () => {
    const form = document.querySelector(".EmailForm_Option");
    const elements = form.querySelectorAll("[data-ms]");
    const dataObject = {};

    elements.forEach((element) => {
      const dataMsValue = element.getAttribute("data-ms");
      dataObject[dataMsValue] = element.value;
    });

    setFormData(dataObject);

    // instance.post("/api/accounts/register", dataObject).then((response) => {
    //   console.log(response.data);
    //   if (!response.data.success) {
    //     alert(response.data.message);
    //   } else {
    //     MS.next();
    //   }
    // });
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (event) => {
    const passwordInput = document.querySelector('input[data-ms="Password"]');
    var passwordInputValue = passwordInput.value;

    if (event.target.value === passwordInputValue) {
      setStatusFields({
        ...statusFields,
        ConfirmPassword: { status: "success", error: false, message: "" },
      });
    } else
      setStatusFields({
        ...statusFields,
        ConfirmPassword: {
          status: "error",
          error: true,
          message: "Password not match",
        },
      });

    if (event.target.value === "") {
      setStatusFields({
        ...statusFields,
        ConfirmPassword: {
          status: "error",
          error: true,
          message: "Field is required",
        },
      });
    }
  };

  // Handle password input change
  const handlePasswordChange = (event) => {
    if (event.target.value.length < 8) {
      setStatusFields({
        ...statusFields,
        Password: {
          status: "error",
          error: true,
          message: "Field must be 8 characters in length",
        },
      });
    } else {
      setStatusFields({
        ...statusFields,
        Password: { status: "success", error: false, message: "" },
      });
    }

    if (event.target.value === "") {
      setStatusFields({
        ...statusFields,
        Password: {
          status: "error",
          error: true,
          message: "Field is required",
        },
      });
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/;
    return re.test(email);
  };

  // Handle email input change
  const handleEmailChange = (event) => {
    if (event.target.value === "") {
      setStatusFields({
        ...statusFields,
        Email: { status: "error", error: true, message: "Field is required" },
      });
    } else {
      if (!validateEmail(event.target.value)) {
        setStatusFields({
          ...statusFields,
          Email: { status: "error", error: true, message: "Invalid email" },
        });
      }
      else {
        setStatusFields({
          ...statusFields,
          Email: { status: "success", error: false, message: "" },
        });
      }
    }
  };

  // Handle field input blur
  const handleFieldBlur = (event) => {
    // setStatusFields({
    //   ...statusFields,
    //   [event.target.name]: { error: false, message: "" },
    // });
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
          name="Email"
          helperText={statusFields["Email"].message}
          color={statusFields["Email"].status}
          onChange={handleEmailChange}
          onBlur={handleFieldBlur}
          onFocus={handleEmailChange}
          focused={statusFields['Email'].status ? true : false}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          inputProps={{ "data-ms": "Password" }}
          helperText={statusFields["Password"].message}
          color={statusFields["Password"].status}
          onChange={handlePasswordChange}
          onBlur={handleFieldBlur}
          onFocus={handlePasswordChange}
          focused={statusFields['Password'].status ? true : false}
          name="Password"
        />

        <TextField
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          type="password"
          helperText={statusFields["ConfirmPassword"].message}
          color={statusFields["ConfirmPassword"].status}
          focused={statusFields['ConfirmPassword'].status ? true : false}
          onChange={handleConfirmPasswordChange}
          onBlur={handleFieldBlur}
          onFocus={handleConfirmPasswordChange}
          name="ConfirmPassword"
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
