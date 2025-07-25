import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CpfMaskPipe } from '../../pipes/cpfMask/cpf-mask.pipe';
import { DataFormatPipe } from '../../pipes/dataFormat/data-format.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import { SharedModule } from '../../modules/shared.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  imports: [
    CommonModule,
    CpfMaskPipe,
    DataFormatPipe,
    ButtonComponent,
    SharedModule,
    FormsModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  constructor(
    private router: Router,
  ) { }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  pessoas = [
    {
      nome: 'João Silva',
      cpf: '12345678900',
      dataCafe: '2025-07-25',
      opcoes: 'Café preto',
      entregue: true
    },
    {
      nome: 'Maria Oliveira',
      cpf: '98765432100',
      dataCafe: '2025-07-25',
      opcoes: 'Café com leite',
      entregue: false
    },
    {
      nome: 'Carlos Mendes',
      cpf: '11122233344',
      dataCafe: '2025-07-25',
      opcoes: 'Café descafeinado',
      entregue: false
    },
    {
      nome: 'João Silva',
      cpf: '12345678900',
      dataCafe: '2025-07-25',
      opcoes: 'Café preto',
      entregue: true
    },
    {
      nome: 'Maria Oliveira',
      cpf: '98765432100',
      dataCafe: '2025-07-25',
      opcoes: 'Café com leite',
      entregue: false
    },
    {
      nome: 'Carlos Mendes',
      cpf: '11122233344',
      dataCafe: '2025-07-25',
      opcoes: 'Café descafeinado',
      entregue: false
    },
  ];

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 5;

  get pessoasPaginadas() {
    const start = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.pessoas.slice(start, start + this.itensPorPagina);
  }

  totalPaginas() {
    return Math.ceil(this.pessoas.length / this.itensPorPagina);
  }

  irParaPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaAtual = pagina;
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas()) {
      this.paginaAtual++;
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  // modal add itens
  mostrarModalAdicionar: boolean = false;
  colaboradorSelecionado: any = null;
  novoItem: string = '';

  abrirModalAdicionar(pessoa: any) {
    this.colaboradorSelecionado = pessoa;
    this.mostrarModalAdicionar = true;
    this.novoItem = '';
  }

  fecharModalAdicionar() {
    this.mostrarModalAdicionar = false;
    this.colaboradorSelecionado = null;
    this.novoItem = '';
  }

  confirmarAdicao() {
    if (this.novoItem.trim()) {
      if (!this.colaboradorSelecionado.opcoes) {
        this.colaboradorSelecionado.opcoes = this.novoItem;
      } else {
        this.colaboradorSelecionado.opcoes += `, ${this.novoItem}`;
      }
    }

    this.fecharModalAdicionar();
  }


  // modal delete
  mostrarModal: boolean = false;

  abrirModal(colaborador: any) {
    this.colaboradorSelecionado = colaborador;
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.colaboradorSelecionado = null;
  }

  confirmarExclusao() {
    if (this.colaboradorSelecionado) {
      console.log('Excluído:', this.colaboradorSelecionado.nome);
    }
    this.fecharModal();
  }
}
