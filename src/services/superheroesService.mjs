
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
  return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30();
}
export async function crearNuevoSuperheroe(datosNuevoSuperheroe) {
    return await superHeroRepository.crearSuperheroe(datosNuevoSuperheroe);
}

export async function actualizarSuperheroe(id, datosActualizarSuperheroe) {
    return await superHeroRepository.actualizarHeroe(id, datosActualizarSuperheroe);
}

export async function eliminarSuperheroePorId(id) {
    console.log('Capa services - función eliminar por Id');
    return await superHeroRepository.eliminarPorId(id);
    
}
export async function eliminarSuperheroePorNombre(nombre) {
    console.log('Capa Services - función eliminar por Nombre');
    return await superHeroRepository.eliminarPorNombre(nombre);

}