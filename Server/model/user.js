"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uuid = "", username = "", email = "", password = "", isAdmin = false, firstName = "", lastName = "", sex = "", address = "", postalCode = "", city = "", country = "") {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sex = sex;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
}
exports.User = User;
