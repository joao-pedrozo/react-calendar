import { TbTemperature } from "react-icons/tb";

import styles from "./styles.module.scss";

const TemperatureDisplayer = ({ temperature }) => (
  <div className={styles.container}>
    <TbTemperature />
    {temperature ? (
      <span>{Math.round(temperature)}°C</span>
    ) : (
      <span>Temperature Unavailable</span>
    )}
  </div>
);

export default TemperatureDisplayer;
