export class User {
  constructor(public uuid:string="",public username:string="",public email:string="",
              public password:string="",public isLoggedIn:boolean=false,public isAdmin:boolean=false,
              public firstname:string="",public lastname:string="",public sex="",
              public street="",public postal_code="",public city:string="",public country:string=""){
  }
}
