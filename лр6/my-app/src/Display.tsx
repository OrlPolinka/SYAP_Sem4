import React from "react";

function Display({ expression, result }: { expression: string; result: string }) {
    return (
      <div className="display">
        <div>{expression || "0"}</div>
        <div className="result">{result}</div>
      </div>
    );
  }
  export default Display;
  