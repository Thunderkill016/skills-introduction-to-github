import {PARTS} from './data.js';
import {CRTExperience} from './scene.js';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ui={parts:$('#parts'),name:$('#partName'),summary:$('#partSummary'),fn:$('#partFunction'),mat:$('#partMaterial'),evidence:$('#partEvidence'),explode:$('#explode'),pct:$('#explodePct'),xray:$('#xrayBtn'),beam:$('#beamBtn'),rotate:$('#rotateBtn'),reset:$('#resetBtn'),focus:$('#focusBtn'),badge:$('#renderBadge'),loading:$('#loading'),sources:$('#sourcesDialog')};
let selected='shell';
const exp=new CRTExperience($('#canvasHost'));
exp.onReady=()=>{ui.loading.classList.add('hidden');ui.badge.textContent='Three.js r185 · PBR · CRT reconstruction'};
exp.onSelect=id=>select(id,false);
function select(id,focus=true){selected=id;const p=PARTS[id];if(!p)return;ui.name.textContent=p.name;ui.summary.textContent=p.summary;ui.fn.textContent=p.fn;ui.mat.textContent=p.mat;ui.evidence.textContent=p.evidence;$$('.parts button').forEach(b=>b.classList.toggle('active',b.dataset.id===id));if(focus){exp.selectPart(id);exp.focusPart(id)}}
Object.entries(PARTS).forEach(([id,p])=>{const b=document.createElement('button');b.dataset.id=id;b.textContent=p.name;b.onclick=()=>select(id,true);ui.parts.appendChild(b)});
ui.explode.oninput=e=>{const v=+e.target.value/100;ui.pct.textContent=`${e.target.value}%`;exp.setExplode(v)};
ui.xray.onclick=()=>{const on=exp.toggleXray();ui.xray.classList.toggle('active',on);ui.xray.textContent=on?'X‑Ray on':'X‑Ray'};
ui.beam.onclick=()=>{const on=exp.toggleBeam();ui.beam.classList.toggle('active',on);ui.beam.textContent=on?'Beam on':'Electron beam'};
ui.rotate.onclick=()=>{exp.autoRotate=!exp.autoRotate;ui.rotate.classList.toggle('active',exp.autoRotate);ui.rotate.textContent=exp.autoRotate?'Auto rotate on':'Auto rotate'};
ui.reset.onclick=()=>exp.reset();ui.focus.onclick=()=>exp.focusPart(selected);
$('#sourceBtn').onclick=()=>ui.sources.showModal();$('#closeSources').onclick=()=>ui.sources.close();
select('shell',false);
