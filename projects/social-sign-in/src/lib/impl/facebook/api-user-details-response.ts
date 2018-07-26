import { ApiPictureResponse } from "./api-picture-response";

export interface ApiUserDetailsResponse {
    email: string;
    id: string;
    name: string;
    picture: { data: ApiPictureResponse };
}
