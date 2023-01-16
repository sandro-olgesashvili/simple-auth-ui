import { Component, OnInit } from '@angular/core';
import { Update } from '../interface/update';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  username: string = '';
  password: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.username.trim() || !this.password.trim() || !this.newPassword.trim()) {
      alert('please add all field');
      return;
    }

    let data: Update = {
      username: this.username,
      password: this.password,
      newPassword :this.newPassword
    };

    this.authService.update(data).subscribe((x) => {
      x
        ? (this.message = 'updated')
        : (this.message = 'wrong username or password');
    });

    setTimeout(() => {
      this.message = '';
    }, 3000);

    this.username = '';
    this.password = '';
    this.newPassword = '';
  }
}
