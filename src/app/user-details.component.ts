import { Component, Input, Output, EventEmitter } from "@angular/core";
import { LoginToken } from "./social-login/login-token";
import { UserDetails } from "./social-login/user-details";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html"
})
export class UserDetailsComponent {
    @Input() title?: string;
    @Input() loginToken?: LoginToken;
    @Input() userDetails?: UserDetails;
    @Output() logout: EventEmitter<any> = new EventEmitter();

    emitLogout() {
        this.logout.emit(true);
    }
}
