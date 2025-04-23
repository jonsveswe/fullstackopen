import { Entry, Diagnosis } from '../../types';

interface Props {
  entry: Entry
  diagnoses?: Diagnosis[]
}

const Hospital = (props: Props) => {
  const { entry, diagnoses } = props;
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px" }}>
      <h4>Hospital</h4>
      <div>{entry.date} {entry.description}</div>
      <br></br>
      {entry.diagnosisCodes?.map(c => <div key={c}>{c}: {diagnoses?.find(d => d.code === c)?.name}</div>)}
    </div>
  );
};
export default Hospital;