jQuery(function() {
    let videos = document.getElementsByClassName("bba-team-video");
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
});
