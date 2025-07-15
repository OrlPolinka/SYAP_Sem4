import React, { useState, useEffect } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import History from "./History";
import './Calculator.css';

function Calculator() {
  const [expression, setExpression] = useState<string>(""); // Текущее выражение
  const [result, setResult] = useState<string>(""); // Результат вычисления
  const [history, setHistory] = useState<string[]>([]); // История вычислений
  const [theme, setTheme] = useState<string>("light"); // Тема

  // Обработка нажатия клавиш
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Backspace") {
      setExpression(expression.slice(0, -1));
    } else if (key === "Enter") {
      handleInput("=");
    } else if (key === "C" || key === "c") {
      setExpression("");
      setResult("");
    } else if (/[0-9+\-*/^().]/.test(key)) {
      setExpression(expression + key);
    }
  };

  // Добавление обработчика при монтировании компонента
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [expression]); // Зависимость от выражения, чтобы обработчик всегда работал с актуальной версией

  // Обработка ввода с кнопок
  const handleInput = (value: string) => {
    if (value === "C") {
      setExpression("");
      setResult("");
    } else if (value === "⌫") {
      setExpression(expression.slice(0, -1));
    } else if (value === "=") {
      try {
        const evalResult = eval(expression);
        if (evalResult === Infinity || evalResult === -Infinity) {
          setResult("Ошибка: Деление на ноль");
        } else {
          setResult(evalResult.toString());
          setHistory([`${expression} = ${evalResult}`, ...history]);
        }
      } catch {
        setResult("Ошибка");
      }
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <div className="calculator-container">
        <div className="calculator">
          <div className="theme-toggle">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="theme-toggle-button">
                {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
          <Display expression={expression} result={result} />
          <Keypad handleInput={handleInput} />
          <History history={history} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
