import styles from "./styles.module.scss";
import { TbTemperature } from "react-icons/tb";

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
