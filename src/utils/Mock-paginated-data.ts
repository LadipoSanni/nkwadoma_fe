


export function getPaginatedData<T>(pageNumber:number, pageSize:number,notificationMockData:T[]) {
    const totalItems = notificationMockData.length;
    const startIndex = pageNumber * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const paginatedItems = notificationMockData.slice(startIndex, endIndex);
    const hasNextPage = endIndex < totalItems;
  
    return {
      pageNumber,
      pageSize,
      hasNextPage,
      notifications: paginatedItems,
      totalItems
    };
  }