var BigBlueSEO = {
    updatePageInfos(postId,postTitle, addPost = true){
        if(addPost){
            BigBlueApp.currentUrl = encodeURIComponent(document.URL)+"?show="+postId;
        }
        else{
            BigBlueApp.currentUrl = encodeURIComponent(document.URL);
        }
        BigBlueApp.postName = "Big Blue Arms - "+postTitle;
        history.pushState({foo:'show'+Date.now()}, 'paggloe 2', '?show='+postId);
    },
    showShareButtons(url, id){
        if(url.includes("/embed/")){
            url = url.replace("/embed/","/watch?v=");
        }
        const element = document.getElementById(id);
        if(!element){
            return;
        }
        element.innerHTML='<a href="https://www.facebook.com/sharer/sharer.php?u='+url+'"target="_blank"title="Facebook"style="display:inline-block;line-height:2em;vertical-align:middle;text-align:center;width:2em;height:2em;color:#fff;border-radius:50%;background:#3b5998;"><span style="font-size:.9em;"><i class="fab fa-facebook-f"></i></span></a> <a href="https://twitter.com/share?url='+url+'&text='+BigBlueApp.postName+'"target="_blank"title="Twitter"style="display:inline-block;line-height:2em;vertical-align:middle;text-align:center;width:2em;height:2em;color:#fff;border-radius:50%;background:#1b95e0;"><span style="font-size:.9em;"><i class="fab fa-twitter"></i></span></a> <a href="https://plus.google.com/share?url='+url+'"target="_blank"title="Google+"style="display:inline-block;line-height:2em;vertical-align:middle;text-align:center;width:2em;height:2em;color:#fff;border-radius:50%;background:#dd4b39;"><i class="fab fa-google-plus-g"></i></a> <a href="mailto:?body='+url+'%0A%0A'+encodeURIComponent(document.querySelector('meta[name=description]')?document.querySelector('meta[name=description]').content:'')+'&subject='+BigBlueApp.postName+'"title="Mail"style="display:inline-block;line-height:2em;vertical-align:middle;text-align:center;width:2em;height:2em;color:#fff;border-radius:50%;background:#555;"><span style="font-size:.9em;"><i class="fas fa-envelope"></i></span></a> <a href="https://www.buttons.social/share/#'+url+','+BigBlueApp.postName+','+encodeURIComponent(document.querySelector('meta[name=description]')?document.querySelector('meta[name=description]').content:'')+'"target="_blank"title="More Services"style="display:inline-block;vertical-align:middle;width:2em;height:2em;border-radius:50%;background:#ab2515;"><svg style="display:block;fill:#fff;height:28%;margin:46% auto 0;" viewBox="0 0 10 4"><circle cx="2" cy="2" r="1" /><circle cx="5" cy="2" r="1" /><circle cx="8" cy="2" r="1" /></svg></a>';
    }
}
