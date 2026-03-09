import { useState } from "react";

const Callback = ({ getColor }) => {
  const [activeColor, setActiveColor] = useState();

  const handleChange = (e) => {
    const {value} = e.target;
    setActiveColor(value);

    getColor(value);
  };
  return (
    <input
      className="color-input"
      type="text"
      onChange={handleChange}
      value={activeColor}
    />
  );
};

export default Callback;
