// Capitalise first letter
export const capitaliseFirstLetter = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

// Creates a query string of an array supermarkets array, to be sent to the API.
export const createQueryString = (supermarketList) => {
  const data = supermarketList.map((supermarket) => {
    const capitalisedSupermarket = capitaliseFirstLetter(supermarket);
    return `&supermarkets=${capitalisedSupermarket}`;
  });
  return data.join('');
};

// Convert price from integer to GBP.
export const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

// Return the relevant supermarket logo SVG for an image string.
export const supermarketLogo = (supermarket) => {
  if (supermarket === 'Waitrose') {
    return '/waitrose_logo.svg';
  } else if (supermarket === "Sainsbury's") {
    return '/sainsburys_logo.svg';
  } else if (supermarket === 'Tesco') {
    return '/tesco_logo.svg';
  } else if (supermarket === 'Asda') {
    return '/asda_logo.svg';
  } else if (supermarket === 'Morrisons') {
    return '/morrisons_logo.svg';
  } else if (supermarket === 'Co-op') {
    return '/coop_logo.svg';
  } else if (supermarket === 'Iceland') {
    return '/iceland_logo.svg';
  }
};

export const subtypeFormat = (subtype) => {
  if (
    subtype === 'beer low alcohol' ||
    subtype === 'wine low alcohol' ||
    subtype === 'spirits low alcohol'
  ) {
    return 'Low Alcohol';
  } else if (subtype === 'fortified and vermouth') {
    return 'Fortified';
  } else if (subtype === 'brandy and cognac') {
    return 'Brandy & Cognac';
  } else if (subtype === 'tequila and liqueurs') {
    return 'Tequila & Liqueurs';
  } else {
    return capitaliseFirstLetter(subtype);
  }
};
