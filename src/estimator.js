/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */
const covid19ImpactEstimator = (data) => {
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
      days = Math.trunc(timeToElapse);
      break;
    case 'weeks':
      days = Math.trunc(timeToElapse) * 7;
      break;
    case 'months':
      days = Math.trunc(timeToElapse) * 30;
      break;
    default:
      days = Math.trunc(timeToElapse);
      break;
  }

  const impact = (function impactValue() {
    /** Challenge 1 Impact */
    // Currently Infected
    const currentlyInfected = Math.trunc(reportedCases) * 10;

    // Number of Infected people in a duration of time
    let infectionsByRequestedTime = (function infectionPerTime() {
      const exponent = Math.trunc(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    infectionsByRequestedTime = Math.trunc(infectionsByRequestedTime);

    /** Challenge 2 Impact */
    // Severe Cases in a duration of time
    const severeCasesByRequestedTime = Math.trunc(
      0.15 * infectionsByRequestedTime
    );

    // Number of Available Beds
    let hospitalBedsByRequestedTime = (function availableBeds() {
      const bedsAvailable = Math.trunc(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    hospitalBedsByRequestedTime = Math.trunc(hospitalBedsByRequestedTime);

    /** Challenge 3 Impact */
    // Cases that require ICU
    const casesForICUByRequestedTime = Math.trunc(
      0.05 * infectionsByRequestedTime
    );

    // Cases that require Ventilators
    const casesForVentilatorsByRequestedTime = Math.trunc(
      0.02 * infectionsByRequestedTime
    );

    // Money Lost by the Economy Daily
    const dollarsInFlight = Math.trunc(
      Math.trunc(
        infectionsByRequestedTime *
          avgDailyIncomePopulation *
          avgDailyIncomeInUSD
      ) / days
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
  })();

  const severeImpact = (function severeImpactValue() {
    /** Challenge 1 Severe Impact */
    // Currently Infected
    const currentlyInfected = Math.trunc(reportedCases) * 50;

    // Number of Infected people in a duration of time
    let infectionsByRequestedTime = (function infectionPerTime() {
      const exponent = Math.trunc(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    infectionsByRequestedTime = Math.trunc(infectionsByRequestedTime);

    /** Challenge 2 Severe Impact */
    // Severe Cases in a duration of time
    const severeCasesByRequestedTime = Math.trunc(
      0.15 * infectionsByRequestedTime
    );

    // Number of Available Beds
    let hospitalBedsByRequestedTime = (function availableBeds() {
      const bedsAvailable = Math.trunc(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    hospitalBedsByRequestedTime = Math.trunc(hospitalBedsByRequestedTime);

    /** Challenge 3 Severe Impact */
    // Cases that require ICU
    const casesForICUByRequestedTime = Math.trunc(
      0.05 * infectionsByRequestedTime
    );

    // Cases that require Ventilators
    const casesForVentilatorsByRequestedTime = Math.trunc(
      0.02 * infectionsByRequestedTime
    );

    // Money Lost by the Economy Daily
    const dollarsInFlight = Math.trunc(
      Math.trunc(
        infectionsByRequestedTime *
          avgDailyIncomePopulation *
          avgDailyIncomeInUSD
      ) / days
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
  })();

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
