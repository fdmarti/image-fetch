import { v4 as uuidv4 } from 'uuid';

export class uuid {
    constructor() {}

    public static generate(): string {
        return uuidv4();
    }
}
