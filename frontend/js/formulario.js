window.onload = () => {
    const body = document.querySelector('body')
    const form = document.querySelector('form')
    const editarPeli = document.querySelector("#editarPeli")
    const agregaPeli = document.querySelector("#agregaPeli")
    const borraPeli = document.querySelector("#borraPeli")
    const title = document.querySelector('#title')
    const rating = document.querySelector('#rating')
    const awards = document.querySelector('#awards')
    const release_date = document.querySelector('#release_date')
    const length = document.querySelector('#length')
  
    editarPeli.style.display = "none"
    borraPeli.style.display = "none"
  
    const urlParams = new URLSearchParams(location.search);
    const movieId = urlParams.get('id');
    const id = parseInt(movieId)
  
    const divHome =  document.createElement("div")
    divHome.style.display = 'flex'
    divHome.style.justifyContent = 'center'
  
    const home = document.createElement('p')
    home.style.fontSize = '18px'
    home.style.fontWeight = "600"
    const botonHome = document.createElement("a")
    botonHome.setAttribute("href",`home.html`)
    home.innerText = 'Home'
    botonHome.appendChild(home)
    
    divHome.appendChild(botonHome)
    body.appendChild(divHome)
    body.appendChild(form)
  
    if (id) {
      editarPeli.style.display = "inline"
      borraPeli.style.display = "inline"
      agregaPeli.style.display = "none"
  
      fetch(`http://localhost:3031/api/movies/${id}`)
      .then((response) => response.json())
      .then((pelicula) => {
        title.value = pelicula.data.title
        rating.value = pelicula.data.rating
        awards.value = pelicula.data.awards
        release_date.value = pelicula.data.release_date.split('T')[0]
        length.value = pelicula.data.length
      })
  
      editarPeli.addEventListener('click', (e) => {
        e.preventDefault()
        const movieUpdate = {
          title: title.value,      
          rating: rating.value,
          awards: awards.value,
          release_date: release_date.value,
          length: length.value
        }
        fetch(`http://localhost:3031/api/movies/update/${id}`,{
          method: 'PUT',
          headers: {'content-Type': 'application/json'},
          body: JSON.stringify(movieUpdate)
        })
        .then((response) => response.json())
        .then(() => {window.location.href = 'home.html'})
      })
  
      borraPeli.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`http://localhost:3031/api/movies/delete/${id}`,{
          method: 'DELETE',
          headers: {'content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then(() => {window.location.href = 'home.html'})
      })
    }
  
    agregaPeli.addEventListener('click', (e) => {
      e.preventDefault()
      const newMovie = {
        title: title.value,      
        rating: rating.value,
        awards: awards.value,
        release_date: release_date.value,
        length: length.value
      }
      fetch(`http://localhost:3031/api/movies/create`,{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(newMovie)
      })
      .then((response) => response.json())
      .then(() => {window.location.href = 'home.html'})
    })
  
  }