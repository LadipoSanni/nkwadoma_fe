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
export interface Error {
    status: number,
        data : {
        message: string,
        timeStamp: string,
        statusCode: string
    }
}