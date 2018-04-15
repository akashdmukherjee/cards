const onlyUniq = (value, index, self) => self.indexOf(value) === index;

const onlyUniqArr = arr => arr.filter(onlyUniq);

export default onlyUniqArr;
