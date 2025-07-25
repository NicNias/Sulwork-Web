import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private router: Router) { }

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
    if (this.colaboradorForm.valid) {
      const formValue = this.colaboradorForm.value;

      const payload = {
        nome: formValue.nome,
        cpf: formValue.cpf,
        data_cafe: formValue.data_cafe,
        entregue: formValue.entregue,
        itens: formValue.itens, // string com itens separados por vírgula
      };

      console.log('Enviando payload:', payload);
    }
  }

  navigateToList() {
    this.router.navigate(['/']);
  }
}
