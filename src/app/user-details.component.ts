import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserDetails, SignInToken } from "@zsoltm/ngx-social-sign-in";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html"
})
export class UserDetailsComponent {
    @Input() signInToken?: SignInToken;
    @Output() signOut: EventEmitter<any> = new EventEmitter();
    @Input() title?: string;
    @Input() set userDetails(userDetails: UserDetails) {
        this._userDetails = userDetails;
    }

    private _userDetails?: UserDetails;

    emitSignOut() {
        this.signOut.emit(true);
    }

    get userDetails(): UserDetails {
        if (this._userDetails) return this._userDetails;
        throw new Error("userdetails not set");
    }
}
