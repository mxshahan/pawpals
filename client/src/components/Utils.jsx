export function validateEmail(email) {
  var patt = /^\S+@\S+\.\S+$/;
  if(email.match(patt)) return true;
  return false;
}

// username must be unique
export function validateUsername(name, usernames) {
  if(usernames.some(d => d.toLowerCase() === name.toLowerCase())) {
    return false;
  }
  return true;
}

export function isNullOrEmpty(str) {
  return str === null || str.trim().length === 0 || str === '';
}

export function getClassName(value) {
  // console.log(value);
  var className = 'petDetailCardValue ';
  switch(value) {
      case('Adopted'):
          return className + 'adpoted';
      case('Available'):
          return className + 'available';
      case('Pending'):
          return className + 'pending';
      default: 
          return className + 'unavailable';
  }
} 