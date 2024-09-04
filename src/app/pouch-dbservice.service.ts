import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable({
  providedIn: 'root'
})
export class PouchDBServiceService {

  private db: PouchDB.Database;

  constructor() {
    // Inicia la base de datos PouchDB con el nombre 'usuarios'
    this.db = new PouchDB('usuarios');
  }

  // Método para guardar datos de usuario en la base de datos local
  async saveData(userData: any): Promise<void> {
    try {
      // Si el usuario no tiene un _id, se genera uno único
      if (!userData._id) {
        userData._id = uuidv4(); // Genera un UUID único
      }
      
      // Guardar el documento en PouchDB
      await this.db.put(userData);
      console.log('Usuario guardado en la base de datos local');
    } catch (err: any) {
      if (err.status === 409) { // Maneja conflicto de ID duplicado
        try {
          const existingUserData = await this.db.get(userData._id);
          await this.db.put({ ...existingUserData, ...userData, _rev: existingUserData._rev });
        } catch (updateError: any) {
          console.error('Error al actualizar el usuario en la base de datos local', updateError);
        }
      } else {
        console.error('Error al guardar el usuario en la base de datos local', err);
      }
    }
  }
  
  
  

  // Método para obtener datos de un usuario por su ID
  async getUserData(username: string): Promise<any> {
    try {
      // Buscar el documento usando solo el _id (que en este caso es el username)
      return await this.db.get(username);
    } catch (err: any) {
      console.error('Error al obtener el usuario de la base de datos local:', err);
      if (err.status === 404) {
        console.log(`Usuario con el nombre de usuario ${username} no encontrado.`);
      }
      throw err;
    }
  }
  

  // Método para obtener todos los datos de usuarios
  async getAllUsers(): Promise<any> {
    try {
      const result = await this.db.allDocs({ include_docs: true });
      return result.rows.map(row => row.doc);
    } catch (err: any) {
      console.error('Error al obtener todos los usuarios de la base de datos local', err);
    }
  }
  
  // Método para limpiar la base de datos de usuarios
  async clearData(): Promise<void> {
    try {
      const allDocs = await this.db.allDocs();
      for (const doc of allDocs.rows) {
        await this.db.remove(doc.id, doc.value.rev);
      }
      console.log('Base de datos local de usuarios limpiada');
    } catch (err: any) {
      console.error('Error al limpiar la base de datos local de usuarios', err);
    }
  }
}
