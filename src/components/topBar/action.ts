import {getItemSessionStorage} from "@/utils/storage";


export const getUserDetailsFromStorage = (name: string)=> {
    return getItemSessionStorage(name);
}