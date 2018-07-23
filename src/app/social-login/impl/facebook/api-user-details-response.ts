import { ApiPictureResponse } from "./api-picture-response";

export interface ApiUserDetailsResponse {
    id: string;
    email: string;
    name: string;
    picture: { data: ApiPictureResponse };
}
