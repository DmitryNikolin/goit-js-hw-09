const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]"),o=document.body;let d=null;function l(){o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}console.log(e),console.log(t),t.disabled=!0,e.addEventListener("click",(()=>{d=setInterval(l,1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(d),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.35b1aa39.js.map