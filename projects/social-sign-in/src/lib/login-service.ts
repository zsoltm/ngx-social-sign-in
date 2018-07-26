import { Observable } from "rxjs";
import { LoginToken } from "./login-token";
import { UserDetails } from "./user-details";

export interface LoginService {
    id: string;
    loginStatus(): Observable<LoginToken | null>;
    login(): Observable<LoginToken>;
    logout(): Observable<boolean>;
    userDetails(token: LoginToken): Observable<UserDetails>;
    loginWithUserDetails(): Observable<[LoginToken, UserDetails]>;
}
