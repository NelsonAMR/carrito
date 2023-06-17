//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //agregar cursos
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos
    carrito.addEventListener('click', eliminaCurso);

    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos arreglo

        limpiarHTML(); //eliminamos todo el html
    });
}

//funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatos(cursoSeleccionado);
    }
}

function eliminaCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');

        //elimina curso
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        console.log(articulosCarrito);

        carritoHTML();
    };
}

function leerDatos(curso){ //lee contenido al cual dimos click
    // console.log(curso);

    //crear objeto con contenido curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si elemento existe en carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });

        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //agrega elementos a carrito
   
    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito de compras en html
function carritoHTML(){
    //limpiar html
    limpiarHTML();

    //reccore carrito
    articulosCarrito.forEach((articulo) => {
        const {imagen, titulo, precio, cantidad, id} = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>"
        </td>
        `;

        //agrega html de carrito en body
        contCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    //forma lenta
    // contCarrito.innerHTML = '';

    while(contCarrito.firstChild){
        contCarrito.removeChild(contCarrito.firstChild);
    }
}