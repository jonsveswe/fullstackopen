import { useParams } from "react-router-dom";
import { Patient, Diagnosis, Entry, EntryFormValues } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import AddEntryForm from "./AddEntryForm";
import axios from "axios";
import { Alert } from "@mui/material";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const EntryDetails: React.FC<{ entry: Entry, diagnoses?: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital key={entry.id} entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      // Type narrowing makes it so that the entry is of type HealthCheckEntry and we can do entry.healthCheckRating. 
      // We can't do entry.healthCheckRating inside HealthCheck component because the type narrowing done here is not "transferred" to HealthCheck component.
      return <HealthCheck key={entry.id} entry={entry} diagnoses={diagnoses} rating={entry.healthCheckRating}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare key={entry.id} entry={entry} diagnoses={diagnoses}/>;
    default:
      // "exhaustive type checking" so that no cases can be forgotten
      return assertNever(entry);
  }
};
interface Props {
  diagnoses: Diagnosis[]
}
const PatientPage = (props : Props) => {
  const { diagnoses } = props;
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const id = useParams().id;
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id!);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);
  
  if (!patient) {
    return null;
  }

  const submitNewEntry = async (entryFormValues: EntryFormValues) => {
    setError(undefined);
    try {
      await patientService.createEntry(entryFormValues, id!);
      const updatedPatient = await patientService.getOne(id!);
      setPatient(updatedPatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <>  
      <h2>PatientPage</h2>
      <div>{patient?.name}</div>
      <div>{patient?.ssn}</div>
      <div>{patient?.occupation}</div>
      <div>{patient?.gender}</div>
      <div>{patient?.dateOfBirth}</div>
      <h3>Form</h3>
      {error && <Alert severity="error" onClose={() => {setError(undefined);}}>{error}</Alert>}
      <AddEntryForm onSubmit={submitNewEntry} onCancel={() => {}} />
      <h3>Entries</h3>
      {patient?.entries.map(e => EntryDetails({ entry: e, diagnoses }))}
    </>
  );

  /* return (
    <>  
      <div>PatientPage</div>
      <div>{patient?.name}</div>
      <div>{patient?.ssn}</div>
      <div>{patient?.occupation}</div>
      <div>{patient?.gender}</div>
      <div>{patient?.dateOfBirth}</div>
      <h3>Entries</h3>
      {patient?.entries.map(e => {
        return (
          <div key={e.id}>
            <div>{e.date} {e.description}</div>
            <br></br>
            {e.diagnosisCodes?.map(c => <div key={c}>{c}: {diagnoses?.find(d => d.code === c)?.name}</div>)}
          </div>
        );
      })}
    </>
  ); */
};

/* 
interface Props {
  patients : Patient[]
}

const PatientPage = (props: Props) => {
  const { patients } = props;
  const id = useParams().id;
  const patient = patients.find(p => p.id === id);
  return (
    <>  
      <div>PatientPage</div>
      <div>{patient?.name}</div>
      <div>{patient?.ssn}</div>
      <div>{patient?.occupation}</div>
      <div>{patient?.gender}</div>
      <div>{patient?.dateOfBirth}</div>
    </>
  );
}; */

export default PatientPage;
