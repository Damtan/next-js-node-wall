import "reflect-metadata";

export class ProfileDto {
    _id?: string
    createdAt: Date
    deletedAt?: Date
    firstName?: string
    lastName?: string
    role: number
    username: string
}
