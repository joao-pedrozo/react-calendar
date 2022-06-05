import { forwardRef } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";

import "./styles.scss";

export const Input = forwardRef(
  ({ name, label, error, type, ...rest }, ref) => {
    console.log(error);

    return (
      <div
        className={`input-container ${error ? "input-container--errored" : ""}`}
      >
        <label htmlFor={name}>
          <b>{label}</b>
        </label>
        <div
          className={`input-container__input-parent ${
            error ? "input-container__input-parent--errored" : ""
          }`}
        >
          <input name={name} id={name} ref={ref} type={type} {...rest} />
          {error && type !== "datetime-local" && (
            <>
              <RiErrorWarningFill data-tip={error.message} />
              <ReactTooltip
                textColor="#fff"
                backgroundColor="#f95e5a"
                type="error"
                effect="solid"
                place="top"
              />
            </>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
