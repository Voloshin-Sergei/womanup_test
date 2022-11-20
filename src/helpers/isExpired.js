import * as dayjs from 'dayjs';

/**
 *the function compares the current date with the deadline date, return
 * @function isExpired
 * @param {string} deadline
 * @returns {boolean} true or false
 */
const isExpired = (deadline) => {
  /**
   * @type {string}
   */
  const currentDate = dayjs().format('YYYY-MM-DD');

  return currentDate > deadline;
};

export default isExpired;
