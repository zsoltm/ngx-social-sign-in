import { TestBed, inject } from "@angular/core/testing";

import { SocialSignInService } from "./social-sign-in.service";

describe("SocialSignInService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialSignInService]
    });
  });

  it("should be created", inject([SocialSignInService], (service: SocialSignInService) => {
    expect(service).toBeTruthy();
  }));
});
