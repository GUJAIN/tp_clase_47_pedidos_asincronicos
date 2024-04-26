window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const divAgregar =  document.createElement("div")
  const formCrear = document.createElement('p')
  formCrear.style.fontWeight = "800"
  const botonCrear = document.createElement("a")
  botonCrear.setAttribute("href",`formulario.html`)
  formCrear.innerText = 'Crear Pelicula'
  botonCrear.appendChild(formCrear)

  const pelisFavoritas = document.createElement('p')
  pelisFavoritas.style.fontWeight = "600"
  const linkFavorites = document.createElement("a")
  linkFavorites.setAttribute("href",`favoritas.html`)
  pelisFavoritas.innerText = 'Peliculas Favoritas'
  linkFavorites.appendChild(pelisFavoritas)
  
  app.appendChild(divAgregar)
  divAgregar.appendChild(botonCrear)
  divAgregar.appendChild(linkFavorites)
  app.appendChild(container);

  let favoritos = localStorage.getItem('favoritos')
  favoritos = favoritos ? JSON.parse(favoritos) : {}

  pelisFavoritas.style.display = 'none'

  // Aqui debemos agregar nuestro fetch
    fetch("http://localhost:3031/api/movies")
    .then((response) => response.json())
    .then((peliculas) => {

      let data = peliculas.data;

      // Aqui se crean las tarjetas con la info obtenida del fetch
      data.forEach((movie) => {
        const star = document.createElement("i")
        star.id = movie.id
        if (favoritos[movie.id]) {
          star.classList.add("fa-solid")
          star.classList.add("fa-star")
        } else {
          star.classList.add("fa-regular")
          star.classList.add("fa-star")
        }

        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const linkEdit = document.createElement("a")
        linkEdit.setAttribute("href",`formulario.html?id=${movie.id}`)
        linkEdit.textContent = 'Editar Pelicula'

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
        card.appendChild(linkEdit);

        star.addEventListener('click', (e) => {
          if (favoritos[movie.id]) {
            delete favoritos[movie.id]
            star.style.color = ""
            star.classList.remove("fa-solid")
            star.classList.add("fa-regular")
            localStorage.setItem('favoritos',JSON.stringify(favoritos))  
            if (Object.keys(favoritos).length == 0){
              pelisFavoritas.style.display = 'none'
            } 
          } else {
            favoritos[movie.id] = movie
            star.style.color = "yellow"
            star.classList.remove("fa-regular")
            star.classList.add("fa-solid")
            localStorage.setItem('favoritos',JSON.stringify(favoritos))   
            pelisFavoritas.style.display = 'inline'
          } 
        })
      })
    });
    
    if (Object.keys(favoritos).length > 0) {
      pFav.style.display = 'inline'
    } else {
      pFav.style.display = 'none'
    }
};