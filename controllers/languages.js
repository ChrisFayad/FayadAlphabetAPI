// const { version } = require('mongoose');
const LanguageCharacters = require('../models/languageCharacters');
const nonLatinLanguageCharacters = require('../models/nonLatinLanguageCharacters');

const getAllLanguages = async (req, res) => {
    try {
        let languages = [];
        const latinLanguages = await LanguageCharacters.find();
        const nonLatinLanguages = await nonLatinLanguageCharacters.find();
        res.status(200);
        latinLanguages.forEach(language => languages.push(language)); 
        nonLatinLanguages.forEach(language => languages.push(language));
        languages.forEach(language => res.json(language.language));
    } catch (error) {
        res.status(500).json({ msg: 'app could not retrieve data from database!' });
    }
};

const getLanguage = async (req, res) => {
    try {
        let language = '';
        language = await LanguageCharacters.findOne({language: req.params.language});
        language = await nonLatinLanguageCharacters.findOne({language: req.params.language});
        res.status(200).json(language);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

const createLanguage = async (req, res) => {
    let newLanguage = new LanguageCharacters(req.body);
    const lowerUnicodeArray = [];
    const capsUnicodeArray = [];
    const secondKeypadUnicode = [];
    const thirdKeypadUnicode = [];
    const fourthKeypadUnicode = [];
    try {
        if (newLanguage.language === "Spanish") {
            newLanguage.lowerAlphabet.forEach((char) => {
                lowerUnicodeArray.push(String.fromCharCode(parseInt(char, 16)));
            });
            newLanguage.lowerAlphabet = lowerUnicodeArray;
            newLanguage.capsAlphabet.forEach((char) => {
                capsUnicodeArray.push(String.fromCharCode(parseInt(char, 16)));
            });
            newLanguage.capsAlphabet = capsUnicodeArray;
        }
        generateCharactersArrays(newLanguage);
        generateSpecialSymbols(newLanguage);
        newLanguage.secondKeypadLayer.forEach((char) => {
            secondKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.secondKeypadLayer = secondKeypadUnicode;
        newLanguage.thirdKeypadLayer.forEach((char) => {
            thirdKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.thirdKeypadLayer = thirdKeypadUnicode;
        newLanguage.fourthKeypadLayer.forEach((char) => {
            fourthKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.fourthKeypadLayer = fourthKeypadUnicode;
        await newLanguage.save();
        res.status(201).json(`The ${newLanguage.language} Language has been added!`);
    } catch (error) {
        res.status(400).json({msg: `The Data is not valid, try again`});
    }
};

const createNonLatinLanguage = async (req, res) => {
    let newLanguage = new nonLatinLanguageCharacters(req.body);
    const secondKeypadUnicode = [];
    const thirdKeypadUnicode = [];
    const fourthKeypadUnicode = [];
    try {
        generateNonLatinCharactersArrays(newLanguage);
        generateSpecialSymbols(newLanguage);
        newLanguage.secondKeypadLayer.forEach((char) => {
            secondKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.secondKeypadLayer = secondKeypadUnicode;
        newLanguage.thirdKeypadLayer.forEach((char) => {
            thirdKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.thirdKeypadLayer = thirdKeypadUnicode;
        newLanguage.fourthKeypadLayer.forEach((char) => {
            fourthKeypadUnicode.push(String.fromCharCode(parseInt(char, 16)));
        });
        newLanguage.fourthKeypadLayer = fourthKeypadUnicode;
        await newLanguage.save();
        res.status(201).json(`The ${newLanguage.language} Language has been added!`);
    } catch (error) {
    res.status(400).json({msg: `The Data is not valid, try again`});
    }
};

const modifyLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        await LanguageCharacters.updateOne(
            { language: languageQuery },
            req.body
        );
        res.status(200).json(`The ${languageQuery} Language has been updated!`);
    } catch (error) {
        res.status(400).json({msg: error});
    }
};

const deleteLanguage = async (req, res) => {
    const languageQuery = req.query.language;
    try {
        await LanguageCharacters.deleteOne({language: languageQuery});
        res.status(200).json(`The ${languageQuery} Language has been deleted!`);
    } catch (error) {
        res.status(404).json({ msg: `The ${languageQuery} Language is not found!` });
    }
};

const generateCharactersArrays = async (language) => {
        const lowerAlphabet = language.lowerAlphabet;
        const capsAlphabet = language.capsAlphabet;
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
        const secondaryLowerAsciiArray = generateAsciiLowerCharactersFormula(secondaryLowerArray);
        secondaryLowerArray.forEach((letter, index) => {
            secondaryLowerAlphabet.push({char: letter, code: secondaryLowerAsciiArray[index]});
        });
        const secondaryCapsAsciiArray = generateAsciiCapsCharactersFormula(secondaryCapsArray);
        secondaryCapsArray.forEach((letter, index) => {
            secondaryCapsAlphabet.push({char: letter, code: secondaryCapsAsciiArray[index]});
        });
        await LanguageCharacters.updateOne(
                { language: language.language },
                { $set: {
                            primaryLowerAlphabet: primaryLowerAlphabet,
                            secondaryLowerAlphabet: secondaryLowerAlphabet,
                            primaryCapsAlphabet: primaryCapsAlphabet,
                            secondaryCapsAlphabet: secondaryCapsAlphabet,
                    } }
            );
        const upToDateLanguage = await LanguageCharacters.findOne({language: language.language});
        generateNumberAbbreviations(upToDateLanguage);
};

const generateAsciiLowerCharactersFormula = (secondaryLowerAlphabet) => {
    const secondaryLowerAsciiCodeArray = [];
    secondaryLowerAlphabet.forEach((char, index) => {
        switch (index) {
            case 0:
                firstAsciiCode = 97;
                secondAsciiCode = 98;
            break;
            case 1:
                firstAsciiCode = 98;
                secondAsciiCode = 99;
            break;
            case 2:
                firstAsciiCode = 99;
                secondAsciiCode = 100;
            break;
            case 3:
                firstAsciiCode = 100;
                secondAsciiCode = 101;
            break;
            case 4:
                firstAsciiCode = 106;
                secondAsciiCode = 107;
            break;
            case 5:
                firstAsciiCode = 107;
                secondAsciiCode = 108;
            break;
            case 6:
                firstAsciiCode = 108;
                secondAsciiCode = 109;
            break;
            case 7:
                firstAsciiCode = 109;
                secondAsciiCode = 110;
            break;
            case 8:
                firstAsciiCode = 115;
                secondAsciiCode = 116;
            break;
            case 9:
                firstAsciiCode = 116;
                secondAsciiCode = 117;
            break;
            case 10:
                firstAsciiCode = 117;
                secondAsciiCode = 118;
            break;
            case 11:
                firstAsciiCode = 115;
                secondAsciiCode = 118;
            break;
    
            case 12:
                firstAsciiCode = 97;
                secondAsciiCode = 106;
            break;
            case 13:
                firstAsciiCode = 98;
                secondAsciiCode = 107;
            break;
            case 14:
                firstAsciiCode = 99;
                secondAsciiCode = 108;
            break;
            case 15:
                firstAsciiCode = 100;
                secondAsciiCode = 109;
            break;
            case 16:
                firstAsciiCode = 101;
                secondAsciiCode = 110;
            break;
            case 17:
                firstAsciiCode = 107;
                secondAsciiCode = 115;
            break;
            case 18:
                firstAsciiCode = 108;
                secondAsciiCode = 116;
            break;
            case 19:
                firstAsciiCode = 109;
                secondAsciiCode = 117;
            break;
            case 20:
                firstAsciiCode = 110;
                secondAsciiCode = 118;
            break;
    
            case 21:
                firstAsciiCode = 98;
                secondAsciiCode = 100;
            break;
            case 22:
                firstAsciiCode = 99;
                secondAsciiCode = 101;
            break;
            case 23:
                firstAsciiCode = 98;
                secondAsciiCode = 101;
            break;
            case 24:
                firstAsciiCode = 107;
                secondAsciiCode = 109;
            break;
            case 25:
                firstAsciiCode = 108;
                secondAsciiCode = 110;
            break;
            case 26:
                firstAsciiCode = 107;
                secondAsciiCode = 110;
            break;
            case 27:
                firstAsciiCode = 115;
                secondAsciiCode = 117;
            break;
            case 28:
                firstAsciiCode = 116;
                secondAsciiCode = 118;
            break;
        }
    const charactersFormula = ((firstAsciiCode + secondAsciiCode) / 2) + firstAsciiCode;
    secondaryLowerAsciiCodeArray.push(charactersFormula);
    });
    return secondaryLowerAsciiCodeArray;
};

const generateAsciiCapsCharactersFormula = (secondaryCapsAlphabet) => {
    const secondaryCapsAsciiCodeArray = [];
    secondaryCapsAlphabet.forEach((char, index) => {
        switch (index) {
            case 0:
                firstAsciiCode = 65;
                secondAsciiCode = 66;
            break;
            case 1:
                firstAsciiCode = 66;
                secondAsciiCode = 67;
            break;
            case 2:
                firstAsciiCode = 67;
                secondAsciiCode = 68;
            break;
            case 3:
                firstAsciiCode = 68;
                secondAsciiCode = 69;
            break;
            case 4:
                firstAsciiCode = 74;
                secondAsciiCode = 75;
            break;
            case 5:
                firstAsciiCode = 75;
                secondAsciiCode = 76;
            break;
            case 6:
                firstAsciiCode = 76;
                secondAsciiCode = 77;
            break;
            case 7:
                firstAsciiCode = 77;
                secondAsciiCode = 78;
            break;
            case 8:
                firstAsciiCode = 83;
                secondAsciiCode = 84;
            break;
            case 9:
                firstAsciiCode = 84;
                secondAsciiCode = 85;
            break;
            case 10:
                firstAsciiCode = 85;
                secondAsciiCode = 86;
            break;
            case 11:
                firstAsciiCode = 83;
                secondAsciiCode = 86;
            break;
    
            case 12:
                firstAsciiCode = 65;
                secondAsciiCode = 74;
            break;
            case 13:
                firstAsciiCode = 66;
                secondAsciiCode = 75;
            break;
            case 14:
                firstAsciiCode = 67;
                secondAsciiCode = 76;
            break;
            case 15:
                firstAsciiCode = 68;
                secondAsciiCode = 77;
            break;
            case 16:
                firstAsciiCode = 69;
                secondAsciiCode = 78;
            break;
            case 17:
                firstAsciiCode = 75;
                secondAsciiCode = 83;
            break;
            case 18:
                firstAsciiCode = 76;
                secondAsciiCode = 84;
            break;
            case 19:
                firstAsciiCode = 77;
                secondAsciiCode = 85;
            break;
            case 20:
                firstAsciiCode = 78;
                secondAsciiCode = 86;
            break;
    
            case 21:
                firstAsciiCode = 66;
                secondAsciiCode = 68;
            break;
            case 22:
                firstAsciiCode = 67;
                secondAsciiCode = 69;
            break;
            case 23:
                firstAsciiCode = 66;
                secondAsciiCode = 69;
            break;
            case 24:
                firstAsciiCode = 75;
                secondAsciiCode = 77;
            break;
            case 25:
                firstAsciiCode = 76;
                secondAsciiCode = 78;
            break;
            case 26:
                firstAsciiCode = 75;
                secondAsciiCode = 78;
            break;
            case 27:
                firstAsciiCode = 83;
                secondAsciiCode = 85;
            break;
            case 28:
                firstAsciiCode = 84;
                secondAsciiCode = 86;
            break;
        }
    const charactersFormula = ((firstAsciiCode + secondAsciiCode) / 2) + firstAsciiCode;
    secondaryCapsAsciiCodeArray.push(charactersFormula);
    });
    return secondaryCapsAsciiCodeArray;
};

const generateNonLatinCharactersArrays = async (language) => {
    const Alphabet = language.Alphabet;
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
    const secondaryUnicodeArray = generateUnicodeNonLatinCharactersFormula(secondaryArray);
    secondaryArray.forEach((letter, index) => {
        secondaryAlphabet.push({char: letter, code: secondaryUnicodeArray[index]});
    });
    await nonLatinLanguageCharacters.updateOne(
        { language: language.language },
        { $set: {
                    primaryAlphabet: primaryAlphabet,
                    secondaryAlphabet: secondaryAlphabet
            } }
    );
    const upToDateLanguage = await nonLatinLanguageCharacters.findOne({language: language.language});
    generateNonLatinNumberAbbreviations(upToDateLanguage);
};

const generateUnicodeNonLatinCharactersFormula = (secondaryAlphabet) => {
    const secondaryUnicodeArray = [];
    secondaryAlphabet.forEach((char, index) => {
        switch (index) {
            case 0:
                firstAsciiCode = 1575;
                secondAsciiCode = 1576;
            break;
            case 1:
                firstAsciiCode = 1576;
                secondAsciiCode = 1578;
            break;
            case 2:
                firstAsciiCode = 1578;
                secondAsciiCode = 1579;
            break;
            case 3:
                firstAsciiCode = 1579;
                secondAsciiCode = 1580;
            break;
            case 4:
                firstAsciiCode = 1585;
                secondAsciiCode = 1586;
            break;
            case 5:
                firstAsciiCode = 1586;
                secondAsciiCode = 1587;
            break;
            case 6:
                firstAsciiCode = 1587;
                secondAsciiCode = 1588;
            break;
            case 7:
                firstAsciiCode = 1588;
                secondAsciiCode = 1589;
            break;
            case 8:
                firstAsciiCode = 1594;
                secondAsciiCode = 1601;
            break;
            case 9:
                firstAsciiCode = 1601;
                secondAsciiCode = 1602;
            break;
            case 10:
                firstAsciiCode = 1602;
                secondAsciiCode = 1603;
            break;
            case 11:
                firstAsciiCode = 1594;
                secondAsciiCode = 1603;
            break;
    
            case 12:
                firstAsciiCode = 1575;
                secondAsciiCode = 1585;
            break;
            case 13:
                firstAsciiCode = 1576;
                secondAsciiCode = 1586;
            break;
            case 14:
                firstAsciiCode = 1578;
                secondAsciiCode = 1587;
            break;
            case 15:
                firstAsciiCode = 1579;
                secondAsciiCode = 1588;
            break;
            case 16:
                firstAsciiCode = 1580;
                secondAsciiCode = 1589;
            break;
            case 17:
                firstAsciiCode = 1586;
                secondAsciiCode = 1594;
            break;
            case 18:
                firstAsciiCode = 1587;
                secondAsciiCode = 1601;
            break;
            case 19:
                firstAsciiCode = 1588;
                secondAsciiCode = 1602;
            break;
            case 20:
                firstAsciiCode = 1589;
                secondAsciiCode = 1603;
            break;
    
            case 21:
                firstAsciiCode = 1576;
                secondAsciiCode = 1579;
            break;
            case 22:
                firstAsciiCode = 1578;
                secondAsciiCode = 1580;
            break;
            case 23:
                firstAsciiCode = 1576;
                secondAsciiCode = 1580;
            break;
            case 24:
                firstAsciiCode = 1586;
                secondAsciiCode = 1588;
            break;
            case 25:
                firstAsciiCode = 1587;
                secondAsciiCode = 1589;
            break;
            case 26:
                firstAsciiCode = 1586;
                secondAsciiCode = 1589;
            break;
            case 27:
                firstAsciiCode = 1594;
                secondAsciiCode = 1602;
            break;
            case 28:
                firstAsciiCode = 1601;
                secondAsciiCode = 1603;
            break;

            case 29:
                firstAsciiCode = 1575;
                secondAsciiCode = 1578;
            break;
            case 30:
                firstAsciiCode = 1575;
                secondAsciiCode = 1579;
            break;
            case 31:
                firstAsciiCode = 1575;
                secondAsciiCode = 1580;
            break;
            case 32:
                firstAsciiCode = 1585;
                secondAsciiCode = 1587;
            break;
            case 33:
                firstAsciiCode = 1585;
                secondAsciiCode = 1588;
            break;
            case 34:
                firstAsciiCode = 1585;
                secondAsciiCode = 1589;
            break;
        }
    const charactersFormula = ((firstAsciiCode + secondAsciiCode) / 2) + firstAsciiCode;
    secondaryUnicodeArray.push(charactersFormula);
    });
    return secondaryUnicodeArray;
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
        await LanguageCharacters.updateOne(
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

const generateNumberAbbreviations = async (language) => {
    const primaryLowerAlphabet = language.primaryLowerAlphabet;
    const numberAbbreviations = language.numberAbbreviations;
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
    await LanguageCharacters.updateOne(
        { language: language.language },
        { $set: { numberAbbreviationsObject: numberAbbreviationsObject }}
    );
};

const generateNonLatinNumberAbbreviations = async (language) => {
    const primaryAlphabet = language.primaryAlphabet;
    const numberAbbreviations = language.numberAbbreviations;
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
    await nonLatinLanguageCharacters.updateOne(
        { language: language.language },
        { $set: { numberAbbreviationsObject: numberAbbreviationsObject }}
    );
};

module.exports = {getAllLanguages, getLanguage, createLanguage, createNonLatinLanguage, modifyLanguage, deleteLanguage};