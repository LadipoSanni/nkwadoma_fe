import {jwtDecode} from "jwt-decode";
import {ROLES} from "@/types/roles";
import {isAfter} from "date-fns";
import {StaticImageData} from "next/image";

export function capitalizeFirstLetters(word: string | null | undefined): string {
    if (!word) return ""; 
    
    return word
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '); 
}
export function removeSpecialCharacterFromString(str: string | undefined): string {
    if (!str) return "";

    const cleaned = str
        .toLowerCase()
        .replaceAll('cooperate', 'co')
        .replaceAll('_', " ");

    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

}

export  function extractFirstCharacters(text: string ): string {
    return text
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
}


export function capitalizeWordsFromArray(arr: unknown): string {
    if (!Array.isArray(arr)) return '';

    const result = arr
        .filter(item => typeof item === 'string')
        .map(item =>
            item
                .toLowerCase()
                .split(' ')
                .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')
        )
        .join(', ');

    return result
        ? result.charAt(0).toUpperCase() + result.slice(1)
        : '';
}

export function insertSpaceCapitalized(str: unknown): string {
    if (typeof str !== 'string') return '';

    const spaced = str
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase();

    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}


export const isUserAdmin = (role: string) => {
    return ROLES.includes(role)
}

export const isTokenExpired = (token?: string): boolean => {
    if (!token) {
        // console.log('invalid token')
        return true;
    }else{
        try {
            const decoded: { exp: number } = jwtDecode(token);
            const expiryTime = decoded.exp  * 1000;
            // console.log('is it: ', isAfter(Date.now(), expiryTime))
            return isAfter(Date.now(), expiryTime);
        }catch (error){
            console.log(error);
            return true;
        }
    }
}

export const validateName = (name: string) : boolean | string  => {
    // const regex = /^[a-zA-Z][a-zA-Z0-9\s-_]*[a-zA-Z0-9]$/;
    if (/[\d ]/.test(name)) {
      return  'name can not contain digit'

    }
    if (/[|#%^*@()?>,.{!$}[=+":<]/.test(name)|| /^--+$/.test(name)) {
        return  'name can not contain special characters'
    }
    return /[a-zA-Z&]$/.test(name)

}

export const validateRcNumber = (name: string) : boolean | string  => {
    // const regex = /^[a-zA-Z][a-zA-Z0-9\s-_]*[a-zA-Z0-9]$/;
    if (/[a-zA-Z]/.test(name)) {
        return  'rc  can not contain letters'

    }
    if (/[^a-zA-Z0-9]/.test(name) || /^-+$/.test(name)|| /[|#%^&*@()?>,.{!$}[=+":<]/.test(name) ) {
        return  'name can not contain special characters'
    }
    return /^\d{8}$/.test(name)

}
export const validateEntityOwnership = (ownership: string) : boolean | string => {
    if (/[a-zA-Z]/.test(ownership)) {
        return  'ownership can not contain letters'

    }
    if (/[|#%^&*@()?>,.{!$}[=+":<]/.test(ownership) || /-+$/.test(ownership)) {
        return  'ownership can not contain special characters'
    }
    if (Number(ownership) > 100){
        // Number(ownership) < 1 ||
        return  'ownership should between 1 and 100'
    }
    return /^\d$/.test(ownership)

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
        return ans?.charAt(0) + ans?.charAt(1);
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

export const getInitials = (name: string): string => {
    if (!name) return ""; 
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(" ").filter((part) => part.length > 0);
    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

//   export function getInitial(firstName: string, lastName: string) {
//     if (!firstName || !lastName || typeof firstName !== 'string' || typeof lastName !== 'string') {
//         return "";
//     }
//     const firstInitial = firstName.charAt(0).toUpperCase();
//     const lastInitial = lastName.charAt(0).toUpperCase();
//     return firstInitial + lastInitial;
// }

export function getInitial(arg1: string | { firstName?: string, lastName?: string } | null | undefined, arg2?: string): string {
    if (typeof arg1 === 'string' && typeof arg2 === 'string') {
        const firstInitial = arg1.charAt(0).toUpperCase();
        const lastInitial = arg2.charAt(0).toUpperCase();
        return firstInitial + lastInitial;
    }

    if (typeof arg1 === 'string' && arg1.trim().length > 0) {
        const words = arg1.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }

        const firstInitial = words[0].charAt(0).toUpperCase();
        const secondInitial = words[1].charAt(0).toUpperCase();
        return firstInitial + secondInitial;
    }

    if (arg1 && typeof arg1 === 'object' && arg1.firstName && arg1.lastName) {
        const firstInitial = arg1.firstName.charAt(0).toUpperCase();
        const lastInitial = arg1.lastName.charAt(0).toUpperCase();
        return firstInitial + lastInitial;
    }

    return "";
}

export  const isValidUrl = (url: string  | StaticImageData) => {
    if (typeof url !== "string") {
        return true;
    }
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const ensureHttpsUrl = (url: string | null | undefined): string | undefined => {
    if (!url) return undefined;
    const cleaned = url.trim().replace(/^(https?:\/\/)?/i, '');
    return cleaned ? `https://${cleaned}` : undefined;
  };

  export const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  export function convertRole(roleKey: string) {
    if (!roleKey) return 'Unknown';
  
    const roleMap = {
      'COOPERATE_FINANCIER_SUPER_ADMIN': 'Super admin',
      'COOPERATE_FINANCIER_ADMIN': 'Admin',
      'FINANCIER': 'Financier',
      'MEEDL_SUPER_ADMIN': 'Super admin',
      'MEEDL_ADMIN': 'Admin',
      'PORTFOLIO_MANAGER': 'Portfolio manager',
      'PORTFOLIO_MANAGER_ASSOCIATE': 'Associate',
      'ORGANIZATION_SUPER_ADMIN': 'Super admin',
      'ORGANIZATION_ADMIN': 'Admin',
      'LOANEE': 'Loanee',
      'ORGANIZATION_ASSOCIATE': 'Associate'
    } as const; 
  
    type RoleKey = keyof typeof roleMap;
  
    return roleMap[roleKey as RoleKey] || 'Unknown Role';
  }


  export function formatSentence(sentence: string | null | undefined): string {
    if (!sentence) return "";
    
    return sentence
        .toLowerCase()    
        .replace(/_/g, ' ')
        .replace(/^\w/, (firstChar) => firstChar.toUpperCase()); 
}
  
  