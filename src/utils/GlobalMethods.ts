import {jwtDecode} from "jwt-decode";
import {ADMIN_ROLES} from "@/types/roles";
import {isAfter} from "date-fns";

export  function capitalizeFirstLetters(word: string | null| undefined) {
    if (word) {
        return word
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1) + ' ')
    }

}

export const isUserAdmin = (role: string) => {
    return ADMIN_ROLES.includes(role)
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const expiryTime = decoded.exp  * 1000;
        return isAfter(Date.now(), expiryTime);
    } catch (e) {
        console.log("error:: ", e)
        return false;
    }
}

export  function  getFirstLetterOfWord (word : undefined | string| null) {
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
