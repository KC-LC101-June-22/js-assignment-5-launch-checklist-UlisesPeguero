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

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
	const launchStatus = document.getElementById('launchStatus');
	const pilotStatus = document.getElementById('pilotStatus');
	const copilotStatus = document.getElementById('copilotStatus');
	const fuelStatus = document.getElementById('fuelStatus');
	const cargotStatus = document.getElementById('cargoStatus');
	let readyForLaunch = true;

	if (validateInput(pilot) !== 'Empty') {
		pilotStatus.innerText = `Pilot ${pilot} is ready for launch`;
	} else {
		readyForLaunch = false;
		pilotStatus.innerText = 'Not Ready';
	}

	if (validateInput(copilot) !== 'Empty') {
		copilotStatus.innerText = `Copilot ${copilot} is ready for launch`;
	} else {
		readyForLaunch = false;
		copilotStatus.innerText = 'Not Ready';
	}
	if (
		validateInput(fuelLevel) === 'Is a Number' &&
		Number(fuelLevel) < 10_000
	) {
		readyForLaunch = false;
		fuelStatus.innerText = 'Not enough fuel for the journey.';
	}
	if (
		validateInput(cargoLevel) === 'Is a Number' &&
		Number(cargoLevel) > 10_000
	) {
		readyForLaunch = false;
		cargotStatus.innerText = 'Too much mass for the shuttle to take off.';
	}

	if (!readyForLaunch) {
		list.style.visibility = 'visible';
		launchStatus.innerText = 'Shuttle is not ready for launch';
		launchStatus.style.color = 'rgb(199, 37, 78)';
	} else {
		list.style.visibility = 'hidden';
		launchStatus.innerText = 'Shuttle is ready for launch';
		launchStatus.style.color = 'green';
	}
}

async function myFetch() {
	let planetsReturned;
	planetsReturned = await fetch(
		'https://handlers.education.launchcode.org/static/planets.json'
	).then((response) => response.json());
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
