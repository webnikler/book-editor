/* eslint no-restricted-globals: off */

const normalizeValue = (value) => {
  switch (typeof value) {
    case 'string': return !isNaN(+value) ? +value : value.toLowerCase();
    case 'number': return value;
    default: return null;
  }
};

export default (books, key, sortDirection) => {
  if (!key) {
    return books;
  }

  const sortedByASC = books.sort((prev, next) => {
    const prevValue = normalizeValue(prev[key]);
    const nextValue = normalizeValue(next[key]);

    /* eslint no-nested-ternary: "off" */
    return prevValue < nextValue ? -1 : prevValue > nextValue ? 1 : 0;
  });

  return sortDirection === 'DESC' ? sortedByASC.reverse() : sortedByASC;
};
