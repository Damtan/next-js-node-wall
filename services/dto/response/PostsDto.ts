import "reflect-metadata";
import { Type } from "class-transformer";
import { PostDto } from "./PostDto";

export class PostsDto {
    public limit: number
    public page: number
    public count: number;

    @Type(() => PostDto)
    public items: PostDto[];
}
