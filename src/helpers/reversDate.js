/**
 * the function puts the year of the date at the end of the string and returns a new string
 * @function reversDate
 * @param {string} date current deadline date for task in db
 * @returns {string} date where the year is at the end of the string
 * @example
 * initial('2002-07-11');
 * / => ('07 11 2002');
 */
const reversDate = (date) => {
  /**
   * @type {Array<string>}
   */
  const dateArray = date.split('-');
  const year = dateArray.shift(dateArray[0]);
  dateArray.push(year);

  return dateArray.join(' ');
};

export default reversDate;
