export class User {

    constructor(
        public email = '',
        public password = '',
        public token: string = '',
        public room: string = '',
        public name: string = '',
        public status: string = '',
    ) {}
         
    clone( ) {
        return new User (
            this.email = '',
            this.password = '',
            this.room = '',
            this.name = '',
            this.status = ''
        )
    }
}