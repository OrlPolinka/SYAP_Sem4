import React from "react";

function History({ history }: { history: string[] }) {
    return (
      <div className="history">
        <h2>История:</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    );
  }
  export default History;
  