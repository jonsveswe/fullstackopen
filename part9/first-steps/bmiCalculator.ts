interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

/* To remember: all code in a file will run when the file/module is imported. */

// This will print when the module is imported
console.log('inside file bmiCalculator.ts');

// This will not run when the module is imported, only if the file is run directly from cli, like "npm run calculateBmi 180 75".
if(require.main === module) {
  try {
    console.log('inside try');
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
