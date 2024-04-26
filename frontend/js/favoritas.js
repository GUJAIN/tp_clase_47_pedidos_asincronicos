window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const divMessage =  document.createElement("div")
  const home = document.createElement('p')
  home.style.fontWeight = "600"
  const botonHome = document.createElement("a")
  botonHome.setAttribute("href",`home.html`)
  home.innerText = 'Home'
  botonHome.appendChild(home)

  const h1 = document.createElement('h1')
  h1.textContent = "No agregaste peliculas a favoritos"
  

  app.appendChild(divMessage)
  divMessage.appendChild(botonHome)
  divMessage.appendChild(h1)
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  let data = localStorage.getItem('favoritos') 
  let datos = JSON.parse(data)
  let peliculas = Object.entries(datos).map(([key,value])=>value)

  /** Codigo que debemos usar para mostrar los datos en el frontend */
    //let data = peliculas.data;
  if (peliculas.length > 0) {
    h1.style.display = "none"

    peliculas.forEach((movie) => {

      const card = document.createElement("div");
      card.setAttribute("class", "card");
      
      const star = document.createElement("i")
      star.classList.add("fa-solid")
      star.classList.add("fa-star")

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(star);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });
  } else {
    divMessage.style.flexDirection = "column"
    divMessage.style.alignItems = "center"
    h1.style.display = "inline"
  }
    
  
};