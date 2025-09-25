export type CurrencySymbol = 
    "$"   | 
    "€"   |
    "£"   | 
    "E£"  |
    "¥"   | 
    "CHF" |
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
    "XAU" |
    "XAG";

export type ISO_4217_Code = 
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

export type CurrencyName = 
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

export type CurrencyDetails = {
    symbol: CurrencySymbol;
    name: CurrencyName;
    decimalPlaces: number;
    localeCode: string;
    isNonStandardCurrency?: boolean;
};

export const currencyMap: ReadonlyMap<ISO_4217_Code, CurrencyDetails> = new Map([
    ["USD", { symbol: "$", name: "US Dollar", decimalPlaces: 2, localeCode: "en-US"}],
    ["EUR", { symbol: "€", name: "Euro", decimalPlaces: 2, localeCode: "en-IE"}],
    ["GBP", { symbol: "£", name: "British Pound", decimalPlaces: 2, localeCode: "en-GB"}],
    ["JPY", { symbol: "¥", name: "Japanese Yen", decimalPlaces: 0, localeCode: "ja-JP"}],
    ["CNY", { symbol: "¥", name: "Chinese Yuan", decimalPlaces: 2, localeCode: "zh-CN"}],
    ["CHF", { symbol: "CHF", name: "Swiss Franc", decimalPlaces: 2, localeCode: "de-CH"}],
    ["CAD", { symbol: "C$", name: "Canadian Dollar", decimalPlaces: 2, localeCode: "en-CA"}],
    ["AUD", { symbol: "A$", name: "Australian Dollar", decimalPlaces: 2, localeCode: "en-AU"}],
    ["NZD", { symbol: "NZ$", name: "New Zealand Dollar", decimalPlaces: 2, localeCode: "en-NZ"}],
    ["SEK", { symbol: "kr", name: "Swedish Krona", decimalPlaces: 2, localeCode: "sv-SE"}],
    ["NOK", { symbol: "kr", name: "Norwegian Krone", decimalPlaces: 2, localeCode: "nb-NO"}],
    ["DKK", { symbol: "kr", name: "Danish Krone", decimalPlaces: 2, localeCode: "da-DK"}],
    ["INR", { symbol: "₹", name: "Indian Rupee", decimalPlaces: 2, localeCode: "en-IN"}],
    ["KRW", { symbol: "₩", name: "South Korean Won", decimalPlaces: 0, localeCode: "ko-KR"}],
    ["SGD", { symbol: "S$", name: "Singapore Dollar", decimalPlaces: 2, localeCode: "en-SG"}],
    ["HKD", { symbol: "HK$", name: "Hong Kong Dollar", decimalPlaces: 2, localeCode: "zh-HK"}],
    ["THB", { symbol: "฿", name: "Thai Baht", decimalPlaces: 2, localeCode: "th-TH"}],
    ["MYR", { symbol: "RM", name: "Malaysian Ringgit", decimalPlaces: 2, localeCode: "ms-MY"}],
    ["IDR", { symbol: "Rp", name: "Indonesian Rupiah", decimalPlaces: 0, localeCode: "id-ID"}],
    ["PHP", { symbol: "₱", name: "Philippine Peso", decimalPlaces: 2, localeCode: "en-PH"}],
    ["VND", { symbol: "₫", name: "Vietnamese Dong", decimalPlaces: 0, localeCode: "vi-VN"}],
    ["TWD", { symbol: "NT$", name: "Taiwan Dollar", decimalPlaces: 2, localeCode: "zh-TW"}],
    ["AED", { symbol: "د.إ", name: "UAE Dirham", decimalPlaces: 2, localeCode: "ar-AE"}],
    ["SAR", { symbol: "﷼", name: "Saudi Riyal", decimalPlaces: 2, localeCode: "ar-SA"}],
    ["ILS", { symbol: "₪", name: "Israeli Shekel", decimalPlaces: 2, localeCode: "he-IL"}],
    ["EGP", { symbol: "E£", name: "Egyptian Pound", decimalPlaces: 2, localeCode: "ar-EG"}],
    ["ZAR", { symbol: "R", name: "South African Rand", decimalPlaces: 2, localeCode: "en-ZA"}],
    ["NGN", { symbol: "₦", name: "Nigerian Naira", decimalPlaces: 2, localeCode: "en-NG"}],
    ["KES", { symbol: "KSh", name: "Kenyan Shilling", decimalPlaces: 2, localeCode: "en-KE"}],
    ["TRY", { symbol: "₺", name: "Turkish Lira", decimalPlaces: 2, localeCode: "tr-TR"}],
    ["MXN", { symbol: "$", name: "Mexican Peso", decimalPlaces: 2, localeCode: "es-MX"}],
    ["BRL", { symbol: "R$", name: "Brazilian Real", decimalPlaces: 2, localeCode: "pt-BR"}],
    ["ARS", { symbol: "$", name: "Argentine Peso", decimalPlaces: 2, localeCode: "es-AR"}],
    ["CLP", { symbol: "$", name: "Chilean Peso", decimalPlaces: 0, localeCode: "es-CL"}],
    ["COP", { symbol: "$", name: "Colombian Peso", decimalPlaces: 2, localeCode: "es-CO"}],
    ["PEN", { symbol: "S/", name: "Peruvian Sol", decimalPlaces: 2, localeCode: "es-PE"}],
    ["PLN", { symbol: "zł", name: "Polish Złoty", decimalPlaces: 2, localeCode: "pl-PL"}],
    ["CZK", { symbol: "Kč", name: "Czech Koruna", decimalPlaces: 2, localeCode: "cs-CZ"}],
    ["HUF", { symbol: "Ft", name: "Hungarian Forint", decimalPlaces: 0, localeCode: "hu-HU"}],
    ["RON", { symbol: "lei", name: "Romanian Leu", decimalPlaces: 2, localeCode: "ro-RO"}],
    ["UAH", { symbol: "₴", name: "Ukrainian Hryvnia", decimalPlaces: 2, localeCode: "uk-UA"}],
    ["BTC", { symbol: "₿", name: "Bitcoin", decimalPlaces: 8, localeCode: "en-US", isNonStandardCurrency: true }],
    ["ETH", { symbol: "Ξ", name: "Ethereum", decimalPlaces: 18, localeCode: "en-US", isNonStandardCurrency: true }],
    ["XAU", { symbol: "XAU", name: "Gold Ounce", decimalPlaces: 4, localeCode: "en-US", isNonStandardCurrency: true }],
    ["XAG", { symbol: "XAG", name: "Silver Ounce", decimalPlaces: 4, localeCode: "en-US", isNonStandardCurrency: true }],
]);
