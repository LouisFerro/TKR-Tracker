export class Location {
  constructor ( public uuid:string = "", public user_uuid: string = "",
                public latitude: number = 0, public longitude: number = 0,
                public timestamp: Date = new Date() ) { }
}