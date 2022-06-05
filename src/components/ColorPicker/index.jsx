import { BsCheck } from "react-icons/bs";
import { MdOutlineColorLens } from "react-icons/md";

import colors from "../../utils/colors";
import styles from "./styles.module.scss";

const ColorPicker = ({ selectedColor, setSelectedColor }) => (
  <div className={styles.container}>
    <MdOutlineColorLens />
    {colors.map((color) => (
      <div
        style={{ backgroundColor: color }}
        className={styles["container__color"]}
        onClick={() => setSelectedColor(color)}
        key={color}
      >
        {selectedColor === color && <BsCheck />}
      </div>
    ))}
  </div>
);

export default ColorPicker;
