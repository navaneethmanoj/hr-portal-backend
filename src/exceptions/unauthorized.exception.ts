import { CustomError } from "../utils/error.code";
import HttpException from "./http.exception";

class UnauthorizedException extends HttpException {
  constructor(error: CustomError) {
    super(403, error.MESSAGE);
  }
}

export default UnauthorizedException;
