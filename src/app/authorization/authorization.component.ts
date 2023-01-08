import { Component, OnInit } from '@angular/core';
import { Authobj } from '../interface/authobj';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.username.trim() || !this.password.trim()) {
      alert('please add all field');
      return;
    }

    let data: Authobj = {
      username: this.username,
      password: this.password,
    };

    this.authService.sendReq(data).subscribe(
      (x) => (this.message = "success"),
      (error) => {
        if (!error.ok) {
          this.message = 'wrong username or password';
        }
      }
    );

    setTimeout(() => {
      this.message = '';
    }, 3000);

    this.username = '';
    this.password = '';
  }
}
