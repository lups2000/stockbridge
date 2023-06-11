// in this file we put the main functions we need
import { ChangeEvent } from 'react';

export function checkEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+(.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function checkPassword(password1: string, password2: string) {
  return password1 === password2 && password1.length >= 6;
}

export function autocompleteCardNumber(event: ChangeEvent<HTMLInputElement>) {
  if (event.target.value) {
    return event.target.value
      .replace(/[^0-9]/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }
  return undefined;
}

export function chekCreditCardNumber(creditCardNumber: string) {
  return creditCardNumber.length === 19; // 16 + 3 spaces
}

export function checkCVV(cvv: string) {
  return cvv.length === 3 && cvv.match(/^[0-9]+$/) != null;
}

export function autocompleteExpirationDate(
  event: ChangeEvent<HTMLInputElement>,
) {
  if (event.target.value) {
    return event.target.value
      .replace(/[^0-9]/gi, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .trim();
  }
  return undefined;
}

export function checkPaymentExpirationDate(date: string) {
  const regex = /^\d{2}\/\d{2}$/;

  const today = new Date();
  const [inputMonth, inputYear] = date.split('/');
  // Create a new Date object by passing the parsed components
  if (parseInt(inputMonth) > 0 && parseInt(inputMonth) < 13) {
    const newDate = new Date();
    newDate.setFullYear(parseInt('20' + inputYear), parseInt(inputMonth) - 1);
    if (regex.test(date) && today.getTime() < newDate.getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export function expDatePaymentToDate(date: string) {
  //date format: 02/10
  const [monthString, yearString] = date.split('/');
  const month = parseInt(monthString, 10);
  const year = parseInt(yearString, 10);

  if (isNaN(month) || isNaN(year)) {
    return undefined;
  }

  const transformedDate = new Date(year + 2000, month);

  // Check if the transformedDate is a valid date
  if (isNaN(transformedDate.getTime())) {
    return undefined;
  }

  return transformedDate;
}

export function checkPhoneNumber(phoneNumber: string) {
  const regex = /^\+?[1-9]\d{1,3}-?[1-9]\d{1,14}$/;
  return regex.test(phoneNumber);
}
