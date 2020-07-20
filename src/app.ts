const { getSupermarkets } = require('./utils/geolocater');

const main = async (): Promise<void> => {
  console.log(await getSupermarkets('SS93AE'));
};

main();
