function capitalize(str) {
  let firstLetter = str.charAt(0).toUpperCase();
  let rest = str.slice(1).toLowerCase();

  return firstLetter + rest;
}

module.exports = capitalize;