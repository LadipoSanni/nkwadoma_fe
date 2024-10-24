export  const  setItemToLocalStorage = (name: string, item: string) => {
   if (typeof window !== 'undefined') {
      localStorage.setItem(name, item)

   }
}

