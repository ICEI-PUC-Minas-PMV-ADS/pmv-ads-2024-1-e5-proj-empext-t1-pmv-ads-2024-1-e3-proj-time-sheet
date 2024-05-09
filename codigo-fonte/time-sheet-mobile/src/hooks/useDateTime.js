import React from "react";
import moment from "moment-timezone";

const months = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const daysOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export function useDateTime() {
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setTime(formattedTime);
  }

  function formatDate(date) {
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${month}`;

    setDate(formattedDate);
  }

  return { date, formatDate, time, formatTime };
}
