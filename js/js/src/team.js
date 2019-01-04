/* global BigBlueColors */
/* global ColorFirstLetters */

jQuery(function() {

    //Videos animated on mouseover
    let videos = document.getElementsByClassName("bba-team-video");
    if(videos.length===0){
        return;
    }

    for(let i = 0;i<videos.length;i++){
        const video = videos[i];
        video.parentNode.addEventListener("mouseover",function (){
            if(video.paused ){
                video.play()
            }
        });
        video.parentNode.onmouseleave = function (){
            if(!video.paused){
                video.pause()
            }
        };
    }

    //Colors
    let wraps = document.getElementsByClassName("bba-tile-wrap");
    for(let i = 0;i<wraps.length;i++){
        const cIndex = (i+1) % BigBlueColors.colorCount;
        const color = BigBlueColors[`color${cIndex}`];
        const wrap = wraps[i];
        const circle = wrap.getElementsByClassName("bba-circle")[0];
        circle.style.backgroundColor = color;
        const titles = wrap.getElementsByClassName("bba-tile-name");
        ColorFirstLetters.colorizeWordsFirstLetterOfElement(titles[0],color, "white");
        ColorFirstLetters.colorizeWordsFirstLetterOfElement(titles[1],color);
    }

});
