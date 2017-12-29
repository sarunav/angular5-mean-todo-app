export class Todo {
    constructor(
        public _id?: string,
        public owner?: string,
        public name?: string,
        public note?: string,
        public completed?: boolean
    ) {

    }
}