export interface Game {
    id: string;
    name: string;
    url: string;
    votos: number;
}

export interface Voto {
    ok: boolean;
    mensaje: string;
}
