var ColorFirstLetters = {
    colorizeWordsFirstLetterByClass(className, color){
        const elems = document.getElementsByClassName(className);
        for(let i = 0; i<elems.length;i++){
            ColorFirstLetters.colorizeWordsFirstLetterOfElement(elems[i],color);
        }
    },

    colorizeWordsFirstLetterOfElement(domElement,color){
        domElement.innerHTML = ColorFirstLetters.colorizeWordsFirstLetter(domElement.innerHTML,color);
    },
    /**
    * @param {string} string
    * @param {string} color
    * @param {string=} splitChar
    */
    colorizeWordsFirstLetter(string, color, splitChar = " "){
        string = string.trim();
        stringArray = string.split(splitChar);
        for(let i = 0;i < stringArray.length;i++){
            const str = stringArray[i];
            stringArray[i] = `<span style = "color:${color}">${str.charAt(0)}</span>${str.substring(1)}`;
        }
        return stringArray.join(splitChar);
    }
}
