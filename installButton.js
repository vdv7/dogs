window.addEventListener('load',()=>{
    const android = /android/i.test(navigator.userAgent);
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if((android || ios) 
            && !window.matchMedia('(display-mode: standalone)').matches
            && !navigator.standalone
            && !document.referrer.startsWith('android-app://')){
        var installBtn = document.body.appendChild(document.createElement('div'));
        installBtn.style.position='fixed';
        installBtn.style.bottom='0px';
        installBtn.style.width='100%';
        installBtn.style.textAlign='center';
        installBtn.style.backgroundColor='#ccc';
        installBtn.style.color='#333';
        installBtn.innerHTML='⬇ install this app ⬇';
        if(android){
            window.addEventListener('beforeinstallprompt', e=>{
                e.preventDefault();
                window.installPrompt=e;
                installBtn.onclick=()=>{
                    window.installPrompt.prompt();
                }
            });
        }else{
            let showInstructions;
            showInstructions=function(){
                installBtn.innerHTML=`Click <img style="height:1em !important" src="https://icon-library.com/images/share-icon-iphone/share-icon-iphone-20.jpg">, then click <br>Add to Home Screen.`;
                installBtn.onclick=()=>{
                    installBtn.innerHTML='⬇ install this app ⬇';
                    installBtn.onclick=showInstructions;
                }
            }
            installBtn.onclick=showInstructions;
        }
    }
});
