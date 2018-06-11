const includesWholeArray = (superset, subset) =>
  subset.every(value => superset.indexOf(value) >= 0);

export default includesWholeArray;
