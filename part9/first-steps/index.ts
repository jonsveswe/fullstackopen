import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

// If it is absolutely impossible to get rid of an unused variable, 
// you can prefix it with an underscore to inform the compiler you have thought about it and there is nothing you can do.
app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// http://localhost:3003/bmi?height=180&weight=72
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmiString = calculateBmi(height, weight);
  res.send({ weight, height, bmiString });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyHours, target } = req.body;

  if (!dailyHours || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  
  // daylyHours is an array. An array has typeof === 'object'.
  if (typeof dailyHours !== 'object' || typeof target !== 'number') {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  // Type assertion
  const result = calculateExercises(dailyHours as number[], target as number);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});