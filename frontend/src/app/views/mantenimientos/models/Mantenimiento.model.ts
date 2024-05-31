/* export class UsuarioModel {
  _id: string = '';
  nombre_usuario: string = '';
  correo: string = '';
  password: string = '';
}
export class MantenimientoModel {
  _id: string = '';
  nombre_peticion: string = '';
  nombre_tecnico: string = '';
  tipo_soporte: string = '';
  descripcion: string = '';
  usuario: string = '';
} */
// mantenimiento.model.ts
export class UsuarioModel {
    _id: string = '';
    nombre_usuario: string = '';
    correo: string = '';
    password: string = '';
}
  
export class MantenimientoModel {
    _id: string = '';
    nombre_peticion: string = '';
    nombre_tecnico: string = '';
    tipo_soporte: string = '';
    descripcion: string = '';
    usuarios: string = '';
    usuario: UsuarioModel = new UsuarioModel(); // <- Cambia string a UsuarioModel
    totalmantenimientos: number = 0;
}
  
