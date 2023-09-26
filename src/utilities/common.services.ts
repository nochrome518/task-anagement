export interface IResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
    error?: any;
}

export class CommonFunctionService { 

    successResponse(msg: string): IResponse {
        const resObject: IResponse = {
            success: true,
            statusCode: 200,
            message: msg,
            // data: msg
        };
        return resObject;
    }
    
    successResponseWithData(msg: string, data: any): IResponse {
        const resObject: IResponse = {
            success: true,
            statusCode: 200,
            message: msg,
            data: data
        };
        return resObject;
    }

}
