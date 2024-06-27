const apiKey = "9u7AlKCcjzdkg9WJqhL/Bw==vzF3y5o9TKESppE1";
let airportLatitude = 0;
let airportLongitude = 0;
let map;
let marker;

const mapEl=document.getElementById("map");
mapEl.style.visibility="hidden";
//initialize default map
map = L.map("map").setView([39.1667, 35.6667], 6);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function getAirportData() {
    const airportName = document.getElementById("airportName").value.toLowerCase();

    if(airportName===""){
        window.alert("plz");
    }   

    const apiUrl = `https://api.api-ninjas.com/v1/airports?name=${airportName}`;

    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": apiKey,
        },
    };

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error("Could not fetch response");
        } else {
            mapEl.style.visibility="visible";
            const data = await response.json();
            airportLatitude = data[0].latitude;
            airportLongitude = data[0].longitude;
            // set location the user searched
            map.setView([airportLatitude, airportLongitude], 13);
            //check if there location already
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([airportLatitude, airportLongitude]).addTo(map);
            marker
                .bindPopup(
                    `<b>${airportName}</b><br>Latitude: ${airportLatitude}<br>Longitude: ${airportLongitude}`
                )
                .openPopup();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("fetchButton").addEventListener("click", getAirportData);


