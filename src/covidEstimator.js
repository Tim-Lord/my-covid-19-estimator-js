/* eslint-disable prefer-const */
/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */
/* eslint-disable radix */
/* eslint-disable object-curly-newline */

const makeWholeNumber = (num) => {
  const str = String(num);
  if (str.indexOf('.') < 0) {
    return Number(str);
  }
  return Number(str.slice(0, str.indexOf('.')));
};

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

  const impact = () => {
    // Challenge 1 Impact
    const currentlyInfected = makeWholeNumber(reportedCases) * 10;

    let infectionsByRequestedTime = (function infectionsPerTime() {
      const exponent = makeWholeNumber(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    infectionsByRequestedTime = makeWholeNumber(infectionsByRequestedTime);

    // Challenge 2 Impact

    const severeCasesByRequestedTime = makeWholeNumber(
      0.15 * infectionsByRequestedTime
    );

    const hospitalBedsByRequestedTime = (function hospitalBeds() {
      const bedsAvailable = makeWholeNumber(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    // Challenge 3 Impact

    const casesForICUByRequestedTime = makeWholeNumber(
      0.05 * infectionsByRequestedTime
    );

    const casesForVentilatorsByRequestedTime = makeWholeNumber(
      0.02 * infectionsByRequestedTime
    );

    const dollarsInFlight = makeWholeNumber(
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

  const severeImpact = () => {
    // Challenge 1 Severe Impact
    const currentlyInfected = Math.trunc(reportedCases) * 50;

    const infectionsByRequestedTime = (function infectionsPerTime() {
      const exponent = Math.trunc(days / 3);
      return currentlyInfected * 2 ** exponent;
    })();

    // Challenge 2 Severe Impact
    const severeCasesByRequestedTime = Math.trunc(
      0.15 * infectionsByRequestedTime
    );

    const hospitalBedsByRequestedTime = (function hospitalBeds() {
      const bedsAvailable = Math.trunc(0.35 * totalHospitalBeds);
      return bedsAvailable - severeCasesByRequestedTime;
    })();

    // Challenge 3 Severe Impact
    const casesForICUByRequestedTime = Math.trunc(
      0.05 * infectionsByRequestedTime
    );

    const casesForVentilatorsByRequestedTime = Math.trunc(
      0.02 * infectionsByRequestedTime
    );

    const dollarsInFlight = Math.trunc(
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
