import React from "react";
import backgroundImage from "../../../../images/home.png";

const Home = () => {
  const containerStyle = {
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw", // Add this line to set the container width to the full viewport width
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      {/* Add your content here */}
      <div></div>
    </div>
  );
};

export default Home;
