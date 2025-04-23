import { Entry, Diagnosis } from '../../types';

interface Props {
  entry: Entry
  rating: number
  diagnoses?: Diagnosis[]
}

const HealthCheck = (props: Props) => {
  const { entry, diagnoses, rating } = props;
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      <h4>HealthCheck</h4>
      <div>{entry.date} {entry.description}</div>
      <div>health rating: {rating}</div>
      <br></br>
      {entry.diagnosisCodes?.map(c => <div key={c}>{c}: {diagnoses?.find(d => d.code === c)?.name}</div>)}
    </div>
  );
};
export default HealthCheck;