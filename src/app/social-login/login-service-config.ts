import { FacebookConfig } from "./impl/facebook/facebook-config";

export class LoginServiceConfig {
    constructor(public readonly services: {facebook?: FacebookConfig}) {}
}
