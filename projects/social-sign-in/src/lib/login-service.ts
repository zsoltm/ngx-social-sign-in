import { Observable } from "rxjs";
import { SignInToken } from "./login-token";
import { UserDetails } from "./user-details";

export interface SignInService {
    id: string;
    signIn(): Observable<SignInToken>;
    signInStatus(): Observable<SignInToken | null>;
    signInWithUserDetails(): Observable<[SignInToken, UserDetails]>;
    signOut(): Observable<boolean>;
    userDetails(token: SignInToken): Observable<UserDetails>;
}
