const addToSet = (array, item) => {
  const newArray = array.slice();
  newArray.push(item);
  return newArray;
};

export default addToSet;
