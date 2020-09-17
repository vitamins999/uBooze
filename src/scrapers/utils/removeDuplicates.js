const removeDuplicates = (drinksArr) => {
  return drinksArr.reduce((acc, current) => {
    const x = acc.find((item) => item.productName === current.productName);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
};

module.exports = removeDuplicates;
