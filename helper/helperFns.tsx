import { isValid, isBefore, isSameDay } from 'date-fns';
const today = new Date();

export function validateDate(selectedDate: Date | undefined) {
  if (!selectedDate || !isValid(selectedDate)) return '';

  //   today
  if (isSameDay(selectedDate, today)) return selectedDate;

  //   Past date
  if (isBefore(selectedDate, new Date())) {
    return '';
  }

  // valid future date
  return selectedDate;
}
