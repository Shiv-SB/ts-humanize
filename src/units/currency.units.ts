type GroupingStyle = "Western" | "Indian" | "None";

type CurrencySymbol = 
    "$"   | 
    "€"   |
    "£"   | 
    "¥"   | 
    "₣"   |
    "C$"  |
    "A$"  | 
    "NZ$" | 
    "kr"  | 
    "₹"   | 
    "₩"   | 
    "S$"  | 
    "HK$" | 
    "฿"   | 
    "RM"  | 
    "Rp"  | 
    "₱"   | 
    "₫"   | 
    "NT$" |
    "د.إ" |
    "﷼"   | 
    "₪"   | 
    "R"   | 
    "₦"   | 
    "KSh" |
    "₺"   |
    "R$"  |
    "S/"  | 
    "zł"  | 
    "Kč"  | 
    "Ft"  | 
    "lei" | 
    "₴"   | 
    "₿"   |
    "Ξ"   |
    "oz";

type ISO_4217_Code = 
    "USD" |
    "EUR" | 
    "GBP" | 
    "JPY" | 
    "CNY" | 
    "CHF" | 
    "CAD" | 
    "AUD" | 
    "NZD" | 
    "SEK" | 
    "NOK" | 
    "DKK" | 
    "INR" | 
    "KRW" | 
    "SGD" | 
    "HKD" | 
    "THB" | 
    "MYR" | 
    "IDR" | 
    "PHP" | 
    "VND" | 
    "TWD" | 
    "AED" | 
    "SAR" | 
    "ILS" | 
    "EGP" | 
    "ZAR" | 
    "NGN" | 
    "KES" | 
    "TRY" | 
    "MXN" | 
    "BRL" | 
    "ARS" | 
    "CLP" | 
    "COP" | 
    "PEN" | 
    "PLN" | 
    "CZK" | 
    "HUF" | 
    "RON" | 
    "UAH" | 
    "BTC" | 
    "ETH" | 
    "XAU" | 
    "XAG";

type CurrencyName = 
    "US Dollar"          |
    "Euro"               | 
    "British Pound"      | 
    "Japanese Yen"       | 
    "Chinese Yuan"       | 
    "Swiss Franc"        | 
    "Canadian Dollar"    | 
    "Australian Dollar"  | 
    "New Zealand Dollar" | 
    "Swedish Krona"      | 
    "Norwegian Krone"    | 
    "Danish Krone"       | 
    "Indian Rupee"       | 
    "South Korean Won"   | 
    "Singapore Dollar"   | 
    "Hong Kong Dollar"   | 
    "Thai Baht"          | 
    "Malaysian Ringgit"  | 
    "Indonesian Rupiah"  | 
    "Philippine Peso"    | 
    "Vietnamese Dong"    | 
    "Taiwan Dollar"      | 
    "UAE Dirham"         | 
    "Saudi Riyal"        | 
    "Israeli Shekel"     | 
    "Egyptian Pound"     | 
    "South African Rand" | 
    "Nigerian Naira"     | 
    "Kenyan Shilling"    | 
    "Turkish Lira"       | 
    "Mexican Peso"       | 
    "Brazilian Real"     | 
    "Argentine Peso"     | 
    "Chilean Peso"       | 
    "Colombian Peso"     | 
    "Peruvian Sol"       | 
    "Polish Złoty"       | 
    "Czech Koruna"       | 
    "Hungarian Forint"   | 
    "Romanian Leu"       | 
    "Ukrainian Hryvnia"  | 
    "Bitcoin"            | 
    "Ethereum"           | 
    "Gold Ounce"         | 
    "Silver Ounce";

type CurrencyDetails = {
    symbol: CurrencySymbol;
    name: CurrencyName;
    decimalPlaces: number;
    groupingStyle: GroupingStyle;
};

export const currencyMap: ReadonlyMap<ISO_4217_Code, CurrencyDetails> = new Map([
    ["USD", { symbol: "$", name: "US Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["EUR", { symbol: "€", name: "Euro", decimalPlaces: 2, groupingStyle: "Western"}],
    ["GBP", { symbol: "£", name: "British Pound", decimalPlaces: 2, groupingStyle: "Western"}],
    ["JPY", { symbol: "¥", name: "Japanese Yen", decimalPlaces: 0, groupingStyle: "Western"}],
    ["CNY", { symbol: "¥", name: "Chinese Yuan", decimalPlaces: 2, groupingStyle: "Western"}],
    ["CHF", { symbol: "₣", name: "Swiss Franc", decimalPlaces: 2, groupingStyle: "Western"}],
    ["CAD", { symbol: "C$", name: "Canadian Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["AUD", { symbol: "A$", name: "Australian Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["NZD", { symbol: "NZ$", name: "New Zealand Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["SEK", { symbol: "kr", name: "Swedish Krona", decimalPlaces: 2, groupingStyle: "Western"}],
    ["NOK", { symbol: "kr", name: "Norwegian Krone", decimalPlaces: 2, groupingStyle: "Western"}],
    ["DKK", { symbol: "kr", name: "Danish Krone", decimalPlaces: 2, groupingStyle: "Western"}],
    ["INR", { symbol: "₹", name: "Indian Rupee", decimalPlaces: 2, groupingStyle: "Indian"}],
    ["KRW", { symbol: "₩", name: "South Korean Won", decimalPlaces: 0, groupingStyle: "Western"}],
    ["SGD", { symbol: "S$", name: "Singapore Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["HKD", { symbol: "HK$", name: "Hong Kong Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["THB", { symbol: "฿", name: "Thai Baht", decimalPlaces: 2, groupingStyle: "Western"}],
    ["MYR", { symbol: "RM", name: "Malaysian Ringgit", decimalPlaces: 2, groupingStyle: "Western"}],
    ["IDR", { symbol: "Rp", name: "Indonesian Rupiah", decimalPlaces: 0, groupingStyle: "Western"}],
    ["PHP", { symbol: "₱", name: "Philippine Peso", decimalPlaces: 2, groupingStyle: "Western"}],
    ["VND", { symbol: "₫", name: "Vietnamese Dong", decimalPlaces: 0, groupingStyle: "Western"}],
    ["TWD", { symbol: "NT$", name: "Taiwan Dollar", decimalPlaces: 2, groupingStyle: "Western"}],
    ["AED", { symbol: "د.إ", name: "UAE Dirham", decimalPlaces: 2, groupingStyle: "Western"}],
    ["SAR", { symbol: "﷼", name: "Saudi Riyal", decimalPlaces: 2, groupingStyle: "Western"}],
    ["ILS", { symbol: "₪", name: "Israeli Shekel", decimalPlaces: 2, groupingStyle: "Western"}],
    ["EGP", { symbol: "£", name: "Egyptian Pound", decimalPlaces: 2, groupingStyle: "Western"}],
    ["ZAR", { symbol: "R", name: "South African Rand", decimalPlaces: 2, groupingStyle: "Western"}],
    ["NGN", { symbol: "₦", name: "Nigerian Naira", decimalPlaces: 2, groupingStyle: "Western"}],
    ["KES", { symbol: "KSh", name: "Kenyan Shilling", decimalPlaces: 2, groupingStyle: "Western"}],
    ["TRY", { symbol: "₺", name: "Turkish Lira", decimalPlaces: 2, groupingStyle: "Western"}],
    ["MXN", { symbol: "$", name: "Mexican Peso", decimalPlaces: 2, groupingStyle: "Western"}],
    ["BRL", { symbol: "R$", name: "Brazilian Real", decimalPlaces: 2, groupingStyle: "Western"}],
    ["ARS", { symbol: "$", name: "Argentine Peso", decimalPlaces: 2, groupingStyle: "Western"}],
    ["CLP", { symbol: "$", name: "Chilean Peso", decimalPlaces: 0, groupingStyle: "Western"}],
    ["COP", { symbol: "$", name: "Colombian Peso", decimalPlaces: 2, groupingStyle: "Western"}],
    ["PEN", { symbol: "S/", name: "Peruvian Sol", decimalPlaces: 2, groupingStyle: "Western"}],
    ["PLN", { symbol: "zł", name: "Polish Złoty", decimalPlaces: 2, groupingStyle: "Western"}],
    ["CZK", { symbol: "Kč", name: "Czech Koruna", decimalPlaces: 2, groupingStyle: "Western"}],
    ["HUF", { symbol: "Ft", name: "Hungarian Forint", decimalPlaces: 0, groupingStyle: "Western"}],
    ["RON", { symbol: "lei", name: "Romanian Leu", decimalPlaces: 2, groupingStyle: "Western"}],
    ["UAH", { symbol: "₴", name: "Ukrainian Hryvnia", decimalPlaces: 2, groupingStyle: "Western"}],
    ["BTC", { symbol: "₿", name: "Bitcoin", decimalPlaces: 8, groupingStyle: "Western"}],
    ["ETH", { symbol: "Ξ", name: "Ethereum", decimalPlaces: 18, groupingStyle: "Western"}],
    ["XAU", { symbol: "oz", name: "Gold Ounce", decimalPlaces: 4, groupingStyle: "Western"}],
    ["XAG", { symbol: "oz", name: "Silver Ounce", decimalPlaces: 4, groupingStyle: "Western"}],
]);
