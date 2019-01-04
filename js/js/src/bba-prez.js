jQuery(function() {
    const minScrollDelay = 800;
    const domPrezs  = document.querySelectorAll(".bba-prez");
    const domHeader = document.getElementById("masthead");
    let headerHeight = domHeader.offsetHeight;
    let height = window.innerHeight - domHeader.offsetHeight;


    let oldScroll = 0;
    let lastScrollTime = 0;
    let timeoutHeaderAppear = null;

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
            let next = null;
            if(i<domPrezs.length-1){
                prez.next = domPrezs[i+1];
            }
            if(i>0){
                prez.prev = domPrezs[i-1];
            }
            //if(tilesCont.length>0){
                prez.isTile = true;
                let offset = headerHeight;
                if(i===0){
                    console.log("1st prez computed height",prez.clientHeight);
                }
                console.log("height",height);
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
            /*}
            else{
                prez.style.height = height+"px";
                prez.computedHeight = height;
            }*/
        }
    }

    function initPrez(){
        updatePrezSize();
        showPrez();

        window.onresize = updatePrezSize;
        setTimeout(()=>{
            updatePrezSize();
            startListening();
        },2000);
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
                    console.log("UP");
                    console.log("bottom",rect.bottom);
                    console.log("top",rect.top);
                        scrollToPrez(prez.next);
                        break;
                }
                else if(!scrollPos
                        &&prez.prev
                        &&rect.top>headerHeight +50
                        &&rect.top<prez.computedHeight*0.5
                        && dt > minScrollDelay
                ){
                    console.log("BOT");

                    console.log("bottom",rect.bottom);
                    console.log("top",rect.top);
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
