import React, { useContext, useEffect, useState } from "react";
import "./MutilStep.scss";
import Button from "@mui/material/Button";

// Create context Data for Mutil-step form
import { createContext } from "react";
const MutilStepContext = createContext();

export const MSNav = () => {
  const { options, setOptions } = useContext(MutilStepContext);

  useEffect(() => {
    options.forEach((option) => {
      var form = document.querySelector(`#${option.id}`);
      if (option.status !== "active") {
        form.style.display = "none";
      } else {
        form.style.display = "flex";
      }
    });
  }, [options]);

  return (
    <div className="MSNav">
      <div className="step-line"></div>
      <div className="MSNav-container">
        {options.map((step, index) => {
          return (
            <div
              className={
                "step " +
                (step.status === "active" ? "step-actived " : "") +
                (step.status === "finished" ? "step-finished " : "")
              }
              key={index}
            >
              <span>{index}</span>
              <i className="bi bi-check"></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MSContrainer = ({ children, options }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([...options]);
  }, [options]);

  const setOptions = (newValue) => {
    setData([...newValue]);
  };

  const valueContext = { options: data, setOptions };

  return (
    <MutilStepContext.Provider value={valueContext}>
      <div className="MutilStep">{children}</div>
    </MutilStepContext.Provider>
  );
};

export const MSContent = () => {
  const { options, setOptions } = useContext(MutilStepContext);
  return (
    <div className="MSContent">
      {options.map((content, index) => {
        return (
          <div className="form-step" id={content.id} key={index}>
            {content.render()}
          </div>
        );
      })}
    </div>
  );
};

export const MSNextButton = ({ label }) => {
  const { options, setOptions } = useContext(MutilStepContext);

  const onNextStep = (option) => {
    var form = document.querySelector(`#${option.id}`);
    const elements = form.querySelectorAll("[data-ms]");
    const dataObject = {};

    elements.forEach((element) => {
      const dataMsValue = element.getAttribute("data-ms");


      dataObject[dataMsValue] = element.value;
    });


    if (option.handler(dataObject)) {
      var updateData = options;
      let index = updateData.findIndex((option) => {
        return option.status === "active";
      });

      if (index < updateData.length - 1) {
        updateData[index].status = "finished";
        updateData[index + 1].status = "active";
        setOptions(updateData);
      }
    }
  };

  return (
    <div className="MSNextButton">
      {options.map((option) => {
        if (option.status === "active") {
          return (
            <Button variant="contained" onClick={() => onNextStep(option)} key={'next-button-' + option.id} > 
              {label ? label : "next"}
            </Button>
          );
        }
      })}
    </div>
  );
};

export const MSPrevButton = () => {};

export const MSTitle = () => {
  const { options } = useContext(MutilStepContext);
  return (
    <div className="MSTitle">
      {options.map((option) => {
        if (option.status === "active") {
          return <h2 key={"title-form-" + option.id}>{option.title}</h2>;
        }
      })}
    </div>
  );
};

export const MSDesc = () => {
  const { options } = useContext(MutilStepContext);
  return (
    <div className="MSDesc">
      {options.map((option) => {
        if (option.status === "active") {
          return <pre key={"desc-form-" + option.id}>{option.desc}</pre>;
        }
      })}
    </div>
  );
};

export const MSIcon = () => {
  const { options } = useContext(MutilStepContext);
  return (
    <div className="MSIcon">
      {options.map((option) => {
        if (option.status === "active") {
          return (
            <i className={option.icon} key={"title-form-" + option.id}></i>
          );
        }
      })}
    </div>
  );
};
