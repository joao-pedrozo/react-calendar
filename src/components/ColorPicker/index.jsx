import { MdOutlineColorLens } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import styles from "./styles.module.scss";
import colors from "../../utils/colors";

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
