(()=>{"use strict";const e=document.querySelector(".name_title"),r=document.querySelector(".count_repo"),o=document.querySelector(".input_user"),t=document.forms[0],n=document.querySelector(".container"),l=document.querySelector(".user_img"),c=document.querySelector(".profile_img"),u=document.querySelector(".user_name"),s=document.querySelector(".username"),i=document.querySelector(".bio"),a=document.querySelector(".followers"),m=document.querySelector(".following"),d=document.querySelector(".not_found"),p=document.querySelector(".btn"),y=document.querySelector(".error"),h=document.querySelector(".repos");t.addEventListener("submit",(t=>{t.preventDefault();const p=o.value;p?(r.style.display="grid",c.style.display="block",fetch(`https://api.github.com/users/${p}`).then((e=>{if(!e.ok)throw new Error("GitHub API topa olmadi");return e.json()})).then((o=>{console.log("user = ",o),l.src=`${o.avatar_url}`,c.src=`${o.avatar_url}`,u.innerText=o.name,e.innerText=o.name,s.innerText=`@${o.login}`,i.innerText=o.bio,r.innerText=o.public_repos,a.innerText=`👥 ${o.followers} followers`,m.innerText=` ✅${o.following} following`,h.innerHTML=""})).catch((()=>{d.style.display="flex",n.style.display="none",y.innerText=`not found this ${o.value} user`})),fetch(`https://api.github.com/users/${p}/repos?per_page=100`).then((e=>{if(!e.ok)throw new Error("GitHub API error");return e.json()})).then((e=>{console.log("repos = ",e);for(let r=0;r<e.length;r++){console.log(e[r].name);const o=document.createElement("a");o.href=e[r].html_url,o.className="repoChild",o.innerText=e[r].name,h.appendChild(o)}})).catch((e=>{console.error("Error fetching user repositories:",e.message)}))):console.error("User input is empty")})),p.addEventListener("click",(()=>{d.style.display="none",n.style.display="block"}))})();