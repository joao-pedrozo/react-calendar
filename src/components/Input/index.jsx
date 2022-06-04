import { forwardRef } from "react";

import styles from "./styles.module.scss";

export const Input = forwardRef(({ name, label, ...rest }, ref) => (
  <div className={styles.container}>
    <label htmlFor={name}>
      <b>{label}</b>
    </label>
    <div className={styles["container__input-wrapper"]}>
      <input type="text" name={name} id={name} ref={ref} {...rest} />
    </div>
  </div>
));

export default Input;
