function getAlbum() {
    

    let search = new URLSearchParams(window.location.search);

    console.log(window.location.search);//write "?id=1"
    //new URLSearchParams избавляет от знаков вопроса и достаёт id (или любую другую переменную) как переменную)

    let id = search.get(`id`);
    console.log(id); // write 1
    return albums[id];
    // готово! id это нужное нам число
};

let container = document.querySelector(`.album`);

function renderError() {
    container.innerHTML = `Error! Redirect on main page througth 5 seconds`;
    setTimeout (() => {
        window.location.pathname = `index.html`
    }, 5000);
};

function renderAlbumInfo(){
    container.innerHTML += `
    <div class="card mb-3">
        <div class="row">
            <div class="col-4">
                <img src="${album.img}" alt="" class="img-fluid rounded-start">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text"><small class="text-muted">${album.year}</small></p>
                </div>
            </div>
        </div>
    </div>
    `;
};

function renderTracks(){
    let playlist = document.querySelector(`.playlist`);

    let tracks = album.tracks;
};//не используется

let album = getAlbum();

if (!album){

    renderError();

} else {

    renderAlbumInfo();

    let playlist = document.querySelector(`.playlist`);

    let tracks = album.tracks;

    function setupAudio() {

        let play = `assets/play-button.png`;
        let pause = `assets/pause.png`;

        let status = play;

        for (let g = 0; g < tracks.length; g++) {
            let track = tracks[g];
            playlist.innerHTML += `
            <li class="list-group-item d-flex align-items-center facetrack">
                <button class='track'>
                    <img src="assets/play-button.png" alt="" class="me-3" height="30px">
                </button>
                <div>
                    <div>${track.title}</div>
                    <div class="text secondary">${track.author}</div>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width:0%" ></div>
                </div>
                <div class="time ms-auto">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>
            `;
        };
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.facetrack`); 
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i]; 
            let timeNode = node.querySelector(`.time`);
            let statuse = node.querySelector(`.track`);  
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`);
            let progress = node.querySelector(`.progress`);
            let progressbar = progress.querySelector(`.progress-bar`);
            let isPlaying = false;
            statuse.addEventListener(`click`, function () {
                // Если трек сейчас играет...
                if (isPlaying) {
                    isPlaying = false;
                    // Поставить на паузу
                    status = play;
                    audio.pause();
                    statuse.innerHTML = `<img src="${status}" alt="" class="me-3" height="30px">`;
                    

                // Если трек сейчас не играет...
                } else {
                    isPlaying = true;
                    // Включить проигрывание
                    status = pause;
                    audio.play();
                    statuse.innerHTML = `<img src="${status}" alt="" class="me-3" height="30px">`;
                    
                    updateProgress();
                }
            });

            function updateProgress() {
                let time = getTime(audio.currentTime);
                if (timeNode.innerHTML != time) {
                    // Нарисовать актуальное время
                    timeNode.innerHTML = time;
                    progressbar.style.width = audio.currentTime * 100 / audio.duration + `%`;//не работает
                };
            
                // Нужно ли вызвать её ещё раз?
                if (isPlaying) {
                    requestAnimationFrame(updateProgress);
                };
                
            };
            // продолжи самостоятельно
        }
    };
    setupAudio();

    function getTime(time){
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds/60);
        let seconds = Math.floor(currentSeconds%60);

        if (minutes<10) {//1:5 => 01:05
            minutes = `0` + minutes;
        } 
        if (seconds<10) {
            seconds = `0` + seconds;
        }
        return `${minutes}:${seconds}`
    }

}


