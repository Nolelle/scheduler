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

export function getInterviewersForDay(state, day) {
  let interviewersForDayArray = [];
  const emptyArray = [];
  const lengthofStateDays = state.days.length;

  if (lengthofStateDays === 0) {
    return emptyArray;
  }

  const dayState = state.days.filter((obj) => obj.name === day);
  if (dayState[0] === undefined) {
    return emptyArray;
  }

  const dayInterviewers = dayState[0].interviewers;
  for (let interviewer of dayInterviewers) {
    for (let id in state.interviewers) {
      if (parseInt(interviewer) === parseInt(id)) {
        interviewersForDayArray.push(state.interviewers[id]);
      }
    }
  }
  // console.log(interviewersForDayArray);
  return interviewersForDayArray;
}

export function getInterview(state, interview) {
  const interviewObject = {};
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  interviewObject["student"] = interview.student;
  interviewObject["interviewer"] = state.interviewers[interviewerID];

  return interviewObject;
}
