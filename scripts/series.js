
let sourceVideos = [];
sourceVideos[0] = "https://embedder.net/v/tt0898266"; //BIG BANG THEORY
sourceVideos[1] = "https://embedder.net/v/tt11198330"; //HOUSEOFDRAGON
sourceVideos[2] = "https://embedder.net/v/tt11640018"; //LA BREA
sourceVideos[3] = "https://embed.warezcdn.net/serie/tt15431326"; //HP CAMP CASAS
sourceVideos[4] = "https://embed.warezcdn.net/serie/tt10234724"; //MOONKNIGHT
sourceVideos[5] = "https://embed.warezcdn.net/serie/tt11198330"; //SPOTIFY
sourceVideos[6] = "https://embedder.net/v/tt7631058"; //LORD OF THE RINS
sourceVideos[7] = "https://embed.warezcdn.net/serie/tt0108778"; //FRIENDS
sourceVideos[8] = "https://embedder.net/v/tt3846626"; //GOT
sourceVideos[9] = "https://embedder.net/v/tt6486762"; //CONTINENTAL DO MUNDO JOHN WICK
sourceVideos[10] = "https://embedder.net/v/tt0369179"; //2 AND HALF MAN
sourceVideos[11] = "https://embedder.net/v/tt12637874"; //FALLOUT
sourceVideos[12] = "https://www.weekseries.info/series/guardioes-da-floresta"
sourceVideos[13] = "https://mflix.sh/"
sourceVideos[14] = "https://www.weekseries.info/"
//https://www.weekseries.info/series/ed-stafford-contra-todos/
//https://www.weekseries.info/series/descobrindo-o-egito



//ALTERANDO O ATRIBUTO SRC DO ELEMENTO HTML VIDEO
let iframeFilme = document.getElementById("iframeFilme");

function alterarLinkFilme(indexFilme) {
  this.indexFilme = indexFilme
  iframeFilme.setAttribute("src", sourceVideos[indexFilme]);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        alterarLinkFilme,
        sourceVideos
    };
}

/*****************************************/
/*
let iframeSeries = document.getElementById("iframeSeries")
let getNumTemp = document.querySelector('.dropdown-toggle');

let numTemp = 0
let numEp = 4
let clinkEpTwoHalf = "//%E3%83%87-%E3%83%B3-%E3%83%83-%E3%82%AF-%E3%82%B9-%E3%83%B3-%E3%83%87-%E3%83%89-%E3%83%89-%E3%83%AB-%E3%83%9C-%E3%83%A9-%E3%83%AB%E3%82%B0%E3%83%AC%E3%83%95%E3%83%88-%E3%83%96%E3%83%A0%E3%83%95%E3%82%AF%E3%83%88%E3%83%97%E3%83%89%E3%83%A9%E3%82%A2.%E3%82%B8-1l1-%E3%82%B0.%E3%83%83-22-%E3%82%AF-11-%E3%82%B9-33-%E3%83%AB-99-%E3%83%97-75-%E3%82%BE--%E3%82%A8--%E3%83%96--%E3%82%B9-%E3%83%83.%E3%82%AF.%E3%82%B9.%E3%82%BA.%E3%82%AF.%E3%82%B8.%E3%82%B7%E3%82%B0%E3%83%8A%E3%83%AB%E3%83%91%E3%83%96%E3%83%AA%E3%82%B3-%E5%85%AC%E5%85%B1%E3%81%AE%E6%A8%99%E8%AD%98-%E3%83%90%E3%83%AC%E3%82%A6%E3%83%89%E3%83%83%E3%83%88%E3%82%AF%E3%82%A6%E3%82%B0%E3%83%88%E3%83%83%E3%83%88%E3%82%BA%E3%83%92.%E3%82%BB%E3%83%BC%E3%83%AB/player3/server1httphlb.php?vid=DHEMT09EP02"

console.log(getNumTemp)

function AltTemp(numTemp){
  clinkEpTwoHalf = "//%E3%83%87-%E3%83%B3-%E3%83%83-%E3%82%AF-%E3%82%B9-%E3%83%B3-%E3%83%87-%E3%83%89-%E3%83%89-%E3%83%AB-%E3%83%9C-%E3%83%A9-%E3%83%AB%E3%82%B0%E3%83%AC%E3%83%95%E3%83%88-%E3%83%96%E3%83%A0%E3%83%95%E3%82%AF%E3%83%88%E3%83%97%E3%83%89%E3%83%A9%E3%82%A2.%E3%82%B8-1l1-%E3%82%B0.%E3%83%83-22-%E3%82%AF-11-%E3%82%B9-33-%E3%83%AB-99-%E3%83%97-75-%E3%82%BE--%E3%82%A8--%E3%83%96--%E3%82%B9-%E3%83%83.%E3%82%AF.%E3%82%B9.%E3%82%BA.%E3%82%AF.%E3%82%B8.%E3%82%B7%E3%82%B0%E3%83%8A%E3%83%AB%E3%83%91%E3%83%96%E3%83%AA%E3%82%B3-%E5%85%AC%E5%85%B1%E3%81%AE%E6%A8%99%E8%AD%98-%E3%83%90%E3%83%AC%E3%82%A6%E3%83%89%E3%83%83%E3%83%88%E3%82%AF%E3%82%A6%E3%82%B0%E3%83%88%E3%83%83%E3%83%88%E3%82%BA%E3%83%92.%E3%82%BB%E3%83%BC%E3%83%AB/player3/server1httphlb.php?vid=DHEMT"+ numTemp.toString() + "EP"+ numEp.toString()
  iframeSeries.setAttribute("src", clinkEpTwoHalf)
  console.log("O LINK DO VIDEO É ESSE: "+ clinkEpTwoHalf)
}
*/