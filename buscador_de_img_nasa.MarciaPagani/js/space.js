document.getElementById("btnBuscar").onclick = function() {
    const query = document.getElementById("inputBuscar").value.trim();
    if (!query) return alert('Por favor, ingresa un término de búsqueda.');

    fetchData(query);
  };

  function fetchData(query) {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then(data => displayResults(data.collection.items))
      .catch(error => {
        console.error('Error:', error);
        document.getElementById("contenedor").innerHTML = '<p>Error al obtener los datos de la API.</p>';
      });
  }

  function displayResults(items) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ''; // Limpiar resultados anteriores

    if (!items.length) {
      contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    const cards = items.map(item => createCard(item)).join('');
    contenedor.innerHTML = cards;
  }

  function createCard(item) {
    const imageData = item.links ? item.links[0] : null;
    const imageUrl = imageData ? imageData.href : '';
    const title = item.data[0].title || 'Sin título';
    const description = item.data[0].description || 'Sin descripción disponible.';
    const date = item.data[0].date_created || 'Fecha no disponible';

    return `
      <div class="card mb-3 col-md-4">
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"><small class="text-muted">Fecha: ${date}</small></p>
        </div>
      </div>`;
  }
