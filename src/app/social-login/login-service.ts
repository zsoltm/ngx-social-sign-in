import { Observable } from "rxjs";
import { LoginStatus } from "./login-status";

export interface LoginService {
    id: string;
    loginStatus(): Observable<LoginStatus>;
}
