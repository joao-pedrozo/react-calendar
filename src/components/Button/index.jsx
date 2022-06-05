import "./styles.scss";

const Button = ({ kind = "default", ...props }) => {
  return (
    <button
      className={`button-component-wrapper ${
        kind === "cancel" ? "button-component-wrapper--cancel" : ""
      } ${kind === "default" ? "button-component-wrapper--default" : ""}`}
      {...props}
    ></button>
  );
};

export default Button;
