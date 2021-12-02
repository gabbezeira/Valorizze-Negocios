const cookieBox = document.querySelector(".wrapper"),
    acceptBtn = cookieBox.querySelector(".buttonY");
    acceptBtn.onclick = ()=>{
      document.cookie = "CookieBy=Valorizze; max-age="+60*60*24*30;
      if(document.cookie){
        cookieBox.classList.add("hide");
      }else{ 
        alert("O cookie não pode ser definido! Desbloqueie este site da configuração de cookies do seu navegador.");
      }
    }
    let checkCookie = document.cookie.indexOf("CookieBy=Valorizze"); 
    checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");

const hiddenCookie = document.querySelector(".wrapper"),
hiddenBtn = hiddenCookie.querySelector(".buttonN");
hiddenBtn.onclick = ()=>{
    hiddenCookie.classList.add("hide");
}