jQuery(function() {
    const minScrollDelay = 800;
    const domPrezs  = document.querySelectorAll(".bba-prez");
    const domHeader = document.getElementById("masthead");
    let headerHeight = domHeader.offsetHeight;
    let height = window.innerHeight - domHeader.offsetHeight;


    let oldScroll = 0;
    let lastScrollTime = 0;
    let timeoutHeaderAppear = null;

    function updatePrezSize(){
        headerHeight = domHeader.offsetHeight;
        height = window.innerHeight - domHeader.offsetHeight;
        for(let i = 0;i<domPrezs.length;i++){
            const prez= domPrezs[i];
            let next = null;
            if(i<domPrezs.length-1){
                prez.next = domPrezs[i+1];
            }
            if(i>0){
                prez.prev = domPrezs[i-1];
            }
            prez.style.height = height+"px";
            prez.computedHeight = height;
        }
    }


    function initPrez(){
        updatePrezSize();
        startListening();
        window.onresize = updatePrezSize;
    }

    function startListening(){
        window.addEventListener("scroll", (event)=>{
            let dt = Date.now()- lastScrollTime;
            updateCurrentPrez(dt);
            let scrollPos = true;
            if(window.scrollY<oldScroll){
                scrollPos = false;
            }
            for(let i = 0; i <domPrezs.length;i++){
                const prez = domPrezs[i];
                const rect = prez.getBoundingClientRect();
                if(scrollPos
                    &&prez.next
                    &&rect.top<-prez.computedHeight/10 +headerHeight
                    &&rect.top>-1*prez.computedHeight
                    && dt > minScrollDelay
                ){
                        scrollToPrez(prez.next);
                        break;
                }
                else if(!scrollPos
                        &&prez.prev
                        &&rect.top>prez.computedHeight/10 +headerHeight
                        &&rect.top<prez.computedHeight*1.1
                        && dt > minScrollDelay
                ){
                        scrollToPrez(prez.prev);
                        break;
                }
            };
            oldScroll = window.scrollY;
        });
    }

    function isCurrentPrez(prezRect){
        if(prezRect.top>0 &&prezRect.top<prezRect.bottom - prezRect.top   +headerHeight){
            return true;
        }
        return false;
    }

    function putHeaderAtPresPos(prezRect){
        const scY = prezRect.top+window.scrollY-headerHeight;
        if(domHeader.style.top !== scY+"px"){
            domHeader.style.opacity = 0;
            setTimeout(()=>{
                domHeader.style.top = scY+"px";
                domHeader.style.opacity = 1;
            },300);
        }
    }

    function updateCurrentPrez(dt){
        clearTimeout(timeoutHeaderAppear);
        timeoutHeaderAppear = setTimeout(()=>{
            let delay = dt - minScrollDelay;
            if(delay>0) {
                for(let i = 0; i <domPrezs.length;i++){
                    const prez = domPrezs[i];
                    const prezRect = prez.getBoundingClientRect();
                    if(isCurrentPrez(prezRect)){
                        putHeaderAtPresPos(prezRect);
                        break;
                    }
                }
            }
            else{
                setTimeout(()=>updateCurrentPrez(1000000000),Math.max(-delay-200,0));
            }
        },200);
    }

    function scrollToPrez(prez){
        const scY = prez.getBoundingClientRect().top+window.scrollY-headerHeight;
        setTimeout(()=>{
            window.scroll(window.scrollX,scY);
            oldScroll = window.scrollY;
        },100);
        putHeaderAtPresPos(prez.getBoundingClientRect());
        lastScrollTime = Date.now();
    }

    initPrez();

});
