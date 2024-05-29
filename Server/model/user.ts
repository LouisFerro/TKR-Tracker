export class User {
    constructor(public uuid:string="",public username:string="",public email:string="",
                public password:string="",public isAdmin:boolean=false,
                public firstName:string="",public lastName:string="",public sex="",
                public address="",public postalCode="",public city:string="",public country:string=""){
    }
}

