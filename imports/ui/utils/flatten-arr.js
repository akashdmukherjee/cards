const flatten = arr => arr
  .reduce((flat, toFlatten) => flat
    .concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

export default flatten;
