export class User {
    constructor(
        public id?: string,
        public loggedInToken?: object,
        public name?: string,
        public userName?: string,
        public password?: string
    ) {}
}
