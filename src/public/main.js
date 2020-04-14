/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
/* eslint-disable linebreak-style */

// Form Validation and Alerts

const showAlert = (message) => {
  const div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('.form-container');
  container.insertBefore(div, form);

  // Set Timer
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Clear Form Fields

const clearFields = () => {
  document.querySelector('#population').value = '';
  document.querySelector('#timeToElapse').value = '';
  document.querySelector('#reportedCases').value = '';
  document.querySelector('#hospitalBeds').value = '';
  document.querySelector('#periodType').value = '';
};

// Handle the Form Submit

document.querySelector('#inputForm').addEventListener('submit', (e) => {
  // Prevent Default Submit Behaviour

  e.preventDefault();

  // Get Form Values
  const population = document.querySelector('#population').value;
  const timeToElapse = document.querySelector('#timeToElapse').value;
  const reportedCases = document.querySelector('#reportedCases').value;
  const totalHospitalBeds = document.querySelector('#hospitalBeds').value;
  const periodType = document.querySelector('#periodType').value;

  if (
    population === '' ||
    timeToElapse === '' ||
    reportedCases === '' ||
    totalHospitalBeds === '' ||
    periodType === ''
  ) {
    showAlert('Please fill All Fields');
  } else {
    // Object Literal Enhancement
    const data = {
      population,
      timeToElapse,
      reportedCases,
      totalHospitalBeds,
      periodType
    };

    // eslint-disable-next-line no-console
    console.log(data);
    clearFields();
  }
});
