import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AuthUser} from "../../models/auth-user";
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.buildForm();
  }

  isLogged = false;
  isLoginFail = false;
  loginUser!: AuthUser;
  username!: string;
  password!: string;

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  onLogin(): void {
    const formData = this.form.value;
    this.username = formData.username;
    this.password = formData.password;

    this.loginUser = new AuthUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe(
      (data: any) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(<string>this.tokenService.getToken());
        this.tokenService.setUserName(decodedToken.sub);
        this.router.navigate(['/currencies']).then(x => window.location.reload())
      },
      (err: any) => {
        alert(err.error.message)
        this.isLogged = false;
      }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
