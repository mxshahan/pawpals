export function validateEmail(email) {
  var patt = /^\S+@\S+\.\S+$/;
  if(email.match(patt)) return true;
  return false;
}