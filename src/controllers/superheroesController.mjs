import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,crearNuevoSuperheroe, 
        actualizarSuperheroe, eliminarSuperheroePorId, eliminarSuperheroePorNombre }
  from '../services/superheroesService.mjs';
import {renderizarSuperheroe, renderizarListaSuperheroes }
  from '../views/responseView.mjs';

export async function obtenerSuperHeroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).send(superheroeFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener al superhéroe',
      error: error.message });
  }
}
/*
export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener los superhéroes',
      error: error.message });
  }
}*/
export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    
    const heroes = await obtenerTodosLosSuperheroes(); // Llama al servicio que trae los héroes
    const successMessage = req.session.successMessage;
    delete req.session.successMessage;
    res.render('dashboard', {superheroes: heroes, successMessage}); // Renderiza la vista con los datos
  } catch (error) {
    console.error('Error al obtener superhéroes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes con ese atributo'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
      error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes mayores de 30 años'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30',
      error: error.message });
  }
  
}
/*
export async function crearNuevoSuperheroeController(req, res) {

    try {
        const datos = req.body;
        console.log("Datos Recibidos: ", datos)
        const superheroeCreado = await crearNuevoSuperheroe(datos);
        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Superheroe nuevo no encontrado' })
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
      
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'error al crear nuevo superheroe' })
    }
}
*/
export async function agregarNuevoSuperheroeController(req, res) {
    try {
        const datos = req.body; // Obtiene los datos del cuerpo de la solicitud
        const superheroeCreado = await crearNuevoSuperheroe(datos);

        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Error al crear superhéroe' });
        }
        // Guardamos el mensaje de éxito en la sesión
        req.session.successMessage = '¡Superhéroe creado exitosamente!';
       // Redirigimos al dashboard
      res.redirect('/api/heroes'); 
    } 
    catch (error) {
        res.render('addSuperhero', {
            errorMessage: 'Hubo un error al crear el superhéroe. Asegúrate de completar todos los campos correctamente.'
        });
    }
}

//modificar
/*
export async function actualizarSuperheroeController(req, res) {

    try {
        const { id } = req.params;
        const datosActualizar = req.body;
        console.log(id);
        console.log(typeof (id));

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizar);
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe a actualizar no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}
*/
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizar);
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe a actualizar no encontrado.' });
        }

        // Guardar mensaje de éxito en sesión
        req.session.successMessage = '¡Superhéroe editado exitosamente!';
        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

/*export async function eliminarSuperheroePorIdController(req, res) {
    try{
        console.log('Capa controller - función eliminar por Id');
        const{ id }= req.params;
        const superheroeEliminado = await eliminarSuperheroePorId(id);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminado no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}
    */
   /**
 * Controlador para eliminar un superhéroe por su ID.
 */
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorId(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminar no encontrado.' });
        }
         
        // Guardamos el mensaje de éxito en la sesión
        req.session.successMessage = '¡Superhéroe eliminado exitosamente!';
       // Redirigimos al dashboard
      res.redirect('/api/heroes'); 
    } 
    
    catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res){

    try{
        console.log('Capa controller - función eliminar por Nombre');
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminado no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export async function renderizarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id); // una función que devuelve el superhéroe por su ID

    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    res.render('editSuperhero', { superheroe }); // Esto es lo que carga el archivo EJS
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al cargar el formulario de edición',
      error: error.message,
    });
  }
}