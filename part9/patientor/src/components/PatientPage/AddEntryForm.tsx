import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, Grid, SelectChangeEvent,  } from '@mui/material';
import { Diagnosis, Entry, EntryFormValues, HealthCheckRating } from '../../types';

export type AddEntryFormProps = {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
};

/* const diagnosisOptions = [
  { code: 'M24.2', name: 'Dislocation of joint' },
  { code: 'S03.5', name: 'Acute myocardial infarction' },
  { code: 'J10.1', name: 'Ulcer of stomach' },
  { code: 'Z57.1', name: 'Unspecified injury of intestine' },
  { code: 'N30.0', name: 'Acute cystitis' },
  { code: 'H54.7', name: 'Unspecified osteomyelitis' },
  { code: 'J06.9', name: 'Acute bronchitis, unspecified' },
  { code: 'L60.1', name: 'Onchocerciasis' },
  { code: 'Z93.8', name: 'Other specified infectious and parasitic diseases' },
  { code: 'L60.9', name: 'Onchocerciasis, unspecified' },
]; */

const diagnosisOptions = [
  'M24.2',
  'S03.5',
  'J10.1',
  'Z57.1',
  'N30.0',
  'H54.7',
  'J06.9',
  'L60.1',
  'Z93.8',
  'L60.9',
];

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]); // Diagnosis['code'][] = Array<Diagnosis['code']> = string[]
  const [type, setType] = useState<Entry['type']>('HealthCheck');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | undefined>(undefined);
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<{ startDate: string, endDate: string } | undefined>(undefined);
  const [discharge, setDischarge] = useState<{ date: string, criteria: string } | undefined>(undefined);

  const handleTypeChange = (event: SelectChangeEvent<Entry['type']>) => {
    setType(event.target.value as Entry['type']);
  };

  const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHealthCheckRating(parseInt(event.target.value));
  };

  const handleSickLeaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!sickLeave) {
      setSickLeave({ startDate: '', endDate: '' });
    } else if (event.target.name === 'startDate') {
      setSickLeave({ ...sickLeave, startDate: event.target.value });
    } else {
      setSickLeave({ ...sickLeave, endDate: event.target.value });
    }
  };

  const handleDischargeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!discharge) {
      setDischarge({ date: '', criteria: '' });
    } else if (event.target.name === 'date') {
      setDischarge({ ...discharge, date: event.target.value });
    } else {
      setDischarge({ ...discharge, criteria: event.target.value });
    }
  };

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const selectedCodes = event.target.value;
    setDiagnosisCodes(selectedCodes as typeof diagnosisCodes);
    console.log(diagnosisCodes);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (type) {
      case 'HealthCheck':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type: 'HealthCheck',
          healthCheckRating: healthCheckRating!,
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave,
        });
        break;
      case 'Hospital':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          type: 'Hospital',
          discharge: discharge!,
        });
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            label="DiagnosisCode"
            fullWidth
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodeChange}
          >
            {diagnosisOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            label="Type"
            fullWidth
            value={type}
            onChange={handleTypeChange}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          </Select>
        </Grid>
        {type === 'HealthCheck' && (
          <Grid item xs={12}>
            <TextField
              label="Health check rating"
              type="number"
              fullWidth
              value={healthCheckRating}
              onChange={handleHealthCheckRatingChange}
            />
          </Grid>
        )}
        {type === 'OccupationalHealthcare' && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sick leave start date"
                type="date"
                fullWidth
                value={sickLeave?.startDate}
                onChange={handleSickLeaveChange}
                name="startDate"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sick leave end date"
                type="date"
                fullWidth
                value={sickLeave?.endDate}
                onChange={handleSickLeaveChange}
                name="endDate"
              />
            </Grid>
          </>
        )}
        {type === 'Hospital' && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discharge date"
                type="date"
                fullWidth
                value={discharge?.date}
                onChange={handleDischargeChange}
                name="date"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discharge criteria"
                fullWidth
                value={discharge?.criteria}
                onChange={handleDischargeChange}
                name="criteria"
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={onCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
