import "reflect-metadata";
import {ProfileDto} from "./ProfileDto";
import {Type} from "class-transformer";

export class PostDto {
    _id: string;
    title: string
    description?: string
    body: string
    @Type(() => Date)
    createdAt: Date
    @Type(() => ProfileDto)
    user: ProfileDto
}
