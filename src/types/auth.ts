export interface LoginFailProps  {
    error :{
    status: number,
        data: {
        message: string,
            status: number,
            timeStamp: number
    }
}
}