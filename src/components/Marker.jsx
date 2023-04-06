import React from "react";

const MarkerComponent = ({ width }) => {
  const K_WIDTH = width;
  const K_HEIGHT = width;
  const options = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: "absolute",
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT,

    textAlign: "center",
    color: "#ff793c",
    padding: 4,
  };
  return (
    <div>
      <img src="/images/svgs/JewelPin.svg" style={options} alt="X" />;
    </div>
  );
};

export default MarkerComponent;
