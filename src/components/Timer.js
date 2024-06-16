import React, { useState, useEffect, useContext } from "react";
import DataContext from "../context/dataContext";

const Timer = () => {
  const { showTheResult, resetTimer } = useContext(DataContext);
  const [time, setTime] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          showTheResult(); // Moved outside the setState
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Reset the timer when resetTimer changes
    if (resetTimer) {
      setTime(600);
    }

    return () => clearInterval(interval);
  }, [showTheResult, resetTimer]); // Ensure showTheResult is added as a dependency if needed

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");

  return (
    <div
      className="timer"
      style={{
        paddingLeft: "40px",
        paddingRight: "30px",
        width: "350px",
        background: "#3d3d3d",
        borderRadius: "10px",
        borderColor: "#646464",
      }}
    >
      <h2
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          fontFamily: "poppins",
          fontSize: "22px",
          //   justifyContent: "center",
        }}
      >
        Remaining Time:&ensp;
        <span style={{ color: "red" }}>{minutes}</span>:
        <span style={{ color: "red" }}>{seconds}</span>
      </h2>
    </div>
  );
};

export default Timer;
