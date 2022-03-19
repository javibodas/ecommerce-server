import { ApplicationResponse } from "contexts/shared/application/ApplicationResponse";
import UserId from "contexts/mooc/users/domain/UserId";

export default class DeleteUserResponse extends ApplicationResponse<UserId> {}