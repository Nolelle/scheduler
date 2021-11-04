import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  let dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": selected },
    { "day-list__item--full": spots === 0 }
  );

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    }
  };

  return (
    <li
      className={dayClass}
      onClick={() => {
        setDay(name);
      }}
      selected={selected}
      data-testid="day"
    >
      <h2 className="text--regular"> {name}</h2>
      {spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
      {spots === 1 && <h3 className="text--light">{formatSpots(spots)}</h3>}
      {spots === 0 && <h3 className="text--light">{formatSpots(spots)}</h3>}
    </li>
  );
}
