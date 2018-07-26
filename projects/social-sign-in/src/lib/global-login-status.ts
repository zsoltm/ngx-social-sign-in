import { SignInToken } from "./login-token";

export interface GlobalSignInStatus {
    facebook?: SignInToken;
    google?: SignInToken;
}
