"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uuid = "", username = "", email = "", password = "", isAdmin = false, firstname = "", lastname = "", sex = "", street = "", postal_code = "", city = "", country = "") {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.firstname = firstname;
        this.lastname = lastname;
        this.sex = sex;
        this.street = street;
        this.postal_code = postal_code;
        this.city = city;
        this.country = country;
    }
}
exports.User = User;
