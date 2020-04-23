// import covid19ImpactEstimator from '../src/estimator';
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region, 
  } = data;
  let factor;
  let period;

  if (periodType === 'days') {
    factor = Math.floor(timeToElapse / 3);
    period = timeToElapse;
  } else if (periodType === 'weeks') {
    factor = Math.floor((timeToElapse * 7) / 3);
    period = timeToElapse * 7;
  } else {
    factor = Math.floor((timeToElapse * 30) / 3);
    period = timeToElapse * 30;
  }
  // impact estimations
  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** factor);
  const casesByRequestedTime = Math.ceil(impactInfectionsByRequestedTime * 0.15);
  const totalBeds = Math.ceil(totalHospitalBeds * 0.35);
  const impactHospitalBedsByRequestedTime = Math.ceil(totalBeds - casesByRequestedTime);
  const impactCasesForICUByRequestedTime = Math.floor(impactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.floor(impactInfectionsByRequestedTime
                                                  * 0.02);
  const impactDollarsInFlight = Math.floor((impactInfectionsByRequestedTime
                                    * region.avgDailyIncomePopulation
                                    * region.avgDailyIncomeInUSD) / period);

  // severe impact estimations
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.ceil(severeImpactInfectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.ceil(totalBeds - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime
                                              * 0.02);
  const dollarsInFlight = Math.floor((severeImpactInfectionsByRequestedTime
                            * region.avgDailyIncomePopulation
                            * region.avgDailyIncomeInUSD) / period);


  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: casesByRequestedTime,
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight
  };

  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return {
    data,
    impact,
    severeImpact
  };
};

const form = document.querySelector('#form');
const population = document.querySelector('#population');
const timeToElapse = document.querySelector('#timeToElapse');
const reportedCases = document.querySelector('#reportedCases');
const totalHospitalBeds = document.querySelector('#totalHospitalBeds');
const periodType = document.querySelector('#periodType');

// Show input Error Message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
const showSuccess = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'; 
}

// check each of the field for success or error input
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    return (input.value.trim() === '') ?  
    showError(input, 'This Field is required') :
    showSuccess(input);
  })
};

const addValue = (e) => {
  e.preventDefault()

  const data = {
    region: {
      name: "Africa",
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
      },
    reportedCases: +reportedCases.value,
    timeToElapse: +timeToElapse.value,
    periodType: periodType.options[periodType.selectedIndex].value,
    totalHospitalBeds: +totalHospitalBeds.value,
    population: +population.value, 
  }

      console.log(covid19ImpactEstimator(data))
  checkRequired([population, timeToElapse, reportedCases, totalHospitalBeds, periodType]);
  
  reportedCases.value = ''
  timeToElapse.value = ''
  totalHospitalBeds.value = ''
  population.value = ''

}

form.addEventListener('submit', addValue)
