var BigBluePrez = {
    scrollToPrezIndex(prezIndex){
        window.dispatchEvent( new CustomEvent('bba-scroll-prez', { 'detail': prezIndex } ));
    }
}

jQuery(function() {
    const minScrollDelay = 800;
    const domPrezs  = document.querySelectorAll(".bba-prez");
    const domHeader = document.getElementById("masthead");
    let headerHeight = domHeader.offsetHeight;
    let height = window.innerHeight - domHeader.offsetHeight;


    let oldScroll = 0;
    let lastScrollTime = 0;

    function showPrez(){
        let toAppear = document.getElementsByClassName("bba-prez-to-appear");
        for(let i = 0;i<toAppear.length;i++){
            const prez= toAppear[i];
            prez.style.opacity = 1;
        }
    }

    function updatePrezSize(){
        headerHeight = domHeader.offsetHeight;
        height = window.innerHeight - domHeader.offsetHeight;
        for(let i = 0;i<domPrezs.length;i++){
            const prez= domPrezs[i];
            if(i<domPrezs.length-1){
                prez.next = domPrezs[i+1];
            }
            if(i>0){
                prez.prev = domPrezs[i-1];
            }
            prez.isTile = true;
            let offset = headerHeight;vzml











             
            prez.style.height = "auto";
            setTimeout(()=>{
                let h;
                let prezLeft = prez.getElementsByClassName("bba-prez-left")[0];
                if(prezLeft){
                    h = Math.max(prezLeft.clientHeight,height);
                }
                else{
                    h = Math.max(prez.clientHeight+offset,height);
                }
                prez.style.height = h +"px";// tileCont.offsetHeight+"px";
                prez.computedHeight = h;// tileCont.offsetHeight;
            },50);

        }
    }

    function initPrez(){
        if(!BigBlueApp.isTouch){
            updatePrezSize();
            startListening();
            window.onresize = updatePrezSize;
        }
        else{
            initTouchPrez();
            updatePrezSize();
        }

        window.addEventListener("bba-scroll-prez",(event)=>{
            scrollToPrez(domPrezs[event.detail]);
        })

        setTimeout(()=>{
            showPrez();
        },1000);
    }

    function initTouchPrez(){
        const splits = document.getElementsByClassName("bba-prez-splitter");
        for(let i = 0; i< splits.length;i++){
            const split = splits[i];
            split.classList.add("bba-touch")
        }
        domHeader.classList.add("bba-touch-header");
        const socials =  document.getElementsByClassName("bba-social")[0];
        socials.style.top = "25px";
        const prezRight = document.getElementsByClassName("bba-prez-right")[0];
        prezRight.classList.add("bba-touch");

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
                    &&rect.bottom<height
                    &&rect.top>-prez.computedHeight
                    && dt > minScrollDelay
                ){
                    scrollToPrez(prez.next);
                    break;
                }
                else if(!scrollPos
                    &&prez.prev
                    &&rect.top>headerHeight +50
                    &&rect.top<prez.computedHeight*0.5
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

    function putHeaderAtPresPos(prez,prezRect){
        let scY = prezRect.top+window.scrollY-headerHeight;
        if(domHeader.style.top !== Math.round(scY)+"px"){
            domHeader.style.opacity = 0;
            setTimeout(()=>{
                let prezRect = prez.getBoundingClientRect();
                scY = prezRect.top+window.scrollY-headerHeight
                domHeader.style.top = scY+"px";
            },300);
            setTimeout(()=>{
                domHeader.style.opacity = 1;
            },
            500);

        }
    }

    function updateCurrentPrez(dt){

        for(let i = 0; i <domPrezs.length;i++){
            const prez = domPrezs[i];
            const prezRect = prez.getBoundingClientRect();
            if(isCurrentPrez(prezRect)){
                putHeaderAtPresPos(prez,prezRect);
                break;
            }
        }
    }

    function scrollToPrez(prez){
        const scY = prez.getBoundingClientRect().top+window.scrollY-headerHeight;
        setTimeout(()=>{
            window.scroll(window.scrollX,scY);
            oldScroll = window.scrollY;
        },100);

        if(!BigBlueApp.isTouch){
            setTimeout(()=>{
                putHeaderAtPresPos(prez,prez.getBoundingClientRect());
            },500);
        }

        lastScrollTime = Date.now();
    }

    initPrez();

});
