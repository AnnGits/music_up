let container = document.querySelector(`.albums`);


for(let i = 0; i < albums.length; i++) {
    let album = albums[i];
    container.innerHTML += `
    <div class="col">
          <a href="album.html?id=${i}" class="text-decoration-none">
            <div class="card">
              <img src="${album.img}" alt="" class="card-image-top glas">
              <div class="card-body">
                <p class="card-text">
                  ${album.title}
                </p>
              </div>
            </div>
          </a>
        </div>
    `
}