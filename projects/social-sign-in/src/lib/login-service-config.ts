import { FacebookConfig } from "./impl/facebook/facebook-config";
import { GoogleConfig } from "./impl/google/google-config";

export class SignInServiceConfig {
    constructor(public readonly providers: {
        facebook?: FacebookConfig,
        google?: GoogleConfig
    }) {}
}
