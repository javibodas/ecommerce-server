import { ApplicationResponse } from "contexts/shared/application/ApplicationResponse";
import User from "contexts/mooc/users/domain/User";

export default class GetUserResponse extends ApplicationResponse<User> {}