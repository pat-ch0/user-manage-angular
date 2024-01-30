import { UserType } from "../../types/user-type";
import { UserSorter } from "./user-sorter";

export class LastnameUserSorter extends UserSorter {
    constructor() {
        super()
    }

    getSorter(): (a: UserType, b:UserType) => number {
        const sorter = (a: UserType, b: UserType) => {
            const order = a.lastname.localeCompare(b.lastname) * this._ascDescOrder
            return order
        }
        this._ascDescOrder *= -1
        return sorter
    }
}