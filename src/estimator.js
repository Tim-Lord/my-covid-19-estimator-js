import estimator from './covidEstimator';

const covid19ImpactEstimator = (data) => {
  // Initialise the function
  const value = estimator(data);

  // Get values for the Impact
  const impact = value.impact();

  // Get values for Severe Impact
  const severeImpact = value.severeImpact();

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
