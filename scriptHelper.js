// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
  if (testInput === '') return 'Empty';
  testInput = Number(testInput);
  if (isNan(testInput)) return 'Not a Number';
  return 'Is a Number';
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  const faultyItems = document.getElementById('faultyItems');
  const launchStatus = document.getElementById('launchStatus');
  const pilotStatus = document.getElementById('pilotStatus');
  const copilotStatus = document.getElementById('copilotStatus');
  const fuelStatus = document.getElementById('fuelStatus');
  const cargotStatus = document.getElementById('cargoStatus');
  let readyForLaunch = true;

  if (validateInput(fuelLevel) === 'Is a Number' && Number(fuelLevel.value)) {
    readyForLaunch = false;
    fuelStatus.innerText = 'Not enough fuel for the journey.';
  }
  if (
    validateInput(cargoLevel) === 'Is a Number' &&
    Number(cargoLevel > 10_000)
  ) {
    readyForLaunch = false;
    cargotStatus.innerText = 'Too much mass for the shuttle to take off.';
  }
  if (validateInput(pilot) !== 'Empty' || validateInput(copilot) !== 'Empty') {
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch().then(function (response) {});

  return planetsReturned;
}

function pickPlanet(planets) {}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
