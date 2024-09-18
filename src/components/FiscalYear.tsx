import { useState, useEffect, FC } from "react";
import { getWeekNumber } from "../utils";
import "./FiscalYear.css";

export const FiscalYear: FC = () => {
  const currentWeekNumber = getWeekNumber(new Date());
  const [dateInput, setDateInput] = useState<string>("");
  const [weekNumber, setWeekNumber] = useState<number>(currentWeekNumber);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
  };

  useEffect(() => {
    if (dateInput) {
      let parsedDate: Date | null = null;

      if (/\d{4}-\d{2}-\d{2}/.test(dateInput)) {
        parsedDate = new Date(dateInput);
      } else if (/\d{2}\/\d{2}\/\d{4}/.test(dateInput)) {
        const [day, month, year] = dateInput.split("/").map(Number);
        parsedDate = new Date(year, month - 1, day);
      } else {
        setErrorMessage(
          "Please enter a valid date in the format YYYY-MM-DD or DD/MM/YYYY"
        );
        setWeekNumber(currentWeekNumber);
        return;
      }

      if (parsedDate && !isNaN(parsedDate.getTime())) {
        const calculatedWeekNumber = getWeekNumber(parsedDate);
        setWeekNumber(calculatedWeekNumber);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid date. Please check your input.");
        setWeekNumber(currentWeekNumber);
      }
    } else {
      setWeekNumber(currentWeekNumber);
      setErrorMessage("");
    }
  }, [dateInput, currentWeekNumber]);

  return (
    <div className="container">
      {dateInput && !errorMessage && (
        <h1>
          Week number is: <span style={{ color: "#213547" }}>{weekNumber}</span>
        </h1>
      )}
      {!dateInput && (
        <h1>
          Current week: <span style={{ color: "#213547" }}>{weekNumber}</span>
        </h1>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p className="input-desc">YYYY-MM-DD or DD/MM/YYYY</p>
      <input
        type="text"
        value={dateInput}
        onChange={handleDateChange}
        placeholder="Enter date..."
        className="input-style"
      />
    </div>
  );
};
