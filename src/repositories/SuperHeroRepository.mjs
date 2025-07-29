
import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    const filtrar = {};
        
        filtrar[atributo] = {$regex: valor,$options:'i'};
  //Búsqueda insencible a mayúsculas
        return await SuperHero.find(filtrar);
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({ edad: { $gt: 30 } });
  }
 async crearSuperheroe(datosSuperheroe){
     
        const nuevoHeroe = new SuperHero(datosSuperheroe);

        return await nuevoHeroe.save()// guarda y retorna en una sola linea
        /*await nuevoHeroe.save();
        console.log(nuevoHeroe);
        return nuevoHeroe;*/
        }

        async actualizarHeroe(id, datosActualizar) {
        /* updateOne() o updateMany() devuelven el resultado de la operación pero no el documento actualizado
        y findByIdAndUpdate() devuelve el documento actualizado */
            const heroeActualizado = await SuperHero.findByIdAndUpdate(id, datosActualizar, { new: true });
            console.log(heroeActualizado);
            return heroeActualizado;
            
        }
        async eliminarPorId(id){
            console.log('Capa Repository - función eliminar por Id');
            const heroeEliminado = await SuperHero.findByIdAndDelete(id);
            console.log(heroeEliminado);
            return heroeEliminado;
        }
        
        async eliminarPorNombre(nombre){
            console.log('Capa Repository - función eliminar por Nombre');
            const heroeEliminado = await SuperHero.findOneAndDelete({nombreSuperHeroe: nombre});
            console.log(heroeEliminado);
            return heroeEliminado;
        }
      
}

export default new SuperHeroRepository();

