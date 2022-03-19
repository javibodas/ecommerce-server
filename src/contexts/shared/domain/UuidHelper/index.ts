import { v4 as uuidv4 } from "uuid";

export default class UuidHelper {
	public generate(): string
	{
		return uuidv4()
	}
}
