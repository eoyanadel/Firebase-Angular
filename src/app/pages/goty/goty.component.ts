import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game, Voto } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {

    this.gameService.getNominados()
        .subscribe(resp => {
          console.log(resp);
          this.juegos = resp;
        });
  }

  votarJuego(juego: Game): any {

    this.gameService.votarJuego(juego.id)
        .subscribe((resp: Voto) => {
          // console.log(resp);

          if (resp.ok) {
            Swal.fire('Gracias', resp.mensaje, 'success');
          } else {
            Swal.fire('Oops!!!', resp.mensaje, 'error');
          }
        });
  }

}
