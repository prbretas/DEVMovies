
let sourceVideos = [];
sourceVideos[0] = "https://embedder.net/e/tt0317219/"; //CARROS
sourceVideos[1] = "https://embedder.net/e/tt1216475/"; //CARROS 2
sourceVideos[2] = "https://embedder.net/e/tt1630029/"; //AVATAR 2
sourceVideos[3] = "https://embedder.net/e/tt2911666/"; //JOHN WICK DE VOLTA AO JOGO
sourceVideos[4] = "https://embedder.net/e/tt4425200/"; //JOHN WICK UM NOVO DIA PRA MATRR
sourceVideos[5] = "https://embedder.net/e/tt6146586/"; //JW PARABELLUM
sourceVideos[6] = "https://embedder.net/e/tt10366206/"; //BABA YAGA
sourceVideos[7] = "https://embedder.net/e/tt2906216/"; //DUNGEOSN DRAGONS
sourceVideos[8] = "https://embedder.net/e/tt11145118/"; //CREED 3
sourceVideos[9] = "https://embed.warezcdn.net/filme/tt10151854"; //SHAZAM 2
sourceVideos[10] = "https://embedder.net/e/movie?imdb=tt4630562"; //VELOZES 10
sourceVideos[11] = "https://embedder.net/e/movie?imdb=tt6495056"; //PATOS
sourceVideos[12] = "https://embedder.net/e/tt15837338/"; //PATRULHA CANINA SUPER
sourceVideos[13] = "https://embedder.net/e/tt28603694/"; //o porteiro
sourceVideos[14] = "https://embedder.net/e/tt3291150/"; //MERCENARIOS 4
sourceVideos[15] = "https://embedder.net/e/tt4495098"; //gran turismo
sourceVideos[16] = "https://www.dailymotion.com/embed/video/x8k4iv6"; //WHEELY
sourceVideos[17] = "https://embedder.net/e/tt0120623"; //VIDA DE INSETO
sourceVideos[18] = "https://embedder.net/e/movie?imdb=tt0103639"; //ALADIN
sourceVideos[19] = "https://mflix.sh/aventura/7247-patrulha-canina-o-filme" // PATRULHA CANINA 1

/*
https://embedder.net/e/tt3606752/     -   carros 3
*/

//ALTERANDO O ATRIBUTO SRC DO ELEMENTO HTML VIDEO
let iframeFilme = document.getElementById("iframeFilme");

function alterarLinkFilme(indexFilme) {
 this.indexFilme = indexFilme
console.log(indexFilme)
iframeFilme.setAttribute("src", sourceVideos[indexFilme]);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        alterarLinkFilme,
        sourceVideos
    };
}

