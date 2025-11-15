class AppError extends Error{
    constructor(){
        super();
    };
     create(code,status,message) {
        this.status=status;
        this.message=message;
        this.code=code;
        return this;
    }
}

export default new AppError()