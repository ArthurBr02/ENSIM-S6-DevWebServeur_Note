const axios = require("axios");

const findLocalisationByAddress = async (address) => {
    address.street = address.street.replace(" ", "+");
    address.city = address.city.replace(" ", "+");
    address.postalCode = address.postalCode.replace(" ", "+");
    return await axios.get(`https://nominatim.openstreetmap.org/search.php?street=${address.street}&city=${address.city}&postalcode=${address.postalCode}&format=jsonv2`)
        .then((response) => {
            return response.data;
        });
}

module.exports = {
    findLocalisationByAddress
}