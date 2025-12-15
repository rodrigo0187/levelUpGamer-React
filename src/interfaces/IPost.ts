export interface IPost {
    id?: number;
    titulo: string;
    contenido: string;
    imagen?: string;
    url?: string;
    fecha_creacion?: Date;
    autor_id?: number;
}
