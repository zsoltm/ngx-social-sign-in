import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { UserDetailsComponent } from "./user-details.component";
import { LoginServiceConfig } from "./social-login/login-service-config";
import { SocialLoginModule } from "./social-login/social-login.module";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, UserDetailsComponent
      ],
      imports: [
        SocialLoginModule
      ],
      providers: [{
        provide: LoginServiceConfig,
        useValue: {
          services: {}
        }
      }]
    }).compileComponents();
  }));

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Angular-Social-Sign-In");
  }));

  it("should render title in a h1 tag", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain("Angular-Social-Sign-In");
  }));
});
