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
  const missionTarget = document.getElementById('missionTarget');
  missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name} </li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
  `;
}

function validateInput(testInput) {
  if (testInput === '') return 'Empty';
  testInput = Number(testInput);
  if (isNaN(testInput)) return 'Not a Number';
  return 'Is a Number';
}

function windowAlert(message) {
  if (typeof window !== 'undefined') window.alert(message);
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  const launchStatus = document.getElementById('launchStatus');
  const pilotStatus = document.getElementById('pilotStatus');
  const copilotStatus = document.getElementById('copilotStatus');
  const fuelStatus = document.getElementById('fuelStatus');
  const cargotStatus = document.getElementById('cargoStatus');
  let readyForLaunch = true;
  let emptyFields = [];

  if (validateInput(pilot) !== 'Empty') {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  } else {
    emptyFields.push('Pilot');
    readyForLaunch = false;
    pilotStatus.innerHTML = 'Not Ready';
  }

  if (validateInput(copilot) !== 'Empty') {
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
  } else {
    emptyFields.push('Co-Pilot');
    readyForLaunch = false;
    copilotStatus.innerHTML = 'Not Ready';
  }

  if (validateInput(fuelLevel) === 'Is a Number') {
    if (Number(fuelLevel) < 10_000) {
      readyForLaunch = false;
      fuelStatus.innerHTML = 'Fuel level too low for launch';
    } else fuelStatus.innerHTML = 'Fuel level high enough for launch';
  } else if (validateInput(fuelLevel) === 'Empty') {
    readyForLaunch = false;
    emptyFields.push('Fuel');
  } else
    windowAlert(
      `Fuel level input must be a valid number: invalid input = ${fuelLevel}`
    );

  if (validateInput(cargoLevel) === 'Is a Number') {
    if (Number(cargoLevel) > 10_000) {
      readyForLaunch = false;
      cargotStatus.innerHTML = 'Cargo mass too heavy for launch';
    } else cargotStatus.innerHTML = 'Cargo mass low enough for launch';
  } else if (validateInput(cargoLevel) === 'Empty') {
    emptyFields.push('Cargo');
    readyForLaunch = false;
  } else
    windowAlert(
      `Cargo level input must be a valid number: wrong input = ${cargoLevel}`
    );

  list.style.visibility = 'visible';
  if (!readyForLaunch) {
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)';
    // check for empty inputs
    if (emptyFields.length > 0)
      windowAlert(
        `All fields are required, the following data is missing: \n- ${emptyFields.join(
          '\n- '
        )}`
      );
  } else {
    launchStatus.innerHTML = 'Shuttle is Ready for Launch';
    launchStatus.style.color = 'rgb(65, 159, 106)';
  }
}

async function myFetch() {
  let planetsReturned;
  planetsReturned = await fetch(
    'https://handlers.education.launchcode.org/static/planets.json'
  ).then(response => response.json());
  return planetsReturned;
}

function pickPlanet(planets) {
  let randomIndex = Math.floor(Math.random() * (planets.length + 1));
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
