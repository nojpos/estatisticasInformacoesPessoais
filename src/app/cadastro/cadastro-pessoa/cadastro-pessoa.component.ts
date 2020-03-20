import { Component, OnInit } from '@angular/core';
import { Pessoa } from './models/Pessoa';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: 'cadastro-pessoa.component.html',
  styles: []
})
export class CadastroPessoaComponent implements OnInit {

  pessoa: Pessoa = new Pessoa;
  listaPessoa: Pessoa[] = []
  totalPessoa: number = 0;
  pessoaJovem: Pessoa = new Pessoa;
  pessoaIdosa: Pessoa = new Pessoa;
  pessoaExcluída = ''

  constructor() { }

  ngOnInit(): void {
    (document.getElementById('nome') as HTMLElement).focus();
  }

  random() {
    return Math.floor(Math.random() * 1024);
  }

  passarParaCampoIdade(){
    (document.getElementById('idade') as HTMLElement).focus();
  }

  ordenarLista() {
    if ((this.listaPessoa.length) === 0) {
      this.pessoaJovem = new Pessoa;
      this.pessoaIdosa = new Pessoa;
    }
    
    else {
      this.listaPessoa.sort((a, b) => a.idade - b.idade);
      this.pessoaJovem = this.listaPessoa[0];
      this.pessoaIdosa = this.listaPessoa[this.listaPessoa.length - 1];
    }
  }

  adicionar() {
    if (this.pessoa.nome === undefined) {
      return alert('O campo Nome não foi preenchido')
    }
    this.pessoa.id = this.random();
    this.listaPessoa.push(this.pessoa);
    this.totalPessoa += 1;
    this.pessoa = new Pessoa;

    (document.getElementById('nome') as HTMLElement).focus();
    
    this.ordenarLista();
  }

  excluir(id) {
    let pessoaId = this.listaPessoa.findIndex(cd => cd.id === id);
    this.pessoaExcluída = this.listaPessoa[pessoaId].nome;
    this.listaPessoa.splice(pessoaId, 1);
    alert('O registro ' + this.pessoaExcluída + ' Foi excluído com sucesso');
    this.pessoaExcluída = '';
    this.totalPessoa -= 1;
    this.ordenarLista()
  }

}
