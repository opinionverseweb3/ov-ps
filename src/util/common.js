export const priceInWords = value => {
  var fraction = Math.round(frac(value) * 100);
  var f_text = '';

  if (fraction > 0) {
    f_text = 'AND ' + convert_number(fraction) + ' PAISE';
  }

  return convert_number(value) + f_text;
};

function frac(f) {
  return f % 1;
}

function convert_number(number) {
  if (number < 0 || number > 999999999) {
    return 'NUMBER OUT OF RANGE!';
  }
  var Gn = Math.floor(number / 10000000); /* Crore */
  var kn = Math.floor(number / 100000); /* lakhs */
  var Hn = Math.floor(number / 1000); /* thousand */
  var Dn = Math.floor(number / 100); /* Tens (deca) */
  var res = '';

  if (Gn > 0) {
    res += number / 10000000 + ' CR';
  } else if (kn > 0) {
    res += (res === '' ? '' : ' ') + number / 100000 + 'L';
  } else if (Hn > 0) {
    res += (res === '' ? '' : ' ') + number / 1000 + 'K';
  } else if (Dn) {
    res += (res === '' ? '' : ' ') + number;
  }
  return res;
}
//calculates random integer between two integers both inclusive.
export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
