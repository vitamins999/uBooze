const axios = require('axios');

const apiKey = process.env.MAPBOX_API_KEY;

const getLongLatFromPostcode = async (postcode) => {
  const urlPostcode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?&access_token=${apiKey}&limit=1`;

  try {
    const { data } = await axios.get(urlPostcode);

    return data.features[0].center.toString();
  } catch (error) {
    throw new Error(
      `*** An error occured in getLongLatFromPostcode: ${error} ***`
    );
  }
};

const getSupermarketList = async (longlat) => {
  const urlSupermarkets = `https://api.mapbox.com/geocoding/v5/mapbox.places/supermarket.json?proximity=${longlat}&access_token=${apiKey}&limit=5`;

  try {
    const { data } = await axios.get(urlSupermarkets);

    // Create array of all supermarkets near postcode.
    const supermarkets = [];

    data.features.forEach((supermarket) => {
      supermarkets.push(supermarket.text);
    });

    // Create new array with supermarket names to check against DB that are currently supported.
    const supportedSupermarkets = [];

    if (supermarkets.includes('Waitrose & Partners')) {
      supportedSupermarkets.push('waitrose');
    }

    if (supermarkets.includes('Tesco Extra')) {
      supportedSupermarkets.push('tesco');
    }

    if (supermarkets.includes("Sainsbury's")) {
      supportedSupermarkets.push("sainsbury's");
    }

    return supportedSupermarkets;
  } catch (error) {
    throw new Error(`*** An error occured in getSupermarketList: ${error} ***`);
  }
};

const getSupermarkets = async (postcode) => {
  const longlat = await getLongLatFromPostcode(postcode);
  const supermarketsData = await getSupermarketList(longlat);

  return supermarketsData;
};

module.exports = {
  getSupermarkets,
};
