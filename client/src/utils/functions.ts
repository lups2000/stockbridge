// in this file we put the main functions we need
import { ChangeEvent } from 'react';

import { AdvertSortCriteria, ExtraCriteria, OfferSortCriteria } from '../components/ContentTabs/Tabs';
import { PopulatedOffer } from '../api/collections/offer';
import { NestedPopulatedOrder } from '../api/collections/order';

export function checkEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+(.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

/**
 * Checks if the given password and confirmation are identical with min lenght = 6 characters.
 * @param password1
 * @param password2
 * @returns A tuple containing if the password is acceptable and the corresponding error message.
 */
/*
export function checkPassword(password1: string, password2: string): [boolean,string] {
  if (password1.length < 6){
    return [false, "Password should contain at least 6 characters"];
  }
  if (password1 !== password2) {
    return [false, "Passwords don't match"];
  }
  return [true, ""];
}*/

export function checkPasswordLength(password: string) {
  return password.length >= 6;
}

export function checkPasswordMatch(password1: string, password2: string) {
  return password1 === password2;
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

export function checkPurchaseDateAdvert(date: string) {
  const inputDate = new Date(date);
  if (inputDate <= new Date()) {
    return true;
  }
  return false;
}

export function checkExpirationDateAvert(date: string) {
  const inputDate = new Date(date);
  if (inputDate >= new Date()) {
    return true;
  }
  return false;
}


  /**
   * Filters the displayed offers based on the search text and sorts it based on 
   * the selected criteria in the specified order 
   * @param list the list to be filtered and sorted
   * @returns 
   */
  export function sortedAndFilteredOffers(list: PopulatedOffer[], sortCriteria: AdvertSortCriteria | OfferSortCriteria, searchText: string, sortOrder: boolean ) : PopulatedOffer[]{
    let result = list
      .filter(x => x.advert?.productname?.toLowerCase().includes(searchText.toLocaleLowerCase()))
      .sort((a, b) => {
          switch (sortCriteria) {
            case AdvertSortCriteria.NONE:
              return 0;
            case AdvertSortCriteria.NAME:
              return (a.advert?.productname ?? "").localeCompare(b.advert?.productname ?? "");
            case AdvertSortCriteria.DATE:
              return ((a.createdAt ?? "") > (b.createdAt ?? "") ? 1 : ((a.createdAt ?? "") < (b.createdAt ?? "") ? -1 : 0));
            case AdvertSortCriteria.PRICE:
              return (a.price ?? 0) - (b.price ?? 0);
            case AdvertSortCriteria.Quantity:
              return (a.quantity ?? 0) - (b.quantity ?? 0);
            case ExtraCriteria.STATUS:
              return (a.status as string ?? "").localeCompare(b.status as string ?? "");
            case ExtraCriteria.STORE:
              return (a.advert?.store?.toLocaleLowerCase() ?? "").localeCompare(b.advert?.store?.toLocaleLowerCase() ?? "");
            default:
              return 0;
          }

      })
      return sortOrder ? result : result.reverse();
  }

  /**
   * Filters the displayed orders based on the search text and sorts it based on 
   * the selected criteria in the specified order 
   * @param list the list to be filtered and sorted
   * @returns 
   */
  export function sortedAndFilteredOrders(list: NestedPopulatedOrder[], sortCriteria: AdvertSortCriteria | OfferSortCriteria, searchText: string, sortOrder: boolean) : NestedPopulatedOrder[] {
    let result = list
      .filter(x => x.offer?.advert?.productname?.toLowerCase().includes(searchText.toLocaleLowerCase()))
      .sort((a, b) => {
          switch (sortCriteria) {
            case AdvertSortCriteria.NONE:
              return 0;
            case AdvertSortCriteria.NAME:
              return (a.offer?.advert?.productname ?? "").localeCompare(b.offer?.advert?.productname ?? "");
            case AdvertSortCriteria.DATE:
              return ((a.createdAt ?? "") > (b.createdAt ?? "") ? 1 : ((a.createdAt ?? "") < (b.createdAt ?? "") ? -1 : 0));
            case AdvertSortCriteria.PRICE:
              return (a.totalPrice ?? 0) - (b.totalPrice ?? 0);
            case AdvertSortCriteria.Quantity:
              return (a.quantity ?? 0) - (b.quantity ?? 0);
            case ExtraCriteria.STATUS:
              return (a.status ?? "").localeCompare(b.status ?? "");
            case ExtraCriteria.STORE:
              return (a.offer?.advert?.store ?? "").localeCompare(b.offer?.advert?.store ?? "");
            default:
              return 0;
          }

      })
      return sortOrder ? result : result.reverse();
  }