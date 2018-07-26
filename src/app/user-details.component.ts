import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserDetails, SignInToken } from "social-sign-in";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html"
})
export class UserDetailsComponent {
    @Input() signInToken?: SignInToken;
    @Output() signOut: EventEmitter<any> = new EventEmitter();
    @Input() title?: string;
    @Input() userDetails?: UserDetails;

    emitSignOut() {
        this.signOut.emit(true);
    }
}
