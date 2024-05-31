import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MantenimientoModel } from "../models/Mantenimiento.model";

@Injectable({
    providedIn : 'root'
})

export class MantenimientoService {
    //URL de la API (BACKEND)
    private API_URL = 'http://localhost:8001/mantenimiento'
    constructor(private http: HttpClient){

    }
    getTodosLosMantenimientos(): Observable<MantenimientoModel[]>{
        return this.http.get<MantenimientoModel[]>(`${this.API_URL}/getMantenimiento`);
    }

    agregarMantenimiento(mantenimiento: MantenimientoModel) : Observable<MantenimientoModel> {
        return this.http.post<MantenimientoModel>(`${this.API_URL}/registrar`, mantenimiento);
    }

    editarMantenimiento(mantenimiento: MantenimientoModel): Observable<MantenimientoModel> {
        console.log("este es el manetnimiento a modificar", mantenimiento);
        return this.http.put<MantenimientoModel>(`${this.API_URL}/editar/${mantenimiento._id}`, mantenimiento);
    }

    eliminarMantenimiento(idMantenimiento : string) : Observable<MantenimientoModel> {
        console.log("este es el id a eliminar", idMantenimiento);
        //return this.http.delete<MantenimientoModel>(`${this.API_URL}/eliminar/${idMantenimiento}`);
        return this.http.delete<MantenimientoModel>(this.API_URL+ '/eliminar/'+idMantenimiento);
    }
    getMantenimientosPorUsuario(usuarioId: string): Observable<any> {
        return this.http.get(`${this.API_URL}/mantenimientoporusuario/${usuarioId}`);
    }
    getMantenimientoUsuario(): Observable<MantenimientoModel[]>{
        return this.http.get<MantenimientoModel[]>(`${this.API_URL}/mantenimientosumatecnico`);
    }
}