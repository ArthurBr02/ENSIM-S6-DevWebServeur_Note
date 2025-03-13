const axios = require("axios");

const findLocalisationByAddress = async (address) => {
    const OSM_URL = process.env.OSM_URL;
    address.street = address.street.replace(" ", "+");
    address.city = address.city.replace(" ", "+");
    address.postalCode = address.postalCode.replace(" ", "+");
    return await axios.get(OSM_URL.replace("{street}", address.street).replace("{city}", address.city).replace("{postalCode}", address.postalCode))
        .then((response) => {
            return response.data;
        });
}

const isNear = (geo1, geo2, distanceMaxKm = 10) => {
    if (geo1 === undefined || geo2 === undefined) {
        return false;
    }

    // On regarde si le point est à moins d'1 km
    let distance = distanceHaversine(Number(geo1.lat), Number(geo1.lon), Number(geo2.lat), Number(geo2.lon));
    return distance < distanceMaxKm;
}

function distanceHaversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en kilomètres
}

function deg2rad(deg) {
    return deg * (Math.PI / 57.29577951);
}

module.exports = {
    findLocalisationByAddress,
    isNear
}