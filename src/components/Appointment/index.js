import React from "react";
import "../Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "Saving";
const DELETING = "Deleting";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  }

  function remove() {
    const interview = {
      student: null,
      interviewer: null,
    };
    transition(DELETING);
    cancelInterview(id, interview).then(() => {
      transition(EMPTY);
    });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CONFIRM && (
        <Confirm message={CONFIRM} onCancel={() => back()} onConfirm={remove} />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={confirmDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
}
