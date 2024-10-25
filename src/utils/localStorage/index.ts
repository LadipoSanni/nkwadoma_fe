export  const  setItemToLocalStorage = (name: string, item: string) => {
   if (typeof window !== 'undefined') {
      localStorage.setItem(name, item)
   }
}

export const getItemFromLocalStorage = (name: string) => {
   if (typeof window !== 'undefined') {
     return localStorage.getItem(name)
   }
}

