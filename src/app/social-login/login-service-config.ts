import { FacebookConfig } from "./impl/facebook/facebook-config";
import { GoogleConfig } from "./impl/google/google-config";

export class LoginServiceConfig {
    constructor(public readonly services: {
        facebook?: FacebookConfig,
        google?: GoogleConfig
    }) {}
}
