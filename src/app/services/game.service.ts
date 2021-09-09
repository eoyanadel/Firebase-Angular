import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Game, Voto } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegosServicio: Game[] = [];

  constructor(private http: HttpClient) {
    console.log('Servicio inicializado...');
   }

  getNominados(): Observable<Game[]> {

    if (this.juegosServicio.length > 0 ) {
      // no tenemos juegos
      console.log('Desde Cache');
      return of(this.juegosServicio);

    } else {
      console.log('Desde Internet');
      return this.http.get<Game[]>(`${ environment.url }/api/goty`)
                  .pipe(
                    tap(
                      juegos => this.juegosServicio = juegos
                    )
                  );
    }
  }

  votarJuego(id: string): Observable<Voto> {

    return this.http.post<Voto>(`${ environment.url }/api/goty/${ id }`, {})
                .pipe(
                  catchError(err => {
                    console.log('Error en la petición:');
                    console.log(err.error);
                    return of(err.error);
                  })
                );
  }
}
