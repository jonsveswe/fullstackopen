interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hour => hour > 0).length;
  const totalHours = dailyHours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job! You reached your goal.";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not bad, but there's room for improvement.";
  } else {
    rating = 1;
    ratingDescription = "You need to exercise more to reach your goal.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

/* // Example usage:
const dailyHours = [3, 0, 2, 4.5, 0, 3, 1]; // A week's exercise data
const target = 2; // Target daily exercise hours
console.log(calculateExercises(dailyHours, target)); */