class HttpStatusText{ constructor(status,data) {
   return {
    status:status,
    data:data
   }
    
    
}};
class Success {
    constructor( data){
        return {
            status:"success",
            data:data
        }
    }
}
class Fail {
    constructor( data){
        return {
            status:"fail",
            data:data
        }
    }
}
class Error {
    constructor( message){
        return {
            status:"error",
            message:message
        }
    }
}

export default {
    Success,
    Fail,
    Error
};