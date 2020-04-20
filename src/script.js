import covid19ImpactEstimator from './estimator'

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

}

form.addEventListener('submit', addValue)

module.exports = addValue;
