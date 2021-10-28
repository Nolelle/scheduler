import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const parsedDays = days.map((ele) => (
    <DayListItem
      key={ele.id}
      name={ele.name}
      spots={ele.spots}
      selected={ele.name === value}
      setDay={onChange}
    />
  ));
  return <ul>{parsedDays}</ul>;
}
