import axios, { AxiosResponse } from 'axios';

const apiKey: string | undefined = process.env.MAPBOX_API_KEY;

interface SupermarketDetails {
  name: string;
  address: string;
}

const getLongLatFromPostcode = async (postcode: string): Promise<string> => {
  const urlPostcode: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?&access_token=${apiKey}&limit=1`;

  try {
    const { data }: AxiosResponse = await axios.get(urlPostcode);

    return data.features[0].center.toString();
  } catch (error) {
    throw new Error(
      `*** An error occured in getLongLatFromPostcode: ${error} ***`
    );
  }
};

const getSupermarketList = async (
  longlat: string
): Promise<Array<SupermarketDetails>> => {
  const urlSupermarkets: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/supermarket.json?proximity=${longlat}&access_token=${apiKey}&limit=5`;

  try {
    const { data }: AxiosResponse = await axios.get(urlSupermarkets);

    const supermarkets: SupermarketDetails[] = [];

    data.features.forEach((supermarket: any) => {
      supermarkets.push({
        name: supermarket.text,
        address: supermarket.place_name,
      });
    });

    return supermarkets;
  } catch (error) {
    throw new Error(`*** An error occured in getSupermarketList: ${error} ***`);
  }
};

const getSupermarkets = async (
  postcode: string
): Promise<Array<SupermarketDetails>> => {
  const longlat: string = await getLongLatFromPostcode(postcode);
  const supermarketsData: SupermarketDetails[] = await getSupermarketList(
    longlat
  );

  return supermarketsData;
};

module.exports = {
  getSupermarkets,
};
