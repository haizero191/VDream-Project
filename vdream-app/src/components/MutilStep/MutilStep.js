import React, { useContext, useEffect, useState } from "react";
import "./MutilStep.scss";


// Create context Data for Mutil-step form
import { createContext } from "react";
const MutilStepContext = createContext();

export const useMS = () => {
  const { options, setOptions } = useContext(MutilStepContext);
  return {
    next : () => {
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
};

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
              <span>{index + 1}</span>
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
      {options.map((option, index) => {
        return (
          <div className="form-step" id={option.id} key={index}>
            {option.render(option)}
          </div>
        );
      })}
    </div>
  );
};

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
