import { Observable } from "rxjs";
import { LoginToken } from "./login-token";
import { UserDetails } from "./user-details";

export interface LoginService {
    id: string;
    login(): Observable<LoginToken>;
    loginStatus(): Observable<LoginToken | null>;
    loginWithUserDetails(): Observable<[LoginToken, UserDetails]>;
    logout(): Observable<boolean>;
    userDetails(token: LoginToken): Observable<UserDetails>;
}
