let iframeGame = document.getElementById("iframeFilme")

let srcLinks = [];
srcLinks[0] = "https://coolrom.com.au"; //cool room
srcLinks[1] = "https://www.myabandonware.com"; //My Abandonware
srcLinks[2] = "https://www.retrogames.cc/"; //retrogames
srcLinks[3] = "https://gam.onl/"; //retrogames


function altGameLink(){
  iframeGame.setAttribute("src", srcLinks[0]);
}

//ALTERANDO O ATRIBUTO SRC DO ELEMENTO HTML VIDEO

function alterarLinkGame(idLinkGame) {
 this.idLinkGame = idLinkGame
console.log(idLinkGame)
iframeGame.setAttribute("src", srcLinks[idLinkGame]);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        altGameLink,
        alterarLinkGame,
        srcLinks
    };
}
