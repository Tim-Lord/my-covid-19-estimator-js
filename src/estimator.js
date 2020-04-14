/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */

const makeWholeNumber = (num) => {
  const str = String(num);
  if (str.indexOf('.') < 0) {
    return Number(str);
  }
  return Number(str.slice(0, str.indexOf('.')));
};

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
      days = makeWholeNumber(timeToElapse);
      break;
    case 'weeks':
      days = makeWholeNumber(timeToElapse) * 7;
      break;
    case 'months':
      days = makeWholeNumber(timeToElapse) * 30;
      break;
    default:
      days = makeWholeNumber(timeToElapse);
      break;
  }

  const impact = (function impactValue() {
    /** Challenge 1 Impact */
    // Currently Infected
    const currentlyInfected = makeWholeNumber(reportedCases) * 10;

    // Number of Infected people in a duration of time
    let infectionsByRequestedTime = (function infectionPerTime() {
      const exponent = makeWholeNumber(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    infectionsByRequestedTime = makeWholeNumber(infectionsByRequestedTime);

    /** Challenge 2 Impact */
    // Severe Cases in a duration of time
    const severeCasesByRequestedTime = makeWholeNumber(
      0.15 * infectionsByRequestedTime
    );

    // Number of Available Beds
    let hospitalBedsByRequestedTime = (function availableBeds() {
      const bedsAvailable = makeWholeNumber(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    hospitalBedsByRequestedTime = makeWholeNumber(hospitalBedsByRequestedTime);

    /** Challenge 3 Impact */
    // Cases that require ICU
    const casesForICUByRequestedTime = makeWholeNumber(
      0.05 * infectionsByRequestedTime
    );

    // Cases that require Ventilators
    const casesForVentilatorsByRequestedTime = makeWholeNumber(
      0.02 * infectionsByRequestedTime
    );

    // Money Lost by the Economy Daily
    const dollarsInFlight = makeWholeNumber(
      makeWholeNumber(
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
    const currentlyInfected = makeWholeNumber(reportedCases) * 50;

    // Number of Infected people in a duration of time
    let infectionsByRequestedTime = (function infectionPerTime() {
      const exponent = makeWholeNumber(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    infectionsByRequestedTime = makeWholeNumber(infectionsByRequestedTime);

    /** Challenge 2 Severe Impact */
    // Severe Cases in a duration of time
    const severeCasesByRequestedTime = makeWholeNumber(
      0.15 * infectionsByRequestedTime
    );

    // Number of Available Beds
    let hospitalBedsByRequestedTime = (function availableBeds() {
      const bedsAvailable = makeWholeNumber(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    hospitalBedsByRequestedTime = makeWholeNumber(hospitalBedsByRequestedTime);

    /** Challenge 3 Severe Impact */
    // Cases that require ICU
    const casesForICUByRequestedTime = makeWholeNumber(
      0.05 * infectionsByRequestedTime
    );

    // Cases that require Ventilators
    const casesForVentilatorsByRequestedTime = makeWholeNumber(
      0.02 * infectionsByRequestedTime
    );

    // Money Lost by the Economy Daily
    const dollarsInFlight = makeWholeNumber(
      makeWholeNumber(
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
