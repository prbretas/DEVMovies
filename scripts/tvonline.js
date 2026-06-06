let iframePlutoTv = document.getElementById("iframePlutoTV")
let iframeCanal = document.getElementById("iframeCanal")
let canalBtn = document.getElementById("canalBtn")
let plutoBtn = document.getElementById("plutoBtn")

let sourceVideos = [];
sourceVideos[0] = "https://pluto.tv/pt/live-tv"; //PLUTOTV
sourceVideos[1] = "https://ultratvonline.org/"; //MENU CANAIS
sourceVideos[2] = "https://supertvaovivo.co/"; //SUPERTV

function abrirPlutoTv(){
    iframePlutoTv.setAttribute("src", sourceVideos[0]);
    iframeCanal.setAttribute("src", "");
}

function selecionarCanal() {
    if (iframeCanal.contentWindow && iframeCanal.contentWindow.document && iframeCanal.contentWindow.document.readyState === 'complete') {
      console.log("A pagina foi carregada com sucesso");
      iframeCanal.setAttribute("src", sourceVideos[1]);
      iframePlutoTv.setAttribute("src", "");
    } else {
        console.log("A pagina anterior nao foi carregada com sucesso, por isso passou para o proximo link");
      iframeCanal.setAttribute("src", sourceVideos[2]);
      iframePlutoTv.setAttribute("src", "");
    }
  }

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        abrirPlutoTv,
        selecionarCanal,
        sourceVideos
    };
}