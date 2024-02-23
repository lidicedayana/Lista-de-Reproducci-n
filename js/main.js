if (!localStorage.getItem('isLogged')) {
    window.location.href = './pages/login.html';
}



class Cancion {
    constructor(id, nombre, autor, duracion, album, anio, genero, cover, urlsong) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.duracion = duracion;
        this.album = album;
        this.anio = anio;
        this.genero = genero;
        this.cover = cover;
        this.urlsong = urlsong;


    }

    getNombreCancion() {
        return this.nombre;
    }



    getArtista() {
        return this.autor;
    }

    getDuracion() {
        return this.duracion;
    }

    getAlbum() {
        return this.album;
    }

    getAnio() {
        return this.anio;
    }

    getGenero() {
        return this.genero;
    }

    getCover() {
        return this.cover;
    }

    getUrlSong() {
        return this.urlsong;
    }
}

class Listas {
    constructor(nombre, listaCanciones) {
        this.nombre = nombre;
        this.listaCanciones = listaCanciones;
    }

    getPlayListNombre() {
        return this.nombre;
    }

    getPlayListSong() {
        return this.listaCanciones;
    }



    addsongtoplay(Cancion) {
        const isDuplicate = this.listaCanciones.some(song => song.id === Cancion.id);

        // Si la canción no es un duplicado, agrégala a la lista
        if (!isDuplicate) {
            this.listaCanciones.push(Cancion);
            this.dibujarCanciones();
        }
    }

    dibujarCanciones() {
        let canciones = document.getElementById(this.nombre);
        let alterna = "";
        let alterna2 = "";
        let alterna11 = "";
        let alterna12 = "";
        let listaact = "";
        switch (this.nombre) {
            case 'resFavoritos':
                alterna = 'bi bi-heart';
                alterna2 = 'bi bi-plus-circle';
                alterna11 = 'EliminarPlaylist';
                alterna12 = 'addPlayList';
                listaact = 'favoritos';
                break;
            case 'resPlaylist':
                alterna = 'bi bi-heart-fill';
                alterna2 = 'bi bi-dash-circle';
                alterna11 = 'addPlayList';
                alterna12 = 'EliminarPlaylist';
                listaact = 'Playlist';
                break;
        }
        canciones.innerHTML = '';
        this.listaCanciones.forEach(song => {
            canciones.innerHTML += `<div class="properties_musics_list" id="res_${song.id}">
                <img src="${song.cover}" alt="cancion">
                <div class="left_direction">
                    <h2>${song.nombre}</h2>
                    <h3>${song.autor}</h3>
                    <span>${song.genero}</span>
                </div>
                <div class="right_direction">
                    <button  data-idCancion="${song.id}" onclick="reproductor.play(${song.id},'${listaact}')"> <i  class="bi bi-play-circle-fill"></i></button>
                    <button  class="favorites" data-idCancion="${song.id}" onclick="reproductor.${alterna11}(${song.id},'favoritos')"> <i class="${alterna}"></i></button>
                    <button class="addPlaylist" data-idCancion="${song.id}" onclick="reproductor.${alterna12}(${song.id},'Playlist')"> <i class="${alterna2}"></i></button>
                </div>
            </div>`;
            reproductor.cambiarPortada();

        });



    }


    removeSongFromList(cancion) {
        this.listaCanciones = this.listaCanciones.filter(song => song.id !== cancion.id);
        this.dibujarCanciones(); // Actualiza la visualización de las canciones
    }

    // playPlaylist() {
    //     this.listaCanciones.forEach(song => {
    //         reproductor.play(song.id); // Llama al método play del reproductor para reproducir la canción
    //     });
    // }
}

class Reproductor {
    currentSong;
    audio;
    catalogoCanciones;
    filtroCanciones;
    currentPlayList;


    constructor() {
        this.catalogoCanciones = [
            new Cancion(1, "Amarilla se pone", "Fuerza Mayor", "3:20", "Album1", "2017", "Salsa", "./cover/amarilla_se_pone.jpg", "./song/AMARILLA_SE_PONE.mp3"),
            new Cancion(2, "Ella y yo", "Aventura Ft Don Omar", "3:20", "Album2", "2005", "Urbano", "./cover/ella_y_yo.jpg", "./song/Aventura-Ella_Y_Yo_feat_Don_Omar.mp3"),
            new Cancion(3, "Perro negro", "Feid, Bad Bunny", "3:20", "Album3", "2023", "Urbano", "./cover/perro_negro.jpg", "./song/Bad_Bunny_Feid_PERRONEGRO.mp3"),
            new Cancion(4, "Por el contrario", "Becky G", "3:20", "Album4", "2023", "Regional mexicano", "./cover/por_el_contrario.jpg", "./song/Becky_G-POR_EL_CONTRARIO.mp3"),
            new Cancion(5, "Happier", "Ed Sheeran", "3:20", "Album5", "2019", "Pop", "./cover/happier.jpg", "./song/EdSheeran-Happier.mp3"),
            new Cancion(6, "El gran varon", "Willy Colon", "3:20", "Album6", "1999", "Salsa", "./cover/el_gran_varon.jpg", "./song/El_Gran_Varon.mp3"),
            new Cancion(7, "Classy 101", "Feid, Young Miko", "3:20", "Album7", "2022", "Urbano", "./cover/classy_101.jpg", "./song/Feid_Young_Miko-Classy_101.mp3"),
            new Cancion(8, "I hate u i love u", "Gnash", "3:20", "Album8", "2014", "Pop", "./cover/i_hate_u_i_love_u.jpg", "./song/gnash-i_hateu_i_loveu.mp3"),
            new Cancion(9, "Ordinary Girl", "Miley Cyrus", "3:20", "Album9", "2008", "Pop", "./cover/ordinary_girl.jpg", "./song/HannahMontana-OrdinaryGirl.mp3"),
            new Cancion(10, "You'll always find your way back", "Miley Cyrus", "3:20", "Album10", "2008", "Country", "./cover/you_always_find_your_way_and_theclimb.jpg", "./song/HannahMontana-You'll_always_find_your_way_back_home.mp3"),
            new Cancion(11, "Happier", "Olivia Rodrigo", "3:20", "Album11", "2021", "Pop", "./cover/olivia-happier.jpg", "./song/happier_olivia.mp3"),
            new Cancion(12, "Amargura", "Karol G", "3:20", "Album12", "2023", "Urbano", "./cover/amargura.jpg", "./song/KAROL_G_Amargura.mp3"),
            new Cancion(13, "S91", "Karol G", "3:20", "Album13", "2023", "Urbano", "./cover/s91.jpg", "./song/KAROL_G-S91.mp3"),
            new Cancion(14, "Lionheart", "Demi Lovato", "3:20", "Album14", "2014", "Pop", "./cover/lionheart.jpg", "./song/Lionheart-DemiLovato.mp3"),
            new Cancion(15, "El gran conquistador", "Los Niches", "3:20", "Album15", "2000", "Salsa", "./cover/el_gran_conquistador.jpg", "./song/LosNiches-ElGranConquistador.mp3"),
            new Cancion(16, "Según quien", "Maluma, Carin Leon", "3:20", "Album16", "2023", "Urbano", "./cover/segun_quien.jpeg", "./song/Maluma_CarinLeon-SegúnQuién.mp3"),
            new Cancion(17, "Angels like you", "Miley Cyrus", "3:20", "Album17", "2020", "Pop", "./cover/angels_like_you.jpg", "./song/MileyCyrus-AngelsLikeYou.mp3"),
            new Cancion(18, "The Climb", "Miley Cyrus", "3:20", "Album18", "2010", "Pop", "./cover/you_always_find_your_way_and_theclimb.jpg", "./song/MileyCyrus-TheClimb.mp3"),
            new Cancion(19, "Nightingale", "Demi Lovato", "3:20", "Album19", "2015", "Pop", "./cover/nightingale.jpeg", "./song/Nightingale.mp3"),
            new Cancion(20, "Deja vu", "Olivia Rodrigo", "3:20", "Album20", "2021", "Pop", "./cover/deja_vu.jpg", "./song/OliviaRodrigo_dejavu.mp3"),
            new Cancion(21, "Traitor", "Olivia Rodrigo", "3:20", "Album21", "2021", "Pop", "./cover/traitor.jpg", "./song/OliviaRodrigo-traitor.mp3"),
            new Cancion(22, "Vampire", "Olivia Rodrigo", "3:20", "Album22", "2021", "Pop", "./cover/vampire.jpg", "./song/OliviaRodrigo-vampire.mp3"),
            new Cancion(23, "Over again", "One Direction", "3:20", "Album23", "2013", "Pop", "./cover/over_again.jpeg", "./song/OneDirection-OverAgain.mp3"),
            new Cancion(24, "Qlona", "Karol G, Peso Pluma", "3:20", "Album24", "2023", "Urbano", "./cover/qlona.jpg", "./song/QLONA-Karol GxPesoPluma.mp3"),
            new Cancion(25, "Creep", "Radiohead", "3:20", "Album25", "2002", "Rock", "./cover/creep.jpg", "./song/Radiohead-Creep.mp3"),
            new Cancion(26, "Uno se cura", "Raulin Rosendo", "3:20", "Album26", "2001", "Salsa", "./cover/uno_se_cura.jpg", "./song/RAULIN_ROSENDO-UNO_SE_CURA.mp3"),
            new Cancion(27, "Closer", "The Chainsmokers", "3:20", "Album27", "2018", "Electronica", "./cover/closer.jpg", "./song/TheChainsmokers-Closer.mp3"),
            new Cancion(28, "When I Look At You", "Miley Cyrus", "3:20", "Album28", "2017", "Pop", "./cover/when_i_look_at_you.jpg", "./song/WhenILookAtYou.mp3"),
            new Cancion(29, "You belong with me", "Taylor Swift", "3:20", "Album29", "2011", "Country", "./cover/you_belong_with_me.png", "./song/YouBelongWithMe.mp3"),
            new Cancion(30, "Que agonia", "Yuridia, Angela Aguilar", "3:20", "Album30", "2023", "Regional mexicano", "./cover/que_agonia.jpg", "./song/Yuridia-AngelaAguilar-QuéAgonía.mp3")

        ];

        this.mostrarCanciones();
        this.currentSong = this.catalogoCanciones[0];
        this.audio = new Audio();
        this.currentPlayList = 'busqueda';
        this.favoritos = new Listas('resFavoritos', []);
        this.playlist = new Listas('resPlaylist', []);
        this.busqueda = new Listas('resBusqueda', []);
        let buscar = document.getElementById("buscar");
        let searchInput = document.getElementById("search");
        buscar.addEventListener("click", () => {
            this.buscarCancion(searchInput.value);
        });
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                this.buscarCancion(searchInput.value);
            }
        });


        let play = document.getElementById("play");
        play.addEventListener("click", () => {
            this.play();
        });

        let stop = document.getElementById("pause");
        stop.addEventListener("click", () => {
            this.pause();
        });

        let play2 = document.getElementById("play2");
        play2.addEventListener("click", () => {
            this.play2();
        });

        let mute = document.getElementById("mute");
        mute.addEventListener("click", () => {
            this.mute();
        });

        let muteButton = document.getElementById("mute");
        if (this.audio.muted) {
            muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>'; // Cambia al icono de mute
        } else {
            muteButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>'; // Cambia al icono de volumen
        }

        let nextButton = document.getElementById("next");
        nextButton.addEventListener("click", () => {
            reproductor.siguienteCancion();
        });

        let backButton = document.getElementById("back");
        backButton.addEventListener("click", () => {
            reproductor.cancionAnterior();
        });

        this.audio.addEventListener('ended', () => {
            this.siguienteCancion();
        });




    }

    renderizarListaCanciones(lista, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Limpiar el contenedor antes de renderizar

        lista.forEach(song => {
            const div = document.createElement('div');
            div.classList.add('properties_musics_list');
            div.id = `res_${song.id}`;
            div.innerHTML = `
                <img src="${song.cover}" alt="cancion">
                <div class="left_direction">
                    <h2>${song.nombre}</h2>
                    <h3>${song.autor}</h3>
                    <span>${song.genero}</span>
                </div>
                <div class="right_direction">
                    <button onclick="reproductor.play(${song.id},'general')" id="play"> <i class="bi bi-play-circle-fill"></i></button>
                    <button class="favorites" data-idCancion="${song.id}" onclick="reproductor.addPlayList(${song.id},'favoritos')" > <i class="bi bi-heart-fill"></i></button>
                    <button class="addPlaylist" data-idCancion="${song.id}" onclick="reproductor.addPlayList(${song.id},'Playlist')"> <i class="bi bi-plus-circle"></i></button>
                </div>`;
            container.appendChild(div);
        });

    }

    mostrarCanciones = function () {
        this.renderizarListaCanciones(this.catalogoCanciones, "musics_total_2");

    }

    // Métodos restantes del reproductor...



    addPlayList(id, playlist1) {
        let cancion = this.catalogoCanciones.find(song => song.id == id);
        debugger;

        switch (playlist1) {

            case 'favoritos':
                this.favoritos.addsongtoplay(cancion);
                break;
            case 'Playlist':
                this.playlist.addsongtoplay(cancion);
                break;
        }


    }

    EliminarPlaylist(id, playlist1) {
        let cancion = this.catalogoCanciones.find(song => song.id == id);
        switch (playlist1) {
            case 'favoritos':
                this.favoritos.removeSongFromList(cancion);
                break;
            case 'Playlist':
                this.playlist.removeSongFromList(cancion);
                break;
        }
    }


    mostrarBusqueda(filtroCanciones) {
        this.renderizarListaCanciones(filtroCanciones, "musics_total_2");
    }

    buscarCancion = function (cancionaBuscar) {
        cancionaBuscar = cancionaBuscar.trim(cancionaBuscar);
        cancionaBuscar = cancionaBuscar.toLowerCase();
        let canciones = document.getElementById("musics_total_2");
        canciones.innerHTML = '';
        let resNombre = this.catalogoCanciones.filter(song => song.nombre.toLowerCase().match(cancionaBuscar));
        let resGenero = this.catalogoCanciones.filter(song => song.genero.toLowerCase().match(cancionaBuscar));
        let resAutor = this.catalogoCanciones.filter(song => song.autor.toLowerCase().match(cancionaBuscar));
        let filtroCanciones = [...resNombre, ...resGenero, ...resAutor];
        filtroCanciones = [...new Set(filtroCanciones)];
        this.mostrarBusqueda(filtroCanciones);

    }


    cambiarPortada = function () {
        const cover = document.getElementById("cover");
        cover.src = this.currentSong.cover;
        const propeties = document.getElementById("caracteristicas_cancion");
        const botonesContainer = document.getElementById("buttonsecondary_favpl");
        propeties.innerHTML = `
            <h2 class="cancion">${this.currentSong.nombre}</h2>
                    <h3 class="autor">${this.currentSong.autor}</h3>
                    <span class="genero">${this.currentSong.genero}</span>`;

        botonesContainer.innerHTML = '';

        // Verificar si la canción actual está en la lista de favoritos
        const isFavorite = this.favoritos.listaCanciones.some(song => song.id === this.currentSong.id);

        // Verificar si la canción actual está en la lista de reproducción
        const isInPlaylist = this.playlist.listaCanciones.some(song => song.id === this.currentSong.id);

        // Crear y agregar botones de agregar a favoritos o eliminar de favoritos según corresponda
        const agregarFavoritoButton = document.createElement('button');
        agregarFavoritoButton.classList.add('addFavorite');
        agregarFavoritoButton.dataset.idCancion = this.currentSong.id;
        agregarFavoritoButton.innerHTML = isFavorite ? '<i class="bi bi-heart"></i>' : '<i class="bi bi-heart-fill"></i>';
        agregarFavoritoButton.onclick = () => {
            if (isFavorite) {
                reproductor.EliminarPlaylist(this.currentSong.id, 'favoritos');
            } else {
                reproductor.addPlayList(this.currentSong.id, 'favoritos');
            }
         
            reproductor.cambiarPortada(); // Actualizar la portada después de agregar o eliminar de favoritos
        };
        botonesContainer.appendChild(agregarFavoritoButton);

        // Crear y agregar botones de agregar a la lista de reproducción o eliminar de la lista de reproducción según corresponda
        const agregarPlaylistButton = document.createElement('button');
        agregarPlaylistButton.classList.add('addPlaylist');
        agregarPlaylistButton.dataset.idCancion = this.currentSong.id;
        agregarPlaylistButton.innerHTML = isInPlaylist ? '<i class="bi bi-dash-circle"></i>' : '<i class="bi bi-plus-circle"></i>';
        agregarPlaylistButton.onclick = () => {
            if (isInPlaylist) {
                reproductor.EliminarPlaylist(this.currentSong.id, 'Playlist');
            } else {
                reproductor.addPlayList(this.currentSong.id, 'Playlist');
            }
            reproductor.cambiarPortada(); // Actualizar la portada después de agregar o eliminar de la lista de reproducción
        };
        botonesContainer.appendChild(agregarPlaylistButton);
    };

  

    play = function (id, lista) {
        // Busca la canción correspondiente al ID
        this.currentSong = this.catalogoCanciones.find(song => song.id === id);
        if (this.currentSong !== undefined) {
            // Establece la URL de la canción y reproducela
            this.audio.src = this.currentSong.urlsong;
            this.audio.play();
            // Actualiza la portada y la información de la canción
            this.cambiarPortada();

            this.currentPlayList = lista;

        }
    }






    pause = function () {
        // Pausa la cancion que esta en reproduccion actualmente
        this.audio.pause();

    }
    play2 = function () {
        // sigue con la reproduccion de la cancion que esta en reproduccion actualmente
        this.audio.play();
    }



    mute = function () {
        // Alterna entre activar y desactivar el mute
        this.audio.muted = !this.audio.muted;

        // Cambia el icono del botón de mute según el estado actual del mute
        let muteButton = document.getElementById("mute");
        if (this.audio.muted) {
            muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>'; // Cambia al icono de mute
        } else {
            muteButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>'; // Cambia al icono de volumen
        }
    }

    siguienteCancion = function () {
        let currentList = [];
        switch (this.currentPlayList) {
            case 'favoritos':
                currentList = this.favoritos.listaCanciones;
                break;
            case 'Playlist':
                currentList = this.playlist.listaCanciones;
                break;
            default:
                currentList = this.catalogoCanciones;
                break;
        }

        if (currentList.length === 0) return; // Verificar si la lista está vacía

        // Obtener el índice de la canción actual
        let currentIndex = 0;
        if (this.currentSong) {
            currentIndex = currentList.findIndex(song => song.id === this.currentSong.id);
        }

        // Calcular el índice de la siguiente canción
        let nextIndex = currentIndex + 1;
        if (nextIndex >= currentList.length) {
            nextIndex = 0; // Volver al principio de la lista si se alcanza el final
        }

        // Establecer la próxima canción como la canción actual
        this.currentSong = currentList[nextIndex];
        this.audio.src = this.currentSong.urlsong;
        this.audio.play();
        this.cambiarPortada();
    }


    cancionAnterior = function () {
        let currentList = [];
        switch (this.currentPlayList) {
            case 'favoritos':
                currentList = this.favoritos.listaCanciones;
                break;
            case 'Playlist':
                currentList = this.playlist.listaCanciones;
                break;
            default:
                currentList = this.catalogoCanciones;
                break;
        }

        if (currentList.length === 0) return; // Verificar si la lista está vacía

        // Obtener el índice de la canción actual
        let currentIndex = 0;
        if (this.currentSong) {
            currentIndex = currentList.findIndex(song => song.id === this.currentSong.id);
        }

        // Calcular el índice de la canción anterior
        let previousIndex = currentIndex - 1;
        if (previousIndex < 0) {
            previousIndex = currentList.length - 1; // Ir al final de la lista si se alcanza el principio
        }

        // Establecer la canción anterior como la canción actual
        this.currentSong = currentList[previousIndex];
        this.audio.src = this.currentSong.urlsong;
        this.audio.play();
        this.cambiarPortada();
    }


}

let reproductor = new Reproductor();
