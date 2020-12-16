import { Component, Input, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Utils } from "../utils";

@Component({
  selector: "app-no-results",
  templateUrl: "./no-results.component.html",
  styleUrls: ["./no-results.component.scss"],
})
export class NoResultsComponent implements OnInit {
  @Input() hits;
  @Input() results;

  public corkboardUrl;
  public groupsUrl;
  public helpUrl;

  ngOnInit() {
    this.corkboardUrl = `${environment.appEndpoint}/corkboard`;
    this.groupsUrl = `${environment.appEndpoint}/groups/search`;
    this.helpUrl = `${environment.appEndpoint}/help`;
  }

  formatLabel(label) {
    return Utils.formatLabel(label);
  }
}
