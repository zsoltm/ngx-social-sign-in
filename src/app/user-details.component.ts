import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserDetails, LoginToken } from "social-sign-in";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html"
})
export class UserDetailsComponent {
    @Input() loginToken?: LoginToken;
    @Output() logout: EventEmitter<any> = new EventEmitter();
    @Input() title?: string;
    @Input() userDetails?: UserDetails;

    emitLogout() {
        this.logout.emit(true);
    }
}
