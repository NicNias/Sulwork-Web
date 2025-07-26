import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CpfMaskPipe } from '../../pipes/cpfMask/cpf-mask.pipe';
import { DataFormatPipe } from '../../pipes/dataFormat/data-format.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import { SharedModule } from '../../modules/shared.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SulworkService } from '../../services/sulwork.service'; // importa o serviço

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista',
  standalone: true,
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
export class ListaComponent implements OnInit {
  constructor(
    private router: Router,
    private sulworkService: SulworkService, // injeta o serviço
    private toastr: ToastrService
  ) { }

  pessoas: any[] = [];

  // puxa colaboradores
  private carregarColaboradores(): void {
    this.sulworkService.getTodosColaboradores().subscribe({
      next: (res) => {
        this.pessoas = res;
      },
      error: (err) => {
        this.toastr.error(err.error.title);
      }
    });
  }

  ngOnInit(): void {
    this.carregarColaboradores();
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

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

  // modal editar colaborador
  mostrarModalEditarColaborador = false;
  colaboradorEmEdicao: any = null;

  abrirModalEditarColaborador(colaborador: any) {
    this.colaboradorEmEdicao = { ...colaborador };
    this.mostrarModalEditarColaborador = true;
  }

  fecharModalEditarColaborador() {
    this.mostrarModalEditarColaborador = false;
    this.colaboradorEmEdicao = null;
  }

  salvarEdicaoColaborador() {
    if (!this.colaboradorEmEdicao?.id) return;

    this.sulworkService.patchAtualizarColaborador(
      this.colaboradorEmEdicao.id,
      {
        nome: this.colaboradorEmEdicao.nome,
        cpf: this.colaboradorEmEdicao.cpf,
        data_cafe: this.colaboradorEmEdicao.data_cafe,
        itens: this.colaboradorEmEdicao.itens
      }
    ).subscribe({
      next: () => {
        this.carregarColaboradores();
        this.fecharModalEditarColaborador();
      },
      error: (err) => {
        console.error('Erro ao editar colaborador', err);
        this.toastr.error(err.error.detail)
      }
    });
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
    const novoItemTrim = this.novoItem.trim();
    if (!novoItemTrim) {
      this.toastr.warning('Informe um item para adicionar.');
      return;
    }

    if (!this.colaboradorSelecionado) {
      this.toastr.error('Nenhum colaborador selecionado.');
      return;
    }

    this.sulworkService.patchAdicionarItens(this.colaboradorSelecionado.id, [novoItemTrim]).subscribe({
      next: (colaboradorAtualizado) => {
        const index = this.pessoas.findIndex(p => p.id === this.colaboradorSelecionado.id);
        if (index !== -1) {
          this.pessoas[index] = colaboradorAtualizado;
        }

        this.toastr.success('Item adicionado com sucesso!');
        this.fecharModalAdicionar();
      },
      error: (err) => {
        const mensagemErro = err?.error?.mensagem || err?.error?.title || 'Erro ao adicionar item.';
        this.toastr.error(mensagemErro);
        console.error(err);
      }
    });
  }

  // modal editar status
  mostrarModalEditarStatus = false;
  colaboradorSelecionadoParaEdicao: any = null;

  abrirModalEditarStatus(pessoa: any) {
    this.colaboradorSelecionadoParaEdicao = { ...pessoa };
    this.mostrarModalEditarStatus = true;
  }

  fecharModalEditarStatus() {
    this.mostrarModalEditarStatus = false;
    this.colaboradorSelecionadoParaEdicao = null;
  }

  // atualizar status
  salvarEditStatus() {
    const { id, entregue } = this.colaboradorSelecionadoParaEdicao;

    this.sulworkService.patchStatusCafe(id, entregue).subscribe({
      next: response => {
        const index = this.pessoas.findIndex(p => p.id === id);
        if (index !== -1) {
          this.pessoas[index].entregue = entregue;
        }

        this.toastr.success(response);
        this.fecharModalEditarStatus();
      },
      error: (err) => {
        const mensagemErro = err?.error?.mensagem || err?.error?.title || 'Erro ao atualizar status.';
        this.toastr.error(mensagemErro);
        console.error(err);
      }
    });
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
      this.sulworkService.deleteColaborador(this.colaboradorSelecionado.id).subscribe({
        next: (res) => {
          this.toastr.success("Colaborador deletado com sucesso!");
          this.pessoas = this.pessoas.filter(
            p => p.id !== this.colaboradorSelecionado.id
          );
          this.fecharModal();
        },
        error: (err) => {
          this.toastr.error(err.error.title);
          console.error(err.error.title);
        }
      });
    }
  }
}