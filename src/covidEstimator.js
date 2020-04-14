/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */
/* eslint-disable radix */
/* eslint-disable object-curly-newline */
function estimator(data) {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  let days;

  switch (periodType) {
    case 'days':
      days = timeToElapse;
      break;
    case 'weeks':
      days = timeToElapse * 7;
      break;
    case 'months':
      days = timeToElapse * 30;
      break;
    default:
      days = timeToElapse;
  }

  const impact = function impactEstimator() {
    // Challenge 1 Impact
    const currentlyInfected = parseInt(reportedCases * 10);

    const infectionsByRequestedTime = (function infectionsPerTime() {
      const exponent = parseInt(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    // Challenge 2 Impact

    const severeCasesByRequestedTime = parseInt(
      0.15 * infectionsByRequestedTime
    );

    const hospitalBedsByRequestedTime = (function hospitalBeds() {
      const bedsAvailable = parseInt(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    // Challenge 3 Impact

    const casesForICUByRequestedTime = parseInt(
      0.05 * infectionsByRequestedTime
    );

    const casesForVentilatorsByRequestedTime = parseInt(
      0.02 * infectionsByRequestedTime
    );

    const dollarsInFlight = parseInt(
      (infectionsByRequestedTime *
        avgDailyIncomePopulation *
        avgDailyIncomeInUSD) /
        days
    );

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  const severeImpact = function severeImpactEstimator() {
    // Challenge 1 Severe Impact
    const currentlyInfected = parseInt(reportedCases * 50);

    const infectionsByRequestedTime = (function infectionsPerTime() {
      const exponent = parseInt(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    // Challenge 2 Severe Impact
    const severeCasesByRequestedTime = parseInt(
      0.15 * infectionsByRequestedTime
    );

    const hospitalBedsByRequestedTime = (function hospitalBeds() {
      const bedsAvailable = parseInt(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    // Challenge 3 Severe Impact
    const casesForICUByRequestedTime = parseInt(
      0.05 * infectionsByRequestedTime
    );

    const casesForVentilatorsByRequestedTime = parseInt(
      0.02 * infectionsByRequestedTime
    );

    const dollarsInFlight = parseInt(
      (infectionsByRequestedTime *
        avgDailyIncomePopulation *
        avgDailyIncomeInUSD) /
        days
    );

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  return {
    impact,
    severeImpact
  };
}

export default estimator;
