import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";


const PatientPage = () => {
  const id = useParams().id;
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id!);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);
  const [patient, setPatient] = useState<Patient>();
  if (!patient) {
    return null;
  }
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
