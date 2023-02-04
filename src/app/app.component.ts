import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
})
export class AppComponent {
  activeState: boolean[] = [true, false, false];

  indice: number = 0;

  listaLinhas = {
    linha: [
      {
        nome: 'Linha 1',
        numero: '777',
        abreFecha: false,
        propostas: [{ proposta: '11111', proponente: 'Nome 1' }],
      },
      {
        nome: 'Linha 2',
        numero: '888',
        abreFecha: false,
        propostas: [{ proposta: '22222', proponente: 'Nome 2' }],
      },
      {
        nome: 'Linha 3',
        numero: '888',
        abreFecha: false,
        propostas: [{ proposta: '33333', proponente: 'Nome 3' }],
      },
      {
        nome: 'Linha 4',
        numero: '888',
        abreFecha: false,
        propostas: [{ proposta: '44444', proponente: 'Nome 4' }],
      },
    ],
  };

  campoPesquisa = '';

  constructor(private messageService: MessageService) {}

  filtrar(palavraChave: string) {
    if (palavraChave) {
      console.log('Passei aqui! ', palavraChave);

      palavraChave = palavraChave.toUpperCase();
      this.listaLinhas.linha = this.listaLinhas.linha.filter((a) =>
         a.propostas[0].proponente.toUpperCase().indexOf(palavraChave) >= 0
      );
      this.listaLinhas.linha[0].abreFecha = true
    }
  }

  onTabClose(event) {
    this.messageService.add({
      severity: 'info',
      summary: 'Tab Closed',
      detail: 'Index: ' + event.index,
    });
  }

  onTabOpen(event) {
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
