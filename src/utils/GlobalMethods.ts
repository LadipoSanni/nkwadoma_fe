export  function capitalizeFirstLetters  (word: undefined | string ) {
    if (word) {
        return word
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1) + ' ')
    }

}

export  function  getFirstLetterOfWord (word : undefined | string) {
    let ans = '';

    if (word) {
        const capitalizedFirstWords =
            word
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1));

        capitalizedFirstWords.map(letter => {
            Array.from(letter).forEach(elem => {
                if (elem === elem.toUpperCase()) {
                    ans = ans.concat(elem)
                }
            })
        })
        return ans;
    }
}


export function removeContent(content:string ,word: string| null ){
    if (word) {
        return word.replace(content, "")
    }
}



export const validateEmailInput = (input: string ) => {
    const validRegex  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!RegExp(validRegex).exec(input);

}
