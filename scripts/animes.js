
let sourceVideos = [];
sourceVideos[0] = "https://animesgames.cc/animes/shurato-dublado-todos-os-episodios"; //SHURATO
sourceVideos[1] = "https://animesgames.cc/animes/yu-yu-hakusho-dublado-todos-os-episodios"; //YUYU HAKUSHO
sourceVideos[2] = "https://animesgames.cc/animes/street-fighter-ii-victory-todos-os-episodios"; //SFVII
sourceVideos[4] = "https://animesgames.cc/animes/dragon-ball-z-dublado-todos-os-episodios"; //DBZ //
sourceVideos[5] = "https://animesgames.cc/animes/naruto-classico-dublado-todos-os-episodios"; //NARUTO
sourceVideos[3] = "https://animesgames.cc/animes/os-cavaleiros-do-zodiaco-dublado-todos-os-episodios"; //CDZ
sourceVideos[6] = "https://animesgames.cc/animes/saint-seiya-omega-dublado-todos-os-episodios"; //SAINT SEYA OMEGA
sourceVideos[7] = "https://animesgames.cc/animes/yu-gi-oh-dublado-todos-os-episodios"; //YUGIOH
sourceVideos[8] = "https://animesgames.cc/animes/dragon-ball-dublado-todos-os-episodios"; //DRAGON BALL
sourceVideos[9] = "https://animesgames.cc/animes/dragon-ball-gt-dublado-todos-os-episodios"; //DBGT
sourceVideos[10] = "https://animesgames.cc/animes/avatar-a-lenda-de-aang-dublado-todos-os-episodios"; //AVATAR
sourceVideos[11] = "https://animesgames.cc/animes/castlevania-2-temporada-dublado-todos-os-episodios"; //CASTLEVANIA 2
sourceVideos[12] = "https://animesgames.cc/animes/castlevania-3-dublado-todos-os-episodios"; //CASTLEVANIA 3
sourceVideos[13] = "https://animesgames.cc/animes/castlevania-4-dublado-todos-os-episodios"; //CASTLEVANIA 4
sourceVideos[14] = "https://animesgames.cc/animes/shinzo-dublado-todos-os-episodios"; //SHINZO




//ALTERANDO O ATRIBUTO SRC DO ELEMENTO HTML VIDEO
let iframeFilme = document.getElementById("iframeFilme")

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
   