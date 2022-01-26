const LatinLanguageCharacters = require('../models/latinLanguageCharacters');
const nonLatinLanguageCharacters = require('../models/nonLatinLanguageCharacters');

const generateCharactersArrays = async (newLanguage) => {
    const lowerAlphabet = newLanguage.lowerAlphabet;
    const capsAlphabet = newLanguage.capsAlphabet;
    const primaryLowerAlphabet = [];
    const secondaryLowerAlphabet = [];
    const primaryCapsAlphabet = [];
    const secondaryCapsAlphabet = [];
    const primaryLowerArray = [...lowerAlphabet.slice(0,5), ...lowerAlphabet.slice(9,14),
        ...lowerAlphabet.slice(18,22)];
    primaryLowerArray.forEach((letter) => {
        primaryLowerAlphabet.push({char: letter, code: letter.charCodeAt(0)});
    });
    const primaryCapsArray = [...capsAlphabet.slice(0,5), ...capsAlphabet.slice(9,14),
        ...capsAlphabet.slice(18,22)];
    primaryCapsArray.forEach((letter) => {
        primaryCapsAlphabet.push({char: letter, code: letter.charCodeAt(0)});
    });
    const secondaryLowerArray = [];
    const secondaryCapsArray = [];
    lowerAlphabet.filter((letter, index) => {
        if (primaryLowerArray.includes(letter) === false) {
            secondaryLowerArray.push(lowerAlphabet[index]);
        }
    });
    capsAlphabet.filter((letter, index) => {
        if (primaryCapsArray.includes(letter) === false) {
            secondaryCapsArray.push(capsAlphabet[index]);
        }
    });
    const secondaryLowerAsciiArray = generateAsciiCharactersFormula(primaryLowerAlphabet, secondaryLowerArray);
    secondaryLowerArray.forEach((letter, index) => {
        secondaryLowerAlphabet.push({char: letter, code: secondaryLowerAsciiArray[index]});
    });
    const secondaryCapsAsciiArray = generateAsciiCharactersFormula(primaryCapsAlphabet, secondaryCapsArray);
    secondaryCapsArray.forEach((letter, index) => {
        secondaryCapsAlphabet.push({char: letter, code: secondaryCapsAsciiArray[index]});
    });
    newLanguage.primaryLowerAlphabet = primaryLowerAlphabet;
    newLanguage.secondaryLowerAlphabet = secondaryLowerAlphabet;
    newLanguage.primaryCapsAlphabet = primaryCapsAlphabet;
    newLanguage.secondaryCapsAlphabet = secondaryCapsAlphabet;

    generateNumberAbbreviations(newLanguage);
};

const generateNonLatinCharactersArrays = async (newLanguage) => {
const Alphabet = newLanguage.Alphabet;
const primaryAlphabet = [];
const secondaryArray = [];
const secondaryAlphabet = [];
const primaryArray = [...Alphabet.slice(0,5), ...Alphabet.slice(9,14),
    ...Alphabet.slice(18,22)];
primaryArray.forEach((letter) => {
    primaryAlphabet.push({char: letter, code: letter.charCodeAt(0)});
});
Alphabet.filter((letter, index) => {
    if (primaryArray.includes(letter) === false) {
        secondaryArray.push(Alphabet[index]);
    }
});
const secondaryUnicodeArray = generateAsciiCharactersFormula(primaryAlphabet, secondaryArray);
secondaryArray.forEach((letter, index) => {
    secondaryAlphabet.push({char: letter, code: secondaryUnicodeArray[index]});
});
newLanguage.primaryAlphabet = primaryAlphabet;
newLanguage.secondaryAlphabet = secondaryAlphabet;

generateNonLatinNumberAbbreviations(newLanguage);
};

const generateAsciiCharactersFormula = (primaryAlphabet, secondaryArray) => {
const secondaryAsciiCodeArray = [];
secondaryArray.forEach((char, index) => {
    switch (index) {
        case 0:
            firstAsciiCode = primaryAlphabet[0].code;
            secondAsciiCode = primaryAlphabet[1].code;
        break;
        case 1:
            firstAsciiCode = primaryAlphabet[1].code;
            secondAsciiCode = primaryAlphabet[2].code;
        break;
        case 2:
            firstAsciiCode = primaryAlphabet[2].code;
            secondAsciiCode = primaryAlphabet[3].code;
        break;
        case 3:
            firstAsciiCode = primaryAlphabet[3].code;
            secondAsciiCode = primaryAlphabet[4].code;
        break;
        case 4:
            firstAsciiCode = primaryAlphabet[5].code;
            secondAsciiCode = primaryAlphabet[6].code;
        break;
        case 5:
            firstAsciiCode = primaryAlphabet[6].code;
            secondAsciiCode = primaryAlphabet[7].code;
        break;
        case 6:
            firstAsciiCode = primaryAlphabet[7].code;
            secondAsciiCode = primaryAlphabet[8].code;
        break;
        case 7:
            firstAsciiCode = primaryAlphabet[8].code;
            secondAsciiCode = primaryAlphabet[9].code;
        break;
        case 8:
            firstAsciiCode = primaryAlphabet[10].code;
            secondAsciiCode = primaryAlphabet[11].code;
        break;
        case 9:
            firstAsciiCode = primaryAlphabet[11].code;
            secondAsciiCode = primaryAlphabet[12].code;
        break;
        case 10:
            firstAsciiCode = primaryAlphabet[12].code;
            secondAsciiCode = primaryAlphabet[13].code;
        break;
        case 11:
            firstAsciiCode = primaryAlphabet[10].code;
            secondAsciiCode = primaryAlphabet[13].code;
        break;

        case 12:
            firstAsciiCode = primaryAlphabet[0].code;
            secondAsciiCode = primaryAlphabet[5].code;
        break;
        case 13:
            firstAsciiCode = primaryAlphabet[1].code;
            secondAsciiCode = primaryAlphabet[6].code;
        break;
        case 14:
            firstAsciiCode = primaryAlphabet[2].code;
            secondAsciiCode = primaryAlphabet[7].code;
        break;
        case 15:
            firstAsciiCode = primaryAlphabet[3].code;
            secondAsciiCode = primaryAlphabet[8].code;
        break;
        case 16:
            firstAsciiCode = primaryAlphabet[4].code;
            secondAsciiCode = primaryAlphabet[9].code;
        break;
        case 17:
            firstAsciiCode = primaryAlphabet[6].code;
            secondAsciiCode = primaryAlphabet[10].code;
        break;
        case 18:
            firstAsciiCode = primaryAlphabet[7].code;
            secondAsciiCode = primaryAlphabet[11].code;
        break;
        case 19:
            firstAsciiCode = primaryAlphabet[8].code;
            secondAsciiCode = primaryAlphabet[12].code;
        break;
        case 20:
            firstAsciiCode = primaryAlphabet[9].code;
            secondAsciiCode = primaryAlphabet[13].code;
        break;

        case 21:
            firstAsciiCode = primaryAlphabet[1].code;
            secondAsciiCode = primaryAlphabet[3].code;
        break;
        case 22:
            firstAsciiCode = primaryAlphabet[2].code;
            secondAsciiCode = primaryAlphabet[4].code;
        break;
        case 23:
            firstAsciiCode = primaryAlphabet[1].code;
            secondAsciiCode = primaryAlphabet[4].code;
        break;
        case 24:
            firstAsciiCode = primaryAlphabet[6].code;
            secondAsciiCode = primaryAlphabet[8].code;
        break;
        case 25:
            firstAsciiCode = primaryAlphabet[7].code;
            secondAsciiCode = primaryAlphabet[9].code;
        break;
        case 26:
            firstAsciiCode = primaryAlphabet[6].code;
            secondAsciiCode = primaryAlphabet[9].code;
        break;
        case 27:
            firstAsciiCode = primaryAlphabet[10].code;
            secondAsciiCode = primaryAlphabet[12].code;
        break;
        case 28:
            firstAsciiCode = primaryAlphabet[11].code;
            secondAsciiCode = primaryAlphabet[13].code;
        break;

        case 29:
            firstAsciiCode = primaryAlphabet[0].code;
            secondAsciiCode = primaryAlphabet[2].code;
        break;
        case 30:
            firstAsciiCode = primaryAlphabet[0].code;
            secondAsciiCode = primaryAlphabet[3].code;
        break;
        case 31:
            firstAsciiCode = primaryAlphabet[0].code;
            secondAsciiCode = primaryAlphabet[4].code;
        break;
        case 32:
            firstAsciiCode = primaryAlphabet[5].code;
            secondAsciiCode = primaryAlphabet[7].code;
        break;
        case 33:
            firstAsciiCode = primaryAlphabet[5].code;
            secondAsciiCode = primaryAlphabet[8].code;
        break;
        case 34:
            firstAsciiCode = primaryAlphabet[5].code;
            secondAsciiCode = primaryAlphabet[9].code;
        break;
    }
const charactersFormula = ((firstAsciiCode + secondAsciiCode) / 2) + firstAsciiCode;
secondaryAsciiCodeArray.push(charactersFormula);
});
return secondaryAsciiCodeArray;
};

const generateSpecialSymbols = async (language) => {
const firstKeypadLayer = language.firstKeypadLayer;
const specialSymbols = language.specialSymbols;
const specialSymbolFormula = [];
const specialSymbolsObject = [];
specialSymbols.forEach((symbol, index) => {
    if (symbol === "!" || symbol === "¡") {
        specialSymbolFormula.push(Math.pow(firstKeypadLayer[9].charCodeAt(0),2));
    }
    if (symbol === "@") {
       specialSymbolFormula.push(Math.pow(firstKeypadLayer[10].charCodeAt(0),2));
    }
    if (symbol === "?" || symbol === "¿" || symbol === "؟") {
        specialSymbolFormula.push(Math.pow(firstKeypadLayer[11].charCodeAt(0),2));
    }
    specialSymbolsObject.push({ char: symbol, code: specialSymbolFormula[index]});
});
try {
    await LatinLanguageCharacters.updateOne(
        { language: language.language },
        { $set: { specialSymbolsObject: specialSymbolsObject }}
    );
    await nonLatinLanguageCharacters.updateOne(
        { language: language.language },
        { $set: { specialSymbolsObject: specialSymbolsObject }}
    );
} catch (error) {
    console.log(error);
}
};

const generateNumberAbbreviations = async (newLanguage) => {
const primaryLowerAlphabet = newLanguage.primaryLowerAlphabet;
const numberAbbreviations = newLanguage.numberAbbreviations;
const numberAbbreviationFormula = [];
const numberAbbreviationsObject = [];
numberAbbreviations.forEach((number, index) => {
    if (number === "K") {
        numberAbbreviationFormula.push(primaryLowerAlphabet[1].code + primaryLowerAlphabet[6].code + primaryLowerAlphabet[10].code);
    }
    if (number === "M") {
        numberAbbreviationFormula.push(primaryLowerAlphabet[2].code + primaryLowerAlphabet[7].code + primaryLowerAlphabet[11].code);
    }
    if (number === "B") {
        numberAbbreviationFormula.push(primaryLowerAlphabet[3].code + primaryLowerAlphabet[8].code + primaryLowerAlphabet[12].code);
    }
    if (number === "T") {
        numberAbbreviationFormula.push(primaryLowerAlphabet[4].code + primaryLowerAlphabet[9].code + primaryLowerAlphabet[13].code);
    }
    numberAbbreviationsObject.push({ char: number, code: numberAbbreviationFormula[index]});
});
newLanguage.numberAbbreviationsObject = numberAbbreviationsObject;
};

const generateNonLatinNumberAbbreviations = async (newLanguage) => {
const primaryAlphabet = newLanguage.primaryAlphabet;
const numberAbbreviations = newLanguage.numberAbbreviations;
const numberAbbreviationFormula = [];
const numberAbbreviationsObject = [];
numberAbbreviations.forEach((number, index) => {
    if (number === "ألف") {
        numberAbbreviationFormula.push(primaryAlphabet[1].code + primaryAlphabet[6].code + primaryAlphabet[10].code);
    }
    if (number === "مليون") {
        numberAbbreviationFormula.push(primaryAlphabet[2].code + primaryAlphabet[7].code + primaryAlphabet[11].code);
    }
    if (number === "مليار") {
        numberAbbreviationFormula.push(primaryAlphabet[3].code + primaryAlphabet[8].code + primaryAlphabet[12].code);
    }
    if (number === "تريليون") {
        numberAbbreviationFormula.push(primaryAlphabet[4].code + primaryAlphabet[9].code + primaryAlphabet[13].code);
    }
    numberAbbreviationsObject.push({ char: number, code: numberAbbreviationFormula[index]});
});
newLanguage.numberAbbreviationsObject = numberAbbreviationsObject;
};

module.exports = { generateCharactersArrays, generateNonLatinCharactersArrays, generateSpecialSymbols };