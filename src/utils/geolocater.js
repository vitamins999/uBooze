const axios = require('axios');

const apiKey = process.env.MAPBOX_API_KEY;
const foursquareAPIkey = process.env.FOURSQUARE_API_KEY;

const getLongLatFromPostcode = async (postcode) => {
  const urlPostcode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?&access_token=${apiKey}&limit=1`;

  try {
    const { data } = await axios.get(urlPostcode);

    return {
      long: data.features[0].center[0].toString(),
      lat: data.features[0].center[1].toString(),
    };
  } catch (error) {
    throw new Error(
      `*** An error occured in getLongLatFromPostcode: ${error} ***`
    );
  }
};

const getSupermarketList = async ({ long, lat }, radius) => {
  const urlSupermarkets = `https://api.foursquare.com/v3/places/search?ll=${lat},${long}&radius=${radius}&categories=17069&limit=50`;

  try {
    const { data } = await axios.get(urlSupermarkets, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: foursquareAPIkey,
      },
    });

    const supermarkets = [];

    data.results.forEach((supermarket) => {
      supermarkets.push(supermarket.name);
    });

    // Create new array with supermarket names to check against DB that are currently supported.
    const supportedSupermarkets = [];

    if (supermarkets.includes('Waitrose & Partners')) {
      supportedSupermarkets.push('waitrose');
    }

    if (supermarkets.includes('Tesco Extra')) {
      supportedSupermarkets.push('tesco');
    }

    if (
      supermarkets.includes("Sainsbury's") ||
      supermarkets.includes("Sainsbury's Local")
    ) {
      supportedSupermarkets.push("sainsbury's");
    }

    if (supermarkets.includes('Morrisons')) {
      supportedSupermarkets.push('morrisons');
    }

    if (supermarkets.includes('The Co-operative')) {
      supportedSupermarkets.push('co-op');
    }

    if (supermarkets.includes('Asda')) {
      supportedSupermarkets.push('asda');
    }

    return supportedSupermarkets;
  } catch (error) {
    console.log(error);
  }
};

const getSupermarketListMapBox = async (longlat) => {
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

const getSupermarkets = async (postcode, radius) => {
  const longlat = await getLongLatFromPostcode(postcode);
  const supermarketsData = await getSupermarketList(longlat, radius);

  return supermarketsData;
};

module.exports = {
  getSupermarkets,
  getLongLatFromPostcode,
};
