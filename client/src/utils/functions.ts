// in this file we put the main functions we need
import { ChangeEvent } from "react";

export function isValidEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+(.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function checkPassword(password1: string, password2: string) {
  return password1 === password2;
}

export function autocompleteCardNumber(event: ChangeEvent<HTMLInputElement>) {
  if (event.target.value) {
    return event.target.value
      .replace(/[^0-9]/gi, "")
      .replace(/(.{4})/g, "$1 ")
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
  event: ChangeEvent<HTMLInputElement>
) {
  if (event.target.value) {
    return event.target.value
      .replace(/[^0-9]/gi, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .trim();
  }
  return undefined;
}

export function checkPaymentExpirationDate(date: string) {
  const regex = /^\d{2}\/\d{2}$/;

  const today = new Date();
  const [inputMonth, inputYear] = date.split("/");
  // Create a new Date object by passing the parsed components
  if (parseInt(inputMonth) > 0 && parseInt(inputMonth) < 13) {
    const newDate = new Date();
    newDate.setFullYear(parseInt("20" + inputYear), parseInt(inputMonth) - 1);
    if (regex.test(date) && today.getTime() < newDate.getTime()) {
      return true;
    }
    return false;
  }
  return false;
}
