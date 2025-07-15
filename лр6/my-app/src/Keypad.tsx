import React from "react";

function Keypad({ handleInput }: { handleInput: (value: string) => void }) {
    return (
      <div className="keypad">
        {[
          "7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+",
          "C", "⌫"
        ].map((item) => (
          <button
            key={item}
            className={`key ${item === "=" ? "equals" : ""} ${["/", "*", "-", "+"].includes(item) ? "operator" : ""}`}
            onClick={() => handleInput(item)}>
            {item}
          </button>
        ))}
      </div>
    );
  }
  export default Keypad;
  