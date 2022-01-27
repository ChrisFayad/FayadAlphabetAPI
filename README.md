# FayadAlphabet REST API

- The Fayad Alphabet is a method of tactile signing that was inspired by The Lorm alphabet which targeted the German Language, it was developed by Hieronymus Lorm in the late of 19th century.

- This API give us the ability to create the layout of hand-touch alphabet for any language from Latin origin or non-Latin origin.

- The main idea behind designing this API is to create a new way of communication for deaf-blind people through Argo+ Glove. The glove translates the hand-touch alphabet (which get generated by the FayadAlphabet API), into text and vice versa.

- For now we are creating a Chat Application that gonna simulate the Argo+ Glove using the FayadAlphabet API.

---

#### Listing existing languages

<details>
 <summary><code>GET</code> <code><b>/languages</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                                |
> | --------- | ------------------ | ------------------------------------------------------- |
> | `200`     | `application/json` | `application/json`                                      |
> | `500`     | `application/json` | `{ msg: 'app could not retrieve data from database!' }` |

##### Example

> ```Postman
>  GET -> https://localhost:7000/languages
> ```

</details>

---

#### Listing an existing language

<details>
 <summary><code>GET</code> <code><b>/languages/:language</b></code> <code>(gets all the details associated with a particular language)</code></summary>

##### Parameters

> | name     | type     | data type          |
> | -------- | -------- | ------------------ |
> | language | required | `application/json` |

##### Responses

> | http code | content-type       | response                                                     |
> | --------- | ------------------ | ------------------------------------------------------------ |
> | `200`     | `application/json` | Check the example below                                      |
> | `404`     | `application/json` | `` { msg: `The ${languageQuery} Language is not found!` } `` |

##### Example

> ```Postman
>  GET -> https://localhost:7000/languages/:language
>  Path Variables: KEY -> language, VALUE -> English
> ```

</details>

---

#### Creating a new Latin based Language

<details>
 <summary><code>POST</code> <code><b>/languages</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `201`     | `application/json` | `The ${newLanguage.language} Language has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                 |
> | `500`     | `application/json` | `${error.message}`                                     |

##### Example

> ```POSTMAN
>  POST -> https://localhost:7000/languages
>  Body -> {
>            "language": "German",
>            "capsAlphabet": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ä", "Ö", "Ü", "ẞ"],
>            "lowerAlphabet": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß"]
>          }
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/languages?unicode=true</b></code> <code>(give the user option to insert the alphabet arrays as unicode instead of letters)</code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `201`     | `application/json` | `The ${newLanguage.language} Language has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                 |
> | `500`     | `application/json` | `${error.message}`                                     |

##### Example

> ```Postman
>  POST -> https://localhost:7000/languages?unicode=true
>  Body -> {
>           "language": "Spanish",
>           "capsAlphabet": ["0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049", "004A", "004B", "004C", "004D", "004E", "00D1", "004F", "0050", "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058", "0059", "005A", "00C1", "00C9", "00CD", "00D3", "00DA", "00DD", "00CA", "00DC"],
>           "lowerAlphabet": ["0061", "0062", "0063", "0064", "0065", "0066", "0067", "0068", "0069", "006A", "006B", "006C", "006D", "006E", "00F1", "006F", "0070", "0071", "0072", "0073", "0074", "0075", "0076", "0077", "0078", "0079", "007A", "00E1", "00E9", "00ED", "00F3", "00FA", "00FD", "00EA", "00FC"],
>           "specialSymbols": ["¡", "@", "¿"],
>           "thirdKeypadLayer": ["0025", "005F", "0027", "0028", "0029", "0024", "00AB", "00BB", "20AC", "002C", "003A", "00A3"],
>           "fourthKeypadLayer": ["005C", "007C", "007E", "003C", "003E", "005E", "005B", "005D", "003B", "007B", "007D", "0060"]
>          }
> ```

</details>

---

#### Creating a new non-Latin based Language

<details>
 <summary><code>POST</code> <code><b>/languages/nonLatin</b></code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `201`     | `application/json` | `The ${newLanguage.language} Language has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                 |
> | `500`     | `application/json` | `${error.message}`                                     |

##### Example

> ```Postman
>  POST -> https://localhost:7000/languages/nonLatin
>  Body -> {
>            "language": "Arabic",
>            "Alphabet": ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي", "آ", "ى", "ة", "أ", "ؤ", "إ", "ئ", "ء", "ً", "ٌ", "ٍ", "َ", "ُ", "ِ", "ّ", "ْ"],
>            "firstKeypadLayer": ["٧", "٨", "٩", "٤", "٥", "٦", "١", "٢", "٣", "*", "٠", "#"],
>            "thirdKeypadLayer": ["066A", "005F", "0027", "0028", "0029", "0024", "0022", "003A", "20AC", "060C", "061B", "00A3"]
>          }
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/languages/nonLatin?unicode=true</b></code> <code>(give the user option to insert the alphabet arrays as unicode instead of letters)</code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `201`     | `application/json` | `The ${newLanguage.language} Language has been added!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                 |
> | `500`     | `application/json` | `${error.message}`                                     |

##### Example

> ```Postman
>  POST -> https://localhost:7000/languages/nonLatin?unicode=true
>  Body ->  {
>             "language": "Arabic",
>             "Alphabet": ['0627','0628','062A','062B','062C','062D', '062E', '062F', '0630', '0631', '0632', '0633', '0634', '0635', '0636', '0637', '0638', '0639', '063A', '0641', '0642', '0643', '0644', '0645', '0646', '0647', '0648', '064A', '0622', '0649', '0629', '0623', '0624', '0625', '0626', '0621', '064B', '064C', '064D', '064E', '064F', '0650', '0651', '0652', '007E'],
>             "firstKeypadLayer": [ '0661', '0662', '0663', '0664', '0665', '0666', '0667', '0668', '0669', '002A', '0660', '0023']
>           }
> ```

</details>

---

#### Updating an existing language

<details>
  <summary><code>PATCH</code> <code><b>/languages</b></code> <code>(update only the Keypad arrays for a particular language)</code></summary>

##### Parameters

> | name     | type     | data type          |
> | -------- | -------- | ------------------ |
> | language | required | `application/json` |

##### Responses

> | http code | content-type       | response                                                 |
> | --------- | ------------------ | -------------------------------------------------------- |
> | `200`     | `application/json` | `The ${newLanguage.language} Language has been updated!` |
> | `422`     | `application/json` | `{ msg: error.message.split(':')[2] }`                   |
> | `500`     | `application/json` | `${error.message}`                                       |

##### Example

> ```Postman
>  PATCH -> https://localhost:7000/languages/:language
>  Path Variables: KEY -> language, VALUE -> English
>  Body -> {
>             "firstKeypadLayer": ["*", "0", "#"]
>          }
> ```

</details>

---

#### Deleting an existing language

<details>
  <summary><code>DELETE</code> <code><b>/languages</b></code> <code>(deletes a particular language)</code></summary>

##### Parameters

> | name     | type     | data type          |
> | -------- | -------- | ------------------ |
> | language | required | `application/json` |

##### Responses

> | http code | content-type       | response                                                      |
> | --------- | ------------------ | ------------------------------------------------------------- |
> | `200`     | `application/json` | `The ${languageQuery} Language has been deleted!`             |
> | `404`     | `application/json` | `` { msg: `The ${languageQuery} Language is not found!` }  `` |

##### Example

> ```Postman
>  DELETE -> https://localhost:7000/languages/:language
>  Path Variables: KEY -> language, VALUE -> German
> ```

</details>

---
