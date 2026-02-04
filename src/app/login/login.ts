import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loginAttempted = false;
  loginSuccess = false;
  loginError = false;

  // Credenciales de prueba
  private readonly TEST_USERNAME = 'admin';
  private readonly TEST_PASSWORD = 'admin123';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getters para acceder a los controles del formulario
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Métodos para mostrar mensajes de error
  getUsernameError(): string {
    if (this.username?.hasError('required')) {
      return 'El nombre de usuario es requerido';
    }
    if (this.username?.hasError('minlength')) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    return '';
  }

  getPasswordError(): string {
    if (this.password?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (this.password?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  // Método para enviar el formulario
  onSubmit(): void {
    this.loginAttempted = true;
    this.loginSuccess = false;
    this.loginError = false;

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Validar credenciales
      if (username === this.TEST_USERNAME && password === this.TEST_PASSWORD) {
        this.loginSuccess = true;
        this.loginError = false;
        console.log('Login exitoso!');
      } else {
        this.loginError = true;
        this.loginSuccess = false;
      }
    }
  }

  // Método para resetear el formulario
  onReset(): void {
    this.loginForm.reset();
    this.loginAttempted = false;
    this.loginSuccess = false;
    this.loginError = false;
  }
}
