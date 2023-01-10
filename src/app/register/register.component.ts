import { Component, OnInit } from '@angular/core';
import { Authobj } from '../interface/authobj';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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

    this.authService.sendReg(data).subscribe((x) => {
      x
        ? (this.message = 'created')
        : (this.message = 'account already exists');
    });

    setTimeout(() => {
      this.message = '';
    }, 3000);

    this.username = '';
    this.password = '';
  }
}
