txt = document.querySelector("#txt");
json_objeto = document.querySelector("#json-objeto");
json_array = document.querySelector("#json-array");
cargarapi = document.querySelector("#cargarapi");
resultado = document.querySelector("#resultado");

txt.addEventListener("click", cargarDesdeTxt);
json_objeto.addEventListener("click", cargarJSONObjeto);
json_array.addEventListener("click", () => {
  resultado.innerHTML = "";
  if (resultado.innerHTML.trim() == "") {
    cargarJSONArray();
  }
  
});

cargarapi.addEventListener("click", cargarAPI);

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

function cargarJSONObjeto() {
  const url = "/promesas/ejercicios/promesa1/empleado.json";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      resultado.innerHTML = JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error" + error);
    });
}

function cargarJSONArray() {
  const url = "/promesas/ejercicios/promesa1/empleados.json";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      data.forEach((datos) => {
        const nuevoElemento = document.createElement("p");
        nuevoElemento.innerHTML = JSON.stringify(datos);
        resultado.appendChild(nuevoElemento);
      });
    })
    .catch((error) => {
      console.error("Error" + error);
    });
}

function cargarAPI() {
    const url = "https://picsum.photos/list";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            data.forEach((datos) => {
    
                const authorUrl = datos.author_url;
                const nuevoElemento2 = document.createElement("a");
                nuevoElemento2.href = authorUrl;
                nuevoElemento2.textContent = "Ver Imagen";
                const nuevoElemento = document.createElement("div");

        
                nuevoElemento.innerHTML = `
                    <strong>Author:</strong> ${datos.author}<br>
                    <strong>Post:</strong> ${datos.post_url}<br>
                    <strong>ID:</strong> ${datos.id}<br>
                    <strong>Width:</strong> ${datos.width}<br>
                    <strong>Height:</strong> ${datos.height}<br>
                    ${nuevoElemento2.outerHTML}<br> 
                    <strong>Filename:</strong> ${datos.filename}<br>
                    <strong>Format:</strong> ${datos.format}<br>
                `; //outerHTML es para que no me lo imprima como cadena, sino como HTML, ya que la intención es que sea un href que ponga ver imagen

                
                resultado.appendChild(nuevoElemento);
            });
        })
        .catch((error) => {
            console.error("Error" + error);
        });
        resultado.innerHTML = "";
}
