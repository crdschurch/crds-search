import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HitComponent } from "./hit.component";
import { ImgixAspectRatioPipe } from "src/app/pipes/imgix-aspect-ratio.pipe";

class MockImgix {
  init(obj) {
    return obj;
  }
}

describe("HitComponent", () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HitComponent, ImgixAspectRatioPipe],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HitComponent);
    component = fixture.debugElement.componentInstance;
    component.hit = {};

    window["imgix"] = new MockImgix(); // imgix is globally defined by another script
  });

  it("should create a component", async () => {
    expect(component).toBeTruthy();
  });

  describe("Tests hit.image states", () => {
    it("should have image link, text, meta if hit.image is truthy: ", () => {
      component.hit.image = "image.png";
      component.hit.url = "https://www.crossroads.net/";

      fixture.detectChanges();

      const imageLink = fixture.nativeElement.querySelector(".hit-img");
      expect(imageLink).toBeTruthy();
      expect(imageLink.href).toBe(component.hit.url);
      const hitText = fixture.nativeElement.querySelector("app-hit-text");
      expect(hitText).toBeTruthy();
      const hitMeta = fixture.nativeElement.querySelector(".hit-meta");
      expect(hitMeta).toBeTruthy();
    });

    it("should have image if hit.image is truthy", () => {
      component.hit.image = "image.png";
      component.hit.title = "Some Article";

      fixture.detectChanges();

      const image = fixture.nativeElement.querySelector(".img-responsive");
      expect(image).toBeTruthy();
      expect(image.alt).toBe(component.hit.title);
    });

    it("should have text, meta if hit.image is falsy", () => {
      component.hit.image = null;

      fixture.detectChanges();

      const imageLink = fixture.nativeElement.querySelector(".hit-img");
      expect(imageLink).toBeFalsy();
      const hitText = fixture.nativeElement.querySelector("app-hit-text");
      expect(hitText).toBeTruthy();
      const hitMeta = fixture.nativeElement.querySelector(".hit-meta");
      expect(hitMeta).toBeTruthy();
      expect(hitMeta.tagName).toBe("DIV");
    });

    [undefined, null, false, ""].forEach((image) => {
      it(`should not have image link if hit.image is "${image}"`, () => {
        component.hit.image = image;

        fixture.detectChanges();

        const imageLink = fixture.nativeElement.querySelector(".hit-img");
        expect(imageLink).toBeFalsy();
      });
    });

    describe("Tests card stamp", () => {
      const cardStampContent = ["article", "video", "episode", "message"];
      cardStampContent.forEach((contentType) => {
        it(`should have duration and image for type "${contentType}"`, () => {
          component.hit.image = "image.png";
          component.hit.contentType = contentType;
          component.hit.duration = "1m 30s";

          fixture.detectChanges();

          const cardStamp = fixture.nativeElement.querySelector(".card-stamp");
          expect(cardStamp).toBeTruthy();

          const duration = cardStamp.querySelector(
            '[data-automation-id="hit-duration"]'
          );
          expect(duration.textContent).toBe(component.hit.duration);

          const image = cardStamp.querySelector(".icon > use");
          expect(image.href).toBeTruthy();
        });
      });

      const noCardStampContent = ["series", "song", "promo", "album"];
      noCardStampContent.forEach((contentType) => {
        it(`should not have card stamp for type "${contentType}"`, () => {
          component.hit.image = "image.png";
          component.hit.contentType = contentType;

          fixture.detectChanges();

          const cardStamp = fixture.nativeElement.querySelector(".card-stamp");
          expect(cardStamp).toBeFalsy();
        });
      });
    });
  });

  describe("Tests hit meta section", () => {
    describe("Tests directions link", () => {
      it("should display if hit has map url", () => {
        component.hit.map_url =
          "https://www.google.com/maps/place/Crossroads+Church+Oakley";

        fixture.detectChanges();

        const getDirections = fixture.nativeElement.querySelector(
          '[data-automation-id="hit-directions"]'
        );
        expect(getDirections).toBeTruthy();
        expect(getDirections.href).toBe(component.hit.map_url);
      });

      it("should not display if hit has no map url", () => {
        fixture.detectChanges();

        const getDirections = fixture.nativeElement.querySelector(
          '[data-automation-id="hit-directions"]'
        );
        expect(getDirections).toBeFalsy();
      });
    });

    describe("Tests date range", () => {
      it("should display if hit has start & end date", () => {
        component.hit.start_date = "9.16.19";
        component.hit.end_date = "10.16.19";

        fixture.detectChanges();

        const dateRange = fixture.nativeElement.querySelector(
          ".hit-series-date"
        );
        expect(dateRange).toBeTruthy();
        expect(dateRange.textContent).toBe(
          `${component.hit.start_date} - ${component.hit.end_date}`
        );
      });

      it("should not display if missing start date", () => {
        component.hit.end_date = "10.16.19";

        fixture.detectChanges();

        const dateRange = fixture.nativeElement.querySelector(
          ".hit-series-date"
        );
        expect(dateRange).toBeFalsy();
      });

      it("should not display if missing end date", () => {
        component.hit.start_date = "9.16.19";

        fixture.detectChanges();

        const dateRange = fixture.nativeElement.querySelector(
          ".hit-series-date"
        );
        expect(dateRange).toBeFalsy();
      });
    });

    describe("Tests date", () => {
      it("should display if hit has date", () => {
        component.hit.date = "9.16.19";

        fixture.detectChanges();

        const date = fixture.nativeElement.querySelector(".hit-date");
        expect(date).toBeTruthy();
        expect(date.textContent).toBe(component.hit.date);
      });

      it("should not display if hit missing date", () => {
        fixture.detectChanges();

        const date = fixture.nativeElement.querySelector(".hit-date");
        expect(date).toBeFalsy();
      });
    });
  });
});
