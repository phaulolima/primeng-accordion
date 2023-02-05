import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  activeState: boolean[] = [true, false, false];

  indice: number = 0;
  listaPropostasPorLinhaFiltrada: any = [];

  listaPropostasPorLinha = {
    linha: [
      {
        nome: 'Linha 1',
        numero: '777',
        abreFecha: false,
        propostas: [{ proposta: '111.222.333', proponente: 'Joao Paulo' }],
        indice: 0
      },
      {
        nome: 'Linha 2',
        numero: '888',
        abreFecha: false,
        propostas: [{ proposta: '222.333.444', proponente: 'Pedro Jose' }],
        indice: 0
      },
      {
        nome: 'Linha 3',
        numero: '888',
        abreFecha: false,
        propostas: [{ proposta: '333.444.555', proponente: 'Jose Pedro' }],
        indice: 0
      },
      {
        nome: 'Linha 4',
        numero: '888',
        abreFecha: false,
        propostas: [{ proposta: '444.555.666', proponente: 'Paulo Jose Pedro' }],
        indice: 0
      },
    ],
  };

  campoPesquisa = '';

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {

    this.preencherIndice(this.listaPropostasPorLinha.linha);

    this.listaPropostasPorLinhaFiltrada = Object.create(this.listaPropostasPorLinha);

  }

  preencherIndice (lista : any = []) {
    lista.forEach((value: { indice: any; }, index: any) => {
      value.indice = index;
    });
  }

 

  filtrar(palavraChave: string) {
    if (palavraChave) { 

      palavraChave = palavraChave.toUpperCase();
      this.listaPropostasPorLinhaFiltrada.linha = this.listaPropostasPorLinhaFiltrada.linha.filter((a: { propostas: { proposta: string; }[]; }) =>
         a.propostas[0].proposta.toUpperCase().indexOf(palavraChave) >= 0
      );

      if (this.listaPropostasPorLinhaFiltrada.linha.length === 0) {
        this.listaPropostasPorLinhaFiltrada = Object.create(this.listaPropostasPorLinha);
      } else {
        // Abre o acordion do filtro, de acordo com o indice
        this.listaPropostasPorLinhaFiltrada.linha.forEach((linha: { abreFecha: boolean; }) => {
          linha.abreFecha = true;
        });
      }
    }
  }

  limpar() {
    this.listaPropostasPorLinhaFiltrada = Object.create(this.listaPropostasPorLinha);
    this.campoPesquisa = '';
  }

  onTabClose(event: { index: string; }) {
    this.messageService.add({
      severity: 'info',
      summary: 'Tab Closed',
      detail: 'Index: ' + event.index,
    });
  }

  onTabOpen(event: { index: string; }) {
    this.messageService.add({
      severity: 'info',
      summary: 'Tab Expanded',
      detail: 'Index: ' + event.index,
    });
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
}
