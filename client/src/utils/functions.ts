// in this file we put the main functions we need

export function isValidEmail(email: string) {
  return /^\w+([.-]?\w+)*@\w+(.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function checkPassword(password1: string,password2: string){
    return password1 === password2
}