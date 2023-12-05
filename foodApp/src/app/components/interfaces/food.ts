import { Rating } from "./rating";

export interface Food {
    foodName:string;
    foodType:string
    foodCategory:Array<string>;
    foodDescription:string;
    foodImage:string;
    foodPrice:string;
    foodRating:Array<Rating>|undefined;
}
