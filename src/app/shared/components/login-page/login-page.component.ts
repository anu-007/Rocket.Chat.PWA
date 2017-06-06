import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastController } from 'ionic-angular';

@Component({
  moduleId : module.id,
  templateUrl : './login-page.component.html',
  styleUrls : ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.model.username && this.model.password &&
      this.authenticationService.login(this.model.username, this.model.password)) {
      this.router.navigate([this.returnUrl]);
    }
    else {
      const toast = this.toastCtrl.create({
        message : 'Invalid username or password',
        duration : 5000
      });
      toast.present();
    }
  }
}
