import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const parsedDays = days.map((ele) => (
    <DayListItem
      key={ele.id}
      name={ele.name}
      spots={ele.spots}
      selected={ele.name === day}
      setDay={setDay}
    />
  ));
  return <ul>{parsedDays}</ul>;
}
