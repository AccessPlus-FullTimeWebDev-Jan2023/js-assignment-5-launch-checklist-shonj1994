
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}  </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">`

}

function validateInput(testInput) {
    if(testInput === ""){
        return "Empty";
    } else if(isNaN(testInput) === true){
        return "Not a Number";
    } else if(isNaN(testInput) === false){
        return "Is a Number";
    }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  if(validateInput(pilot) === "Empty" ||
  validateInput(copilot) === 'Empty'||
  validateInput(fuelLevel) === 'Empty'||
  validateInput(cargoMass) === 'Empty'){
    alert("All fields required.");
  }
  else if(validateInput(pilot) === "Is a Number" ||
  validateInput(copilot) === "Is a Number" || 
  validateInput(fuelLevel) === "Not a Number" ||
  validateInput(cargoMass)=== "Not a Number") {
    alert("Make sure to enter valid information for each field!");
  }
    else {
       // alert("test my else.");
    document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`
    document.getElementById("copilotStatus").textContent = `Co-Pilot ${copilot} is ready for launch`
    
    if(Number(fuelLevel) < 10000){
    list.style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML = 'Fuel level too low for launch';
    document.getElementById("launchStatus").innerHTML = 'Shuttle Not Ready for Launch'
    document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)";
} else {
    document.getElementById("fuelStatus").innerHTML = 'Fuel level high enough for launch'
}
if(Number(cargoMass)> 10000){
    list.style.visibility = "visible";
    document.getElementById('cargoStatus').innerHTML = `Cargo mass too heavy for launch`;
    document.getElementById('launchStatus').innerHTML = 'Shuttle Not Ready for Launch'
    document.getElementById('launchStatus').style.color = "rgb(199,37,78)";
} else{
    document.getElementById('cargoStatus').innerHTML = 'Cargo mass low enough for launch';
}
if(Number(cargoMass) <= 10000 && Number(fuelLevel) >= 10000){
    list.style.visibility = "visible";
    document.getElementById('fuelStatus').innerHTML = 'Fuel level high enough for launch';
    document.getElementById('cargoStatus').innerHTML = 'Cargo mass low enough for launch';
    document.getElementById('launchStatus').innerHTML = 'Shuttle is ready for Launch';
    document.getElementById('launchStatus').style.color = "rgb(65, 159, 106";
    }
  }
};

async function myFetch() {
    let planetsReturned;

     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
     return response.json();
    });

     return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    console.log(planets[index]);
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
