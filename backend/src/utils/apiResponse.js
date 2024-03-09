class apiResponse{
     constructor(
          statusCode,
          data,
          message="Sucess"
     ){
          this.statusCode = statusCode
          this.data =data
          this.message = message,
          this.status = statusCode<400
     }
}

export { apiResponse }