// in this file we put the main functions we need
import { ChangeEvent } from "react";

export function isValidEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+(.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function checkPassword(password1: string, password2: string) {
  return password1 === password2;
}

export function spaceBetweenDigits(event: ChangeEvent<HTMLInputElement>) {
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
