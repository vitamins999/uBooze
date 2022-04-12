// Chain IDs for Foursquare:
// Waitrose - 2fcb8360-9c63-0132-6632-3c15c2dde6c8
// Tesco - 2fc927c0-9c63-0132-6632-3c15c2dde6c8
// Sainsburys - 2fca29d0-9c63-0132-6632-3c15c2dde6c8
// Morrisons - 2fcc8920-9c63-0132-6632-3c15c2dde6c8
// Iceland - 2fcbdc20-9c63-0132-6632-3c15c2dde6c8
// Asda - 2fcb9270-9c63-0132-6632-3c15c2dde6c8

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
  // Comma seperated string of all Foursquare chain IDs for all UK supermarkets in app.  For each specific supermarket, see comment at the top of this file
  const chains =
    '2fcb8360-9c63-0132-6632-3c15c2dde6c8%2C2fc927c0-9c63-0132-6632-3c15c2dde6c8%2C2fca29d0-9c63-0132-6632-3c15c2dde6c8%2C2fcc8920-9c63-0132-6632-3c15c2dde6c8%2C2fcbdc20-9c63-0132-6632-3c15c2dde6c8%2C2fcb9270-9c63-0132-6632-3c15c2dde6c8';

  const urlSupermarkets = `https://api.foursquare.com/v3/places/search?ll=${lat},${long}&radius=${radius}&chains=${chains}&limit=50`;

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

    if (supermarkets.includes('Waitrose')) {
      supportedSupermarkets.push('waitrose');
    }

    if (
      supermarkets.includes('Tesco Extra') ||
      supermarkets.includes('Tesco Express')
    ) {
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

    if (supermarkets.includes('Iceland')) {
      supportedSupermarkets.push('iceland');
    }

    return supportedSupermarkets;
  } catch (error) {
    console.log(error);
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
