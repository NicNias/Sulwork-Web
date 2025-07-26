import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { SulworkService } from '../../services/sulwork.service'; // ajuste o caminho conforme seu projeto
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    SharedModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  colaboradorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sulworkService: SulworkService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.colaboradorForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      data_cafe: ['', Validators.required],
      itens: [''],
      entregue: [false],
    });
  }

  onSubmit() {
    if (this.colaboradorForm.invalid) {
      this.colaboradorForm.markAllAsTouched();
      return;
    }

    const formValue = this.colaboradorForm.value;

    const itensArray = formValue.itens
      ? formValue.itens.split(',').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
      : [];

    const payload = {
      nome: formValue.nome,
      cpf: formValue.cpf,
      data_cafe: formValue.data_cafe,
      entregue: formValue.entregue,
      itens: itensArray,
    };

    this.sulworkService.createColaborador(payload).subscribe({
      next: (response) => {
        this.toastr.success(`Colaborador ${response.nome} cadastrado com sucesso!`);
        setTimeout(() => {
          this.navigateToList();
        }, 1500);
      },
      error: (err) => {
        this.toastr.error(err.error.detail);
        console.error(err.error.title);
      }
    });
  }

  navigateToList() {
    this.router.navigate(['/']);
  }
}
