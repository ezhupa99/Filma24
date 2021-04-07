function removeYTAd() {
    document.querySelector('#vidad').remove();
}

function removeWidgetAd(){
    document.querySelector('.widgets').remove();
}

function getVideo(){
    const video = document.querySelector('video');
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.style.width = "100vw";
    body.style.height = "100vh";
    body.style.margin = "0";
    body.style.padding = "0";
    body.append(video);
}

removeYTAd();
removeWidgetAd();
// getVideo();
