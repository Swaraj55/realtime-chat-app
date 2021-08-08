export class User {

    constructor(
        public email = '',
        public password = '',
        public token = '',
        public room = '',
        public name = '',
        public status = ''
    ) { }

    clone() {
        return new User (
            this.email = '',
            this.name = '',
            this.password = '',
            this.room = '',
            this.token = '',
            this.status = ''
        )
    }
}