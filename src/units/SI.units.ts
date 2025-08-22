export type SI_PREFIXES = 
    "q" | // quecto
    "r" | // ronto
    "y" | // yocto 
    "z" | // zepto
    "a" | // atto
    "f" | // femto
    "p" | // pico
    "n" | // nano
    "µ" | // micro
    "m" | // milli
    ""  | 
    "k" | // kilo
    "M" | // mega
    "G" | // giga
    "T" | // tera
    "P" | // peta
    "E" | // exa
    "Z" | // zetta
    "Y" | // yotta
    "R" | // ronna 
    "Q";  // quetta

export const siPrefixTable: ReadonlyMap<number, SI_PREFIXES> = new Map([
    [-30, "q"],
    [-27, "r"],
    [-24, "y"],
    [-21, "z"],
    [-18, "a"],
    [-15, "f"],
    [-12, "p"],
    [-9, "n"],
    [-6, "µ"],
    [-3, "m"],
    [0, ""],
    [3, "k"],
    [6, "M"],
    [9, "G"],
    [12, "T"],
    [15, "P"],
    [18, "E"],
    [21, "Z"],
    [24, "Y"],
    [27, "R"],
    [30, "Q"],
]);

