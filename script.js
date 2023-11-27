
txt = document.querySelector("#txt");
json_objeto = document.querySelector("#json-objeto");
json_array = document.querySelector("#json-array");
cargarapi = document.querySelector("#cargarapi");
resultado = document.querySelector("#resultado");
// Función para manejar operaciones genéricas de fetch
function fetchData(url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      } else {
        return response.json(); // Suponiendo que la respuesta siempre es JSON
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error" + error);
    });
    restablecer();
}
function restablecer(){
  resultado.textContent="";
}
// Función para cargar datos desde un archivo de texto
function cargarDesdeTxt() {
  const url = "/promesas/ejercicios/promesa1/datos.txt";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      } else {
        return response.text();
      }
    })
    .then((data) => {
      resultado.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error" + error);
    });
}
// Función para cargar un objeto JSON
function cargarJSONObjeto() {
  const url = "/promesas/ejercicios/promesa1/empleado.json";
  fetchData(url, (data) => {
    resultado.innerHTML = JSON.stringify(data);
  });
}

// Función para cargar un array JSON
function cargarJSONArray() {
  const url = "/promesas/ejercicios/promesa1/empleados.json";
  fetchData(url, (data) => {
    data.forEach((datos) => {
      const nuevoElemento = document.createElement("p");
      nuevoElemento.innerHTML = JSON.stringify(datos);
      resultado.appendChild(nuevoElemento);
    });
  });
}

// Función para cargar datos desde una API
function cargarAPI() {
  const url = "https://picsum.photos/list";
  fetchData(url, (data) => {
    data.forEach((datos) => {
      const authorUrl = datos.author_url;
      const nuevoElemento2 = document.createElement("a");
      nuevoElemento2.href = authorUrl;
      nuevoElemento2.textContent = "Ver Imagen";
      const nuevoElemento = document.createElement("div");

      nuevoElemento.innerHTML = `
        <strong>Autor:</strong> ${datos.author}<br>
        <strong>Publicación:</strong> ${datos.post_url}<br>
        <strong>ID:</strong> ${datos.id}<br>
        <strong>Ancho:</strong> ${datos.width}<br>
        <strong>Alto:</strong> ${datos.height}<br>
        ${nuevoElemento2.outerHTML}<br> 
        <strong>Nombre de archivo:</strong> ${datos.filename}<br>
        <strong>Formato:</strong> ${datos.format}<br>
      `;//OuterHTML lo uso para que me imprima el HTML tal y como es, si no no aparecería el href ni el contenido

      resultado.appendChild(nuevoElemento);
    });
  });
  resultado.innerHTML = "";
}

// Event listeners
txt.addEventListener("click", cargarDesdeTxt);
json_objeto.addEventListener("click", cargarJSONObjeto);
json_array.addEventListener("click", cargarJSONArray);
cargarapi.addEventListener("click", cargarAPI);
