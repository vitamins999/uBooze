const supermarketBaseData = [
  {
    productName: 'Stella Artois Premium Lager Beer Cans 18x440ml',
    price: 1600,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/stella-artois-premium-lager-beer-cans-18x440ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/20/5010017109820/5010017109820_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 7,
  },
  {
    productName: 'Budweiser Lager Beer Bottles 15x300ml',
    price: 1200,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/budweiser-lager-15x300ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/17/5014379004717/5014379004717_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 2,
  },
  {
    productName: 'Peroni Nastro Azzurro Lager 12x330ml',
    price: 1650,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/peroni-nastro-azzuro-12x330ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/16/8008440122216/8008440122216_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 8,
  },
  {
    productName: 'Stella Artois Premium Lager Beer Bottles 15x284ml',
    price: 1000,
    offer: 'Only £10.00: Save £1.00',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/stella-artois-15x284ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/99/5010017109899/5010017109899_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 9,
  },
  {
    productName: 'San Miguel Especial Premium Lager Bottles 4x330ml',
    price: 475,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/san-miguel-premium-lager-4x330ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/77/5010153771677/5010153771677_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 1,
  },
  {
    productName: 'Birra Moretti Lager Beer Bottles 12 x 330ml',
    price: 1400,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/birra-moretti-12x330ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/78/5035766062578/5035766062578_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 10,
  },
  {
    productName: 'Carling Original Lager 18x440ml',
    price: 1300,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/carling-lager-18x440ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/52/5010038444252/5010038444252_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 13,
  },
  {
    productName: 'Desperados Tequila Lager Beer Bottles 12 x 250ml',
    price: 1200,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/world-beer/desperados-tequila-lager-12x250ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/37/8712000039837/8712000039837_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 15,
  },
  {
    productName: 'Classic Ales Mixed Pack x6 500ml',
    price: 950,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/ale-stout/classic-ales-mixed-pack-x6-500ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/15/5011348011615/5011348011615_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: "Sainsbury's",
    productID: 17,
  },
  {
    productName: 'Ghost Ship Pale Ale 500ml',
    price: 165,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/ale-stout/ghost-ship-500ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/35/5016878010435/5016878010435_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: "Sainsbury's",
    productID: 19,
  },
  {
    productName: 'Badger Golden Champion 500ml',
    price: 180,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/ale-stout/badger-golden-champion-500ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/10/5010548005110/5010548005110_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: "Sainsbury's",
    productID: 20,
  },
  {
    productName: 'Wychwood Hobgoblin Gold Ale 500ml',
    price: 125,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/ale-stout/wychwood-hobgoblin-gold-500ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/94/5011348015194/5011348015194_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: "Sainsbury's",
    productID: 22,
  },
  {
    productName: 'Badger Hopping Hare Ale 500ml',
    price: 180,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/ale-stout/badger-hopping-hare-500ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/11/5010548002911/5010548002911_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: "Sainsbury's",
    productID: 23,
  },
  {
    productName: 'Blossom Hill Red 75cl',
    price: 500,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-red-wine/blossom-hill-red-75cl',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/81/5060078183581/5060078183581_L.jpeg',
    drinkType: 'wine',
    drinkSubtype: 'red',
    supermarket: "Sainsbury's",
    productID: 3,
  },
  {
    productName: "Gordon's London Dry Gin 1L",
    price: 1700,
    offer: 'Only £17.00: Save £3.50',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/gin/gordons-dry-gin-1l',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/08/5000289110808/5000289110808_L.jpeg',
    drinkType: 'spirits',
    drinkSubtype: 'gin',
    supermarket: "Sainsbury's",
    productID: 5,
  },
  {
    productName: "Jack Daniel's Whiskey 70cl",
    price: 2500,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/whisky--/jack-daniels-70cl',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/98/5099873089798/5099873089798_L.jpeg',
    drinkType: 'spirits',
    drinkSubtype: 'whisky',
    supermarket: "Sainsbury's",
    productID: 6,
  },
  {
    productName: 'Birra Moretti Lager Beer 12 X 330Ml',
    price: 1400,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/290773107',
    image:
      'https://img.tesco.com/Groceries/pi/578/5035766062578/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 10,
  },
  {
    productName: 'Heineken Lager Beer 15 X 440Ml',
    price: 1400,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/300616239',
    image:
      'https://img.tesco.com/Groceries/pi/783/5035766062783/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 11,
  },
  {
    productName: 'Peroni Nastro Azzurro 12X330ml',
    price: 0,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/262407821',
    image:
      'https://img.tesco.com/Groceries/pi/216/8008440122216/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 8,
  },
  {
    productName: 'Kronenbourg 1664 Beer 15 X 440Ml',
    price: 1400,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/302305570',
    image:
      'https://img.tesco.com/Groceries/pi/195/5035766382195/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 12,
  },
  {
    productName: 'Carling Lager 18X440ml',
    price: 1200,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/295220887',
    image:
      'https://img.tesco.com/Groceries/pi/252/5010038444252/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 13,
  },
  {
    productName: 'Hop House 13 Lager 6 X 330Ml',
    price: 600,
    offer: 'Any 2 for £9.00',
    link: 'https://www.tesco.com/groceries/en-GB/products/297543900',
    image:
      'https://img.tesco.com/Groceries/pi/784/5000213020784/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 14,
  },
  {
    productName: 'Desperados Tequila Flavoured Beer 12X250ml',
    price: 1100,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/300542631',
    image:
      'https://img.tesco.com/Groceries/pi/837/8712000039837/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 15,
  },
  {
    productName: 'Coors Light 20 X 330Ml',
    price: 1100,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/280116542',
    image:
      'https://img.tesco.com/Groceries/pi/838/5010038442838/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 16,
  },
  {
    productName: 'San Miguel 4X330ml',
    price: 450,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/258173382',
    image:
      'https://img.tesco.com/Groceries/pi/677/5010153771677/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 1,
  },
  {
    productName: 'Stella Artois 18 X 440Ml',
    price: 1500,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/268228142',
    image:
      'https://img.tesco.com/Groceries/pi/820/5010017109820/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Tesco',
    productID: 7,
  },
  {
    productName: 'Marstons Classic Ales 6X500ml',
    price: 850,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/273706617',
    image:
      'https://img.tesco.com/Groceries/pi/615/5011348011615/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Tesco',
    productID: 17,
  },
  {
    productName: 'Adnams Ghost Ship 4X440ml (L)',
    price: 475,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/275881641',
    image:
      'https://img.tesco.com/Groceries/pi/029/5016878011029/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Tesco',
    productID: 18,
  },
  {
    productName: 'Adnams Ghost Ship 500Ml',
    price: 170,
    offer: 'Any 4 for £6.00',
    link: 'https://www.tesco.com/groceries/en-GB/products/273614795',
    image:
      'https://img.tesco.com/Groceries/pi/435/5016878010435/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Tesco',
    productID: 19,
  },
  {
    productName: 'Badger Golden Champion 500Ml',
    price: 170,
    offer: 'Any 4 for £6.00',
    link: 'https://www.tesco.com/groceries/en-GB/products/251443235',
    image:
      'https://img.tesco.com/Groceries/pi/110/5010548005110/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Tesco',
    productID: 20,
  },
  {
    productName: 'Hobgoblin Gold 500Ml',
    price: 119,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/283845523',
    image:
      'https://img.tesco.com/Groceries/pi/194/5011348015194/IDShot_225x225.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Tesco',
    productID: 22,
  },
  {
    productName: 'Blossom Hill Red Wine 75Cl',
    price: 500,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/259712890',
    image:
      'https://img.tesco.com/Groceries/pi/581/5060078183581/IDShot_225x225.jpg',
    drinkType: 'wine',
    drinkSubtype: 'red',
    supermarket: 'Tesco',
    productID: 3,
  },
  {
    productName: 'Tesco Bucks Fizz 75Cl',
    price: 300,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/257222292',
    image:
      'https://img.tesco.com/Groceries/pi/381/5018374178381/IDShot_225x225.jpg',
    drinkType: 'wine',
    drinkSubtype: 'sparkling',
    supermarket: 'Tesco',
    productID: 4,
  },
  {
    productName: "Gordon's Special Dry London Gin 1 Litre",
    price: 2050,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/257546202',
    image:
      'https://img.tesco.com/Groceries/pi/808/5000289110808/IDShot_225x225.jpg',
    drinkType: 'spirits',
    drinkSubtype: 'gin',
    supermarket: 'Tesco',
    productID: 5,
  },
  {
    productName: "Jack Daniel's Tennessee Whiskey 70Cl",
    price: 2600,
    offer: 'No offer',
    link: 'https://www.tesco.com/groceries/en-GB/products/255248604',
    image:
      'https://img.tesco.com/Groceries/pi/798/5099873089798/IDShot_225x225.jpg',
    drinkType: 'spirits',
    drinkSubtype: 'whisky',
    supermarket: 'Tesco',
    productID: 6,
  },
  {
    productName: 'Birra Moretti 12x330ml',
    price: 1350,
    offer: 'No offer',
    link:
      'https://www.waitrose.com/ecom/products/birra-moretti/402114-627466-627467',
    image:
      'https://d1ycl3zewbvuig.cloudfront.net/images/products/3/LN_402114_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Waitrose',
    productID: 10,
  },
  {
    productName: 'Classic Ales 6x500ml',
    price: 700,
    offer: 'Save £2.00. Was £9.00',
    link:
      'https://www.waitrose.com/ecom/products/classic-ales/403894-220422-220423',
    image:
      'https://d3l6n8hsebkot8.cloudfront.net/images/products/3/LN_403894_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 17,
  },
  {
    productName: 'Adnams Ghost Ship 4x440ml',
    price: 500,
    offer: 'No offer',
    link:
      'https://www.waitrose.com/ecom/products/adnams-ghost-ship/802939-305399-305400',
    image:
      'https://d3l6n8hsebkot8.cloudfront.net/images/products/3/LN_802939_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 18,
  },
  {
    productName: 'Adnams Ghost Ship 500ml',
    price: 180,
    offer: 'No offer',
    link:
      'https://www.waitrose.com/ecom/products/adnams-ghost-ship/478214-304668-304669',
    image:
      'https://d25hqtnqp5nl24.cloudfront.net/images/products/3/LN_478214_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 19,
  },
  {
    productName: 'Badger Brewery Golden Champion Ale 500ml',
    price: 180,
    offer: 'Add 4 for £6',
    link:
      'https://www.waitrose.com/ecom/products/badger-brewery-golden-champion-ale/013831-6703-6704',
    image:
      'https://d1ycl3zewbvuig.cloudfront.net/images/products/3/LN_013831_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 20,
  },
  {
    productName: 'Badger Twice Tangled IPA 500ml',
    price: 150,
    offer: 'Introductory Offer.Will be £1.85',
    link:
      'https://www.waitrose.com/ecom/products/badger-twice-tangled-ipa/578591-728264-728265',
    image:
      'https://duetogsaij514.cloudfront.net/images/products/3/LN_578591_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 21,
  },
  {
    productName: 'Wychwood Brewery Gold Hobgoblin 500ml',
    price: 125,
    offer: 'Save 45p. Was £1.70',
    link:
      'https://www.waitrose.com/ecom/products/wychwood-brewery-gold-hobgoblin/638234-361827-361828',
    image:
      'https://duetogsaij514.cloudfront.net/images/products/3/LN_638234_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 22,
  },
  {
    productName: 'Badger Hopping Hare 500ml',
    price: 190,
    offer: 'Add 4 for £6',
    link:
      'https://www.waitrose.com/ecom/products/badger-hopping-hare/701723-175234-175235',
    image:
      'https://d25hqtnqp5nl24.cloudfront.net/images/products/3/LN_701723_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'ale',
    supermarket: 'Waitrose',
    productID: 23,
  },
  {
    productName: 'Budweiser 15x300ml',
    price: 1100,
    offer: 'No offer',
    link:
      'https://www.waitrose.com/ecom/products/budweiser/719588-722343-722344',
    image:
      'https://d3l6n8hsebkot8.cloudfront.net/images/products/3/LN_719588_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Waitrose',
    productID: 2,
  },
  {
    productName: 'San Miguel 4x330ml',
    price: 500,
    offer: 'No offer',
    link:
      'https://www.waitrose.com/ecom/products/san-miguel/071573-36326-36327',
    image:
      'https://d3l6n8hsebkot8.cloudfront.net/images/products/3/LN_071573_BP_3.jpg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: 'Waitrose',
    productID: 1,
  },
  {
    productName: "Jack Daniel's Tennessee Whiskey 70cl",
    price: 2650,
    offer: 'No offer',
    link:
      'https://www.waitrose.com/ecom/products/jack-daniels-tennessee-whiskey/062132-31485-31486',
    image:
      'https://d1ycl3zewbvuig.cloudfront.net/images/products/3/LN_062132_BP_3.jpg',
    drinkType: 'spirits',
    drinkSubtype: 'whisky',
    supermarket: 'Waitrose',
    productID: 6,
  },
];

module.exports = { supermarketBaseData };
