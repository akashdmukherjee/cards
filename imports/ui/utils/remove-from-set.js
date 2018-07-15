const removeFromSet = (array, item) => {
  const newArray = array.slice();
  if (newArray.includes(item)) {
    const index = newArray.indexOf(item);
    newArray.splice(index, 1);
  }
  return newArray;
};

export default removeFromSet;
