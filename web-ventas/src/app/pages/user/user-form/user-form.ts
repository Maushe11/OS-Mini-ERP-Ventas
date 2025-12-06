import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {UserService} from '../../../core/services/user.service';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {Panel} from 'primeng/panel';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {SelectButton} from 'primeng/selectbutton';
import {Password} from 'primeng/password';

@Component({
  selector: 'app-user-form',
  imports: [
    Button,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    FloatLabel,
    FormsModule,
    InputGroup,
    InputGroupAddon,
    InputText,
    Message,
    Panel,
    ReactiveFormsModule,
    ToggleSwitch,
    SelectButton,
    Password
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private messageService = inject(MessageService);

  id = signal<number | null>(null);
  loading = signal(false);

  roleOptions = [
    {label: 'Administrador', value: 'ADMIN'},
    {label: 'Usuario', value: 'USER'}
  ];

  form = this.fb.group({
    username: ['', Validators.required],
    password: [null],
    role: ['', Validators.required],
    active: [true]
  });

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.invalid && c.touched);
  }

  constructor() {
    effect(() => {
      const paramId = this.route.snapshot.paramMap.get('id');
      if (paramId) {
        this.id.set(Number(paramId));
        this.loadUser(Number(paramId));

        this.form.get('password')?.clearValidators();
        this.form.get('password')?.updateValueAndValidity();
      } else {
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.form.get('password')?.updateValueAndValidity();
      }
    });
  }

  loadUser(id: number) {
    this.loading.set(true);

    this.userService.getById(id).subscribe({
      next: (user) => {
        this.form.patchValue(user);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el usuario'
        });
      }
    });
  }

  submit() {

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading.set(true);
    const data = this.form.value;

    const request$ = this.id()
      ? this.userService.update(this.id()!, data)
      : this.userService.create(data);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.id() ? 'Usuario actualizado' : 'Usuario creado'
        });

        this.router.navigate(['/user']);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/user']);
  }

}
