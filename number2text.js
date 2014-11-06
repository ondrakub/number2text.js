function number2text(input) {

  var number = input.toString();

  var exponent = [];
  exponent[0] = [];
  exponent[3] = ['tisíc','tisíce','tisíc'];
  exponent[6] = ['milion','miliony','milionù'];
  exponent[9] = ['miliarda','miliardy','miliard'];
  exponent[12] = ['bilion','biliony','bilionù'];
  exponent[15] = ['biliarda','biliardy','biliard'];
  exponent[18] = ['trilion','triliony','trilionù'];
  exponent[21] = ['triliarda','triliardy','triliard'];

  exponent[24] = ['kvadrilion','kvadriliony','kvadrilionù'];
  exponent[30] = ['kvintilion','kvintiliony','kvintilionù'];
  exponent[36] = ['sextilion','sextiliony','sextilionù'];
  exponent[42] = ['septilion','septiliony','septilionù'];

  exponent[48] = ['oktilion','oktiliony','oktilionù'];
  exponent[54] = ['nonilion','noniliony','nonilionù'];
  exponent[60] = ['decilion','deciliony','decilionù'];

  exponent[66] = ['undecilion','undeciliony','undecilionù'];
  exponent[72] = ['duodecilion','duodeciliony','duodecilionù'];
  exponent[78] = ['tredecilion','tredeciliony','tredecilionù'];
  exponent[84] = ['kvatrodecilion','kvatrodeciliony','kvatrodecilionù'];
  exponent[90] = ['kvindecilion','kvindeciliony','kvindecilionù'];
  exponent[96] = ['sexdecilion','sexdeciliony','sexdecilionù'];
  exponent[102] = ['septendecilion','septendeciliony','septendecilionù'];
  exponent[108] = ['oktodecilion','oktodeciliony','oktodecilionù'];
  exponent[114] = ['novemdecilion','novemdeciliony','novemdecilionù'];
  exponent[120] = ['vigintilion','vigintiliony','vigintilionù'];
  exponent[192] = ['duotrigintilion','duotrigintiliony','duotrigintilionù'];
  exponent[600] = ['centilion','centiliony','centilionù'];

  var hundreds = ['sto', 'stě', 'sta', 'set'];

  var digits = ['nula', 'jedna', 'dva', 'tři', 'čtyři', 'pět', 'šest', 'sedm', 'osm', 'devět'];

  var power = 0;

  var sep = '';

  var powsuffix = '';

  return _toWords(number, power, powsuffix, exponent, sep, digits, hundreds);
}


function _toWords(number, power, powsuffix, exponent, sep, digits, hundreds){
  var ret = '';
  if (number.length > 3) {
    var maxp = number.length-1;
    var curp = maxp;
    for (var p = maxp; p > 0; --p) {
      if (p in exponent) {
        var snum = number.substr(maxp - curp, curp - p + 1);
        snum.replace('/^0+/', '');
        if (snum !== '') {
          var cursuffix = exponent[power][exponent[power].length-1];
          if (typeof cursuffix === "undefined"){
            cursuffix = '';
          }
          if (powsuffix != '') {
            cursuffix += sep + powsuffix;
          }

          ret += _toWords(snum, p, cursuffix, exponent, sep, digits, hundreds);
        }

        curp = p - 1;
        continue;
      }
    }
    number = number.substr(maxp - curp, curp - p + 1);
    if (number == 0) {
      return ret;
    }
  }
  else if (number == 0 || number == '') {
    return sep + digits[0];
  }

  var h, t, d;
  h = t = d = 0;

  switch(number.length) {
      case 3:
          h = parseInt(number.substr(-3, 1));

      case 2:
          t = parseInt(number.substr(-2, 1));

      case 1:
          d = parseInt(number.substr(-1, 1));
          break;

      case 0:
          return;
          break;
      }

  if (h) {
    if (h == 1) {
      ret += sep + hundreds[0];
    } else if (h == 2) {
      ret += sep + "dvě" + sep + hundreds[1];
    } else if ((h > 1) && (h < 5) ) {
      ret += sep + digits[h] + sep + hundreds[2];
    } else {		//if ($h >= 5)
      ret += sep + digits[h] + sep + hundreds[3];
    }
  }

  switch (t) {
      case 2:
      case 3:
      case 4:
          ret += sep + digits[t] + 'cet';
          break;

      case 5:
          ret += sep + 'padesát';
          break;

      case 6:
          ret += sep + 'šedesát';
          break;

      case 7:
          ret += sep + 'sedmdesát';
          break;

      case 8:
          ret += sep + 'osmdesát';
          break;

      case 9:
          ret += sep + 'devadesát';
          break;

      case 1:
          switch (d) {
          case 0:
              ret += sep + 'deset';
              break;

          case 1:
              ret += sep + 'jedenáct';
              break;

          case 4:
              ret += sep + 'čtrnáct';
              break;

          case 5:
              ret += sep + 'patnáct';
              break;

          case 9:
              ret += sep + 'devatenáct';
              break;

          case 2:
          case 3:
          case 6:
          case 7:
          case 8:
              ret += sep + digits[d] + 'náct';
              break;
          }
          break;
  }

  if ((t != 1) && (d > 0) && ((power == 0) || (number > 1))) {
    ret += sep + digits[d];
  }

  if (power > 0) {

    if (power in exponent) {
      var lev = exponent[power];
    }

    if (typeof lev === "undefined" || typeof lev === "array") {
        return null;
    }

    var idx = null;
    if (number == 1) {
      idx = 0;
    } else if ( ((number > 1) && (number < 5)) || ((parseInt(t+d) > 1) && (parseInt(t+d) < 5))) {
      idx = 1;
    } else {
      idx = 2;
    }

    ret += sep + lev[idx];
  }

  if (powsuffix != '') {
    ret += sep + powsuffix;
  }

  return ret;
}
