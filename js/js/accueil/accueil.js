function bigblueload() {
    //Hide classic menu
    var header = document.getElementById("masthead");
    header.style.display = "none";

    //Big Blue globals
    var maxWidth = 1000;
    var ratio = 1155 / 837;
    var container = document.getElementById("logo-container");
    var logoDom, armIdleDom, armDom, fistDom, shoulderDom;
    var logoWidth;
    var armShown = false, armPosition;

    var menuDoms = [];
    var menuHover = null;
    var menuData = [];


    function initLogo() {
        logoDom = document.createElement("img");
        logoDom.src = BigBlueApp.assetsUrl + '/images/logo-no-arms.svg';
        logoDom.classList.add("bigblue-logo");

        armIdleDom = document.createElement("img");
        armIdleDom.src = BigBlueApp.assetsUrl + '/images/arm.svg';
        armIdleDom.classList.add("bigblue-logo");

        shoulderDom = document.createElement("img");
        shoulderDom.src = BigBlueApp.assetsUrl + '/images/shoulder.svg';
        shoulderDom.classList.add("bigblue-shoulder");
        shoulderDom.style.visibility = "hidden";


        container.appendChild(logoDom);
        container.appendChild(armIdleDom);
        container.appendChild(shoulderDom);
    }


    /**
    * Update central logo position and size
    */
    function updateLogoTransforms() {
        var docW = window.innerWidth;
        var docH = window.innerHeight
        var logoSizeRatio = 0.5;

        logoWidth = Math.min(maxWidth, docW * logoSizeRatio);
        var height = logoWidth / ratio;
        if (height > docH * logoSizeRatio) {
            height = docH * logoSizeRatio;
            logoWidth = height * ratio;
        }
        [logoDom, armIdleDom,shoulderDom].forEach(function (img) {
            img.width = logoWidth;
            img.height = height;
            img.style.left = (docW / 2 - logoWidth / 2) + "px";
            img.style.top = (docH / 2 - height / 2) + "px";
        });
    }

    /**
    * Init arm and fist
    */
    function initArm() {
        armDom = document.createElement("img");
        armDom.src = BigBlueApp.assetsUrl + '/images/arm-part.svg';
        armDom.classList.add("bigblue-logo");
        armDom.style.visibility = "hidden";
        armDom.style.zIndex = 9;
        container.appendChild(armDom);

        fistDom = document.createElement("img");
        fistDom.src = BigBlueApp.assetsUrl + '/images/fist.svg';
        fistDom.classList.add("bigblue-logo");
        fistDom.style.visibility = "hidden";
        fistDom.style.zIndex = 10;
        container.appendChild(fistDom);
    }

    function updateArmPosition(){
        var docW = window.innerWidth;
        var docH = window.innerHeight

        //Init elements sizee
        let armWidth = logoWidth * 0.3;;
        let armHeight = logoWidth * 0.13;
        let fistWidth = logoWidth * 0.08;
        let fistHeight = logoWidth * 0.08;
        const fistOffsetY = logoWidth*0.01;
        const fistOffsetX = -logoWidth*0.01;
        armDom.style.height =armHeight+"px";
        armDom.style.width = armWidth+"px";
        fistDom.style.height = fistHeight+"px";
        fistDom.style.width = fistWidth+"px";

        var shoulderLeft = docW / 2 + logoWidth * 0.19;
        var shoulderTop = docH / 2 - logoWidth * 0.08;
        debugDiv(shoulderLeft,shoulderTop);

        // DEBUG

        // END DEBUG

        //Position the arm and the fist at the center of the shoulder
        armDom.style.left = (shoulderLeft -armWidth/2)+ "px";
        armDom.style.top =(shoulderTop -armHeight/2)+ "px";
        fistDom.style.left = (shoulderLeft - fistWidth/2)+ "px";
        fistDom.style.top = (shoulderTop - fistHeight/2 )+ "px";

        if (menuHover) {
            /*
            let dx = menuHover.minLeft - shoulderLeft;
            let dy = menuHover.minTop - shoulderTop;
            */
            const targRect = menuHover.target.getBoundingClientRect();
            let dx = targRect.x - shoulderLeft;
            let dy = targRect.y - shoulderTop;

            let dist = 1* Math.sqrt(dx * dx + dy * dy);
            var angle = Math.atan2(dy, dx);

            let originX =  armWidth*0.06;

            //The scale depends of the space left for the fist and of the transform origin
            let scaleArm = (dist - fistWidth)/(armWidth -originX);
            armDom.style.transformOrigin = `${originX}px center`;
            armDom.style.transform = `translate(${armWidth/2- originX}px,0px) rotate(${angle}rad) scaleX(${scaleArm})`;

            fistDom.style.transformOrigin = `center center`;
            fistDom.style.transform  = `rotate(${angle}rad) translate(${fistOffsetX+dist-fistHeight/2}px,${fistOffsetY}px) rotate(90deg)`;
        }

    }


    /**
    * Creates menu elements from the hidden wordpress menu
    */
    function initMenu() {


        const svgs= [
            {
                name :"Welcome !" ,
                font : "Big John",
                bubble: "acceuil-welcome.png"
            },
            {
                name :"Big Blue Songs",
                bubble: "acceuil-big-blue-songs.png"
            },
            {
                name :"Big Blue Science",
                font : "Pica",
                bubble: "acceuil-welcome.png"
            },
            {
                name :"News" ,
                bubble: "acceuil-big-blue-science.png"
            },
            {
                name :"Big Blue Fingers",
                bubble:  "acceuil-big-blue-science.png"
            },
            {
                name :"L'équipe",
                bubble: "acceuil-big-blue-songs.png"
            },

        ];

        var mainMenu = document.getElementById("menu-main-menu");

        mainMenu.childNodes.forEach(function (li) {
            if (li.childNodes.length) {
                var a = li.childNodes[0];
                menuData.push({
                    text: a.attributes.title.value,
                    url: a.attributes.href.value,
                });
            }
        })

        menuData.forEach(function (data) {
            let dom = document.createElement("div");
            dom.onclick = function(){
                document.location.href=data.url;
            }
            dom.style.visibility = "hidden";
            dom.classList.add("bigblue-menu");

            let text = document.createElement("div");
            text.classList.add("bba-menu-text");
            text.innerHTML = data.text;
            dom.appendChild(text);

            svgs.some((svg)=>{

                if(svg.name === data.text){
                    /*
                    console.log("svg !!");
                    const img = document.createElement("img");
                    img.src =  BigBlueApp.assetsUrl + '/images/'+svg.svg;
                    dom.appendChild(img);
                    */

                    let bg = document.createElement("div");
                    bg.classList.add("bba-menu-bg")
                    const bgIm =  document.createElement("img");
                    bgIm.src = `${BigBlueApp.assetsUrl}/images/${svg.bubble}`;
                    bgIm.style.width = "100%";
                    bgIm.style.height = "100%";
                    bg.appendChild(bgIm);
                    if(svg.font){
                        dom.style.fontFamily = svg.font;
                    }
                    data.bubble =bg;
                    dom.appendChild(bg);
                    return true;
                }
                else{
                    console.log("svg name",svg.name);
                    console.log("text",data.text);
                }
                return false;
            });

            const target = document.createElement("img");
            target.src =  BigBlueApp.assetsUrl + '/images/target.svg';
            target.classList.add("bba-target");
            dom.appendChild(target);

            container.appendChild(dom);
            dom.data = data;
            dom.data.target = target;
            menuDoms.push(dom);
        });

    }

    /**
    * Update menu elements position, putting them around the logo
    */
    function updateMenuTransforms() {
        var docW = window.innerWidth;
        var docH = window.innerHeight
        var radius = logoWidth * 0.65;
        var angle = 2 * Math.PI / menuData.length;
        var i = 0;

        function update() {
            menuDoms.forEach(function(dom) {
                var left = Math.round(radius * 1.2 * Math.sin(i * angle) + docW / 2);
                var top = Math.round(-radius * 0.78 * Math.cos(i * angle) + docH / 2);

                let halfHeigth =  dom.offsetHeight/2;
                let halfWidth =  dom.offsetWidth/2;
                var minLeft = Math.round((radius * 1.1 -  halfWidth) * Math.sin(i * angle) + docW / 2);
                var minTop = Math.round((-radius * 0.74 + halfHeigth) * Math.cos(i * angle) + docH / 2);

                dom.data.left = left;
                dom.data.top = top;
                debugDiv(left,top);
                debugDiv(minLeft,minTop);

                dom.data.minLeft = minLeft;
                dom.data.minTop = minTop;
                dom.style.left = `${left - dom.offsetWidth / 2}px`;
                dom.style.top = `${top - dom.offsetHeight / 2}px`;
                dom.style.visibility = "visible";
                i++;
            });
        }
        if (document.fonts.check('25px Poor Story')) {
            update();
        } else {
            document.fonts.ready.then(function () {
                update();
            });
        }
    }


    function initMenuHover() {


        menuDoms.forEach(function(dom) {
            dom.addEventListener("mouseover", function() {

                setTimeout(()=>{
                    dom.data.bubble.style.transform = "scale(1)";
                    dom.data.target.style.transform = "scale(0.01)";
                },100)

                menuDoms.forEach(function(dom2) {
                    if(dom2!==dom){
                        if(dom2.data.bubble){
                            dom2.data.bubble.style.transform = "scale(0.01)";
                            dom2.data.target.style.transform = "scale(1)";
                        }
                    }
                });

                //Hide the idle arm and show the animated one and its fist
                if (!armShown) {
                    menuHover = dom.data;
                    armIdleDom.style.visibility = "hidden";
                    shoulderDom.style.visibility = "visible";
                    if(dom.data.bubble){
                    }
                    updateArmPosition();
                    armDom.style.visibility = "visible";
                    fistDom.style.visibility = "visible";
                }

            });

        });
        /*
        dom.addEventListener("mouseleave", function() {
        if(dom.data.bubble){
        dom.data.bubble.style.transform = "scale(0.01)";
    }
});
});*/


}

function debugDiv(left,top){
    return;
    var debugDiv = document.createElement("div");
    debugDiv.style.width = "5px";
    debugDiv.style.height = "5px";
    debugDiv.style.zIndex = 200;
    debugDiv.style.display = "block";
    debugDiv.style.position = "absolute";
    debugDiv.style.left = left+"px";
    debugDiv.style.top = top+"px";
    debugDiv.style.backgroundColor = "red";
    container.appendChild(debugDiv);
}

initLogo();
initArm();
initMenu();
initMenuHover();
updateLogoTransforms();
updateArmPosition()

setTimeout(()=>{
    updateLogoTransforms();
},50);

setTimeout(()=>{
    updateLogoTransforms();
    updateMenuTransforms();
    updateArmPosition();
},500);


window.onresize = function () {
    updateLogoTransforms();
    updateMenuTransforms();
    updateArmPosition();
}

}

bigblueload();
