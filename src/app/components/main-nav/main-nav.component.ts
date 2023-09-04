import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  isLogged = false;
  username!: string;
  isSidenavOpen!: boolean;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private tokenService: TokenService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.tokenService.getToken() != null) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.isSidenavOpen = !this.mobileQuery.matches && this.isLogged;
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate([""]).then(a => window.location.reload())
  }

}
