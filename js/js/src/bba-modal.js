var BigBlueModal = {
    modals: {},

    configPrez : {
        background : "/images/prez-full-container.svg",
        closeClass : "bba-modal-close prez",
        /*
        Content margin and height in percent
        Adapt it to your modal's background
        */
        top : 7,
        left : 10,
        right : 7,
        height : 63,

    },
    configTeam : {
        background : "/images/team-modal.svg",
        closeClass : "bba-modal-close team",
        top : 23,
        left : 20,
        right : 36,
        height : 37,

    },

    configGallery: {
        background : null,
        closeClass : "bba-modal-close gallery",
        modalClass : "bba-modal gallery",
        top : 5 ,
        left : 2,
        right : 2,
        height : 90,
    },

    createModal(contentId, config, options = {}){

        const configSmall= options.configSmall ||null;
        const assetPath = options.assetPath || BigBlueApp.assetsUrl;
        if(!BigBlueModal.modals[contentId]){
            const htmlContent = options.htmlContent || document.getElementById(contentId).innerHTML;

            const modalBackground = document.createElement("div");
            modalBackground.classList.add("bba-modal-container");
            if(window.innerWidth <700 && configSmall){
                config = configSmall;
            }
            const modal = document.createElement("div");
            if(config.modalClass){
                    modal.className =config.modalClass;
            }
            else{
                modal.classList.add("bba-modal");
            }
            modal.classList.add("hidden");
            setTimeout(()=>{
                modal.classList.remove("hidden");
            },0);
            if(config.background){
                modal.style.backgroundImage = `url("${assetPath}${config.background}")`;
            }
            //modal.style.top = `calc(${window.innerHeight/2}px + ${window.scrollY}px)`;

            //Close button
            const closeButton = document.createElement("div");
            closeButton.className = config.closeClass;
            modal.appendChild(closeButton);

            //Close events
            closeButton.onclick = ()=>{
                BigBlueModal.hideModal(contentId);
            };
            modalBackground.onpointerdown = ()=>{
                BigBlueModal.hideModal(contentId);
            }
            /*window.addEventListener("scroll", (event)=>{
                BigBlueModal.hideModal(contentId);
            });*/
            window.addEventListener("keydown", (event)=>{
                if(event.key==="Escape"){
                    BigBlueModal.hideModal(contentId);
                }
            });


            const spaceTop  = document.createElement("div");
            spaceTop.style.height = `${config.top}%`;

            const scroll =document.createElement("div");
            scroll.style.height = `${config.height}%`;
            scroll.style.marginLeft = `${config.left}%`;
            scroll.style.marginRight = `${config.right}%`
            scroll.style.overflowY = "auto"

            const modalContent = document.createElement("div");
            modalContent.classList.add("bba-modal-content");
            modalContent.innerHTML = htmlContent;
            const iframe = modalContent.getElementsByTagName("iframe")[0];
            if(iframe){
                iframe.setAttribute("src",iframe.getAttribute("src")+"?autoplay=1");
            }
            modal.appendChild(spaceTop);
            modal.appendChild(scroll);
            scroll.appendChild(modalContent);

            document.body.appendChild(modalBackground);
            document.body.appendChild(modal);
            BigBlueModal.modals[contentId]= {modal, background : modalBackground, shown : true};
        }
        else{
            document.body.appendChild(BigBlueModal.modals[contentId].background);
            BigBlueModal.modals[contentId].shown = true;
            const modal = (BigBlueModal.modals[contentId].modal);
            document.body.appendChild(BigBlueModal.modals[contentId].modal);
            setTimeout(()=>{
                modal.classList.remove("hidden");
            },0);
        }
    },

    hideModal(contentId){
        if(BigBlueModal.modals[contentId].shown){
            const modal = (BigBlueModal.modals[contentId].modal);
            document.body.removeChild(BigBlueModal.modals[contentId].background);
            modal.classList.add("hidden");
            setTimeout(()=>{
                document.body.removeChild(BigBlueModal.modals[contentId].modal);
            },150);
            BigBlueModal.modals[contentId].shown = false;
        }
    }

};
