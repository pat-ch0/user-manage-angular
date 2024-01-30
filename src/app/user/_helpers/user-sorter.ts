import { UserType } from "../../types/user-type";

export abstract class UserSorter {
    protected _ascDescOrder: number = 1

    abstract getSorter(): (a: UserType, b:UserType) => number
}