window.addEventListener('load', function () {
  function setup() {
    const faultyItems = document.getElementById('faultyItems');

    faultyItems.style.visibility = 'hidden';
  }

  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      let {
        name,
        diameter,
        star,
        distance,
        moons,
        image: imageUrl,
      } = pickPlanet(listedPlanets);
      addDestinationInfo(
        document,
        name,
        diameter,
        star,
        distance,
        moons,
        imageUrl
      );
    });

  const testForm = document
    .getElementById('launchForm')
    .getElementsByTagName('form')[0];
  testForm.onsubmit = event => {
    event.preventDefault();
    let getValue = name => document.querySelector(`input[name=${name}]`).value;
    formSubmission(
      document,
      document.getElementById('faultyItems'),
      getValue('pilotName'),
      getValue('copilotName'),
      getValue('fuelLevel'),
      getValue('cargoMass')
    );
  };

  setup();
});
