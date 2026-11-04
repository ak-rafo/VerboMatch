/* Verbo Match loader: builds the page from the shared files + the language pack.
   Shared:  app.css · app-body.html · app.js   (edit these once, both languages update)
   Language: lang-pt.txt / lang-es.txt          (words, stories, slang, UI text)      */
(function(){
  const L=document.documentElement.dataset.lang||"pt";
  const files=["app-body.html","app.js","lang-"+L+".txt"];
  const get=(fresh)=>Promise.all(files.map(u=>fetch(u+(fresh?"?fresh="+Date.now():""),{cache:fresh?"reload":"default"})
    .then(r=>{ if(!r.ok) throw new Error(u+" "+r.status); return r.text(); })));
  const build=t=>((t.match(/BUILD (v[\w.]+)/)||[])[1]);
  function parse(txt){
    const lines=txt.split("\n"), H={}; let i=1;
    while(i<lines.length){ const m=lines[i].match(/^@@@([BH]\d+) (\d+)@@@$/); if(!m){i++;continue;}
      const n=+m[2]; H[m[1]]=lines.slice(i+1,i+1+n); i+=1+n; }
    return H;
  }
  function fill(tpl,H,re){
    const out=[]; tpl.split("\n").slice(1).forEach(line=>{ const m=line.match(re);
      if(m){ const h=H[m[1]]; if(!h) throw new Error("Missing piece "+m[1]); out.push(...h); } else out.push(line); });
    return out.join("\n");
  }
  function run([body,js,lang]){
    const b=[build(body),build(js),build(lang)];
    if(b[0]!==b[1]||b[1]!==b[2]) throw Object.assign(new Error("Mixed versions "+b.join("/")),{mixed:true});
    const H=parse(lang);
    document.getElementById("boot")?.remove();
    document.body.insertAdjacentHTML("afterbegin",fill(body,H,/^<!--@@(B\d+)@@-->$/));
    const s=document.createElement("script"); s.textContent=fill(js,H,/^\/\*@@(H\d+)@@\*\/$/)+"\n//# sourceURL=verbo-match-app.js";
    document.body.appendChild(s);
  }
  function fail(e){
    const el=document.getElementById("boot");
    if(el) el.innerHTML=`<p>⚠️ Couldn't load the app.</p><p style="font-size:13px;opacity:.8">${navigator.onLine?"Please reload.":"You're offline. Open the app once with internet to save it."}<br><small>${e.message}</small></p><button onclick="location.reload()">Reload</button>`;
  }
  get(false).then(run).catch(e=> e.mixed&&navigator.onLine ? get(true).then(run).catch(fail) : fail(e));
})();
