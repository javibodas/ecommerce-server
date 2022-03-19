import { ApplicationResponse } from "contexts/shared/application/ApplicationResponse";
import User from "contexts/backoffice/users/domain/User";

export default class GetUsersResponse extends ApplicationResponse<User[]> {}