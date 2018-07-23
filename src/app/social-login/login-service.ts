import { Observable } from "rxjs";
import { LoginToken } from "./login-token";
import { UserDetails } from "./user-details";

export interface LoginService {
    id: string;
    loginStatus(): Observable<LoginToken>;
    login(): Observable<LoginToken>;
    userDetails(token: LoginToken): Observable<UserDetails>;
}
