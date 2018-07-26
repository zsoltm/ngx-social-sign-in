import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserDetails, LoginToken } from "social-sign-in";

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
