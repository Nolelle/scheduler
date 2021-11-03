import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const daysData = all[0].data;
      const appointmentsData = all[1].data;
      const interviewerData = all[2].data;
      setState((prev) => ({
        ...prev,
        days: daysData,
        appointments: appointmentsData,
        interviewers: interviewerData,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function spotsRemaining(state, appointments) {
    let copyOfState = { ...state };
    let copyOfDaysStateArray = [...state.days];
    let spots = 0;
    let selectedDay = copyOfState.day;

    let day = copyOfDaysStateArray.find((ele) => ele.name === selectedDay);

    for (let id of day.appointments) {
      let appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    day = { ...day, spots };

    let returnDaysArray = copyOfDaysStateArray.map((ele) => {
      if (ele.name === selectedDay) {
        return day;
      } else {
        return ele;
      }
    });
    return returnDaysArray;
  }
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const days = spotsRemaining(state, appointments);
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const days = spotsRemaining(state, appointments);
        console.log(appointments);
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
