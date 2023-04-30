// this is used to format currency values
// example: CurrencyFormat(1000) => $1,000.00
// example: CurrencyFormat(10000, "Tk.") => Tk.10,000.00
const CurrencyFormat = (num, prefix) => {
  if (typeof prefix === "undefined") {
    prefix = "$"; // default prefix is '$'
  }
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) {
    num = "0";
  }
  let sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = "0" + cents;
  }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  }
  return (sign ? "" : "-") + prefix + num + "." + cents;
}

export default CurrencyFormat;
