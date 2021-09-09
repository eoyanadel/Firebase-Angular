import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegosGrafico: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('goty').valueChanges()
        .pipe(
          map( (juegosFirestore: Game[]) => juegosFirestore.map( ({name, votos}) => ({name, value: votos}) )
            /*
            // Version mas corta arriba
            // Version corta
            {
            return juegosFirestore.map( ({ name, votos }) => ({name, value: votos}) );
            }
            // Version larga
            {
            return juegosFirestore.map(juegos => {
              return {
                name: juegos.name,
                value: juegos.votos
              };
            });
            } */
          )
        )
        .subscribe(juegos => {
          // console.log(juegos);
          this.juegosGrafico = juegos;
        });
  }

}
