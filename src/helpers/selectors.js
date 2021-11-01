export function getAppointmentsForDay(state, day) {
  let appointmentsForDayArray = [];
  const emptyArray = [];
  const lengthofStateDays = state.days.length;

  if (lengthofStateDays === 0) {
    return emptyArray;
  }

  const dayState = state.days.filter((obj) => obj.name === day);
  if (dayState[0] === undefined) {
    return emptyArray;
  }

  const dayAppointments = dayState[0].appointments;
  for (let appointment of dayAppointments) {
    for (let id in state.appointments) {
      if (parseInt(appointment) === parseInt(id)) {
        appointmentsForDayArray.push(state.appointments[id]);
      }
    }
  }

  return appointmentsForDayArray;
}

export function getInterview(state, interview) {
  const interviewObject = {};
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  interviewObject["student"] = interview.student;
  interviewObject["interviewer"] = state.interviewers[interviewerID];

  console.log(interviewObject);
  return interviewObject;
}
