'use strict';
const canvas=document.getElementById('scene'),ctx=canvas.getContext('2d');
ctx.imageSmoothingEnabled=false;
let scene='beach',tick=0,seed=31;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
function rect(x,y,w,h,c,g=ctx){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function poly(points,c,g=ctx){g.fillStyle=c;g.beginPath();points.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill()}
function line(x,y,x2,y2,c,w=1,g=ctx){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x,y);g.lineTo(x2,y2);g.stroke()}
function ellipse(x,y,rx,ry,c,g=ctx){for(let a=-ry;a<=ry;a++){const width=Math.floor(rx*Math.sqrt(1-a*a/(ry*ry)));rect(x-width,y+a,width*2+1,1,c,g)}}
function cloud(x,y,s=1){const blocks=[[0,9,62,6],[9,3,40,8],[21,0,22,7],[48,8,30,7],[7,15,56,3]];blocks.forEach(b=>rect(x+b[0]*s,y+b[1]*s,b[2]*s,b[3]*s,'#efc6ab'));rect(x+9*s,y+14*s,60*s,4*s,'#d9a4a0');rect(x+22*s,y+3*s,20*s,2*s,'#f6d9b5')}
function heart(x,y,s,c='#e5a18a',g=ctx){[[1,0,2,1],[4,0,2,1],[0,1,7,2],[1,3,5,1],[2,4,3,1],[3,5,1,1]].forEach(b=>rect(x+b[0]*s,y+b[1]*s,b[2]*s,b[3]*s,c,g))}
function bush(x,y,size,colors){for(let i=0;i<size;i++){const a=rand()*Math.PI,b=rand()*size/2;rect(x+Math.cos(a)*b,y-Math.sin(a)*b,3+rand()*7,3+rand()*6,colors[Math.floor(rand()*colors.length)])}}
function palm(x,y,h,flip=1){for(let j=0;j<h;j+=5){const curve=Math.round(Math.sin(j/h*1.9)*15)*flip;rect(x+curve,y-j,7,6,'#5b6550');rect(x+curve,y-j,2,5,'#9a8963');if(j%15===0)rect(x+curve,y-j,6,1,'#3f5144')}const top=x+Math.round(Math.sin(1.9)*15)*flip;for(let a=0;a<7;a++){const dx=(a-3)*17,dy=Math.abs(a-3)*9;for(let k=0;k<10;k++){const t=k/10;const xx=top+dx*t,yy=y-h-14*Math.sin(t*Math.PI)+dy*t;rect(xx,yy,10,3,a%2?'#3b6050':'#2f5449');rect(xx+2,yy+3,5,5,'#3b6050')}}rect(top+1,y-h+2,5,5,'#655b3b');rect(top+6,y-h+4,4,4,'#85714a')}
function temple(x,y){rect(x-15,y+80,85,8,'#70725b');rect(x-24,y+88,106,5,'#969071');rect(x-6,y+64,70,18,'#ad9b71');rect(x+5,y+63,10,19,'#645e48');rect(x+40,y+63,10,19,'#645e48');for(let level=0;level<7;level++){const w=69-level*7,xx=x+level*3.5,yy=y+66-level*9;rect(xx,yy,w,7,'#cab381');rect(xx-3,yy+6,w+6,3,'#947c56');rect(xx,yy,w,2,'#e3c797');for(let d=4;d<w-2;d+=9){rect(xx+d,yy+3,3,3,'#887550');rect(xx+d-1,yy+2,5,1,'#f0d5a3')}}rect(x+23,y-1,21,5,'#d4b77f');rect(x+27,y-5,13,4,'#dbc08b');[26,33,40].forEach(xx=>{rect(x+xx,y-9,2,6,'#a27f50');rect(x+xx-1,y-10,4,2,'#e8c68e')});rect(x+23,y+66,18,18,'#6c6650');rect(x+27,y+69,10,15,'#3b4e43');rect(x-19,y+78,13,6,'#ba9d6b');rect(x+64,y+78,14,6,'#ba9d6b')}
function beach(){seed=31;
  const sky=['#8d929e','#a49aa5','#b7a1a6','#c9a5a6','#dcaeaa','#e8b7a8','#f1c2a6','#f3cba9'];sky.forEach((c,i)=>rect(0,i*20,640,21,c));
  cloud(64,37,1.05);cloud(314,25,.7);cloud(445,55,1.3);cloud(203,65,.55);cloud(-18,97,.65);cloud(346,98,.5);
  ellipse(251,113,29,29,'#ffe0a4');rect(220,137,65,3,'#eabb9b');rect(230,143,40,3,'#f8d3a2');
  rect(0,151,640,79,'#789f9a');rect(0,151,640,3,'#c9c4a4');rect(0,157,640,8,'#93b0a0');rect(0,166,640,12,'#87a99b');rect(0,182,640,19,'#76a398');rect(0,205,640,30,'#649a90');
  for(let i=0;i<190;i++){const x=rand()*640,y=153+rand()*75;rect(x,y,2+rand()*17,1,['#a6bdac','#9ab6a6','#c0c6a8','#6a958e'][i%4])}
  for(let j=0;j<15;j++)rect(242-j*2+(j%3)*5,153+j*4,18+j*3,1,j%2?'#d6c9a3':'#e9d3a6');
  poly([[404,155],[436,147],[468,141],[519,139],[555,148],[608,145],[640,152],[640,224],[467,198]],'#687b61');
  poly([[436,162],[482,157],[525,156],[561,165],[608,158],[640,164],[640,199],[473,188]],'#829071');
  for(let i=0;i<70;i++)rect(440+rand()*200,158+rand()*22,3+rand()*9,2+rand()*5,['#65785d','#8c9572','#718663'][i%3]);
  temple(492,67);palm(592,159,54,-1);palm(451,157,38,1);
  rect(429,158,57,3,'#a29675');rect(421,161,69,2,'#b0a586');
  poly([[0,244],[74,240],[126,244],[196,236],[250,240],[327,226],[399,214],[447,209],[490,209],[524,213],[640,211],[640,304],[0,304]],'#d9c4a2');
  poly([[0,240],[92,236],[154,239],[229,230],[294,230],[357,218],[423,207],[474,204],[530,209],[640,207],[640,212],[533,214],[471,209],[423,212],[359,222],[293,236],[230,235],[156,244],[89,241],[0,246]],'#e3dbb8');
  for(let i=0;i<150;i++){rect(rand()*640,241+rand()*64,1+rand()*3,1,['#bdaa87','#e8d2ab','#c8b68f'][i%3])}
  poly([[0,268],[79,260],[158,268],[228,256],[327,263],[417,251],[513,254],[640,241],[640,304],[0,304]],'#b5ae84');
  poly([[0,283],[91,276],[213,286],[290,277],[406,283],[530,267],[640,276],[640,304],[0,304]],'#8e9b73');
  ellipse(320,265,70,8,'#989574');
  // The wooden bench and the two tiny people sharing it.
  rect(265,217,108,4,'#544e3f');rect(267,226,104,4,'#5e5540');rect(269,220,100,5,'#a18758');rect(269,229,100,5,'#a18758');rect(275,214,4,42,'#5f5b48');rect(360,214,4,42,'#5f5b48');
  rect(294,239,12,20,'#4f6159');rect(312,241,9,18,'#45564e');rect(292,257,15,4,'#33483f');rect(310,258,14,4,'#33483f');
  rect(333,239,9,19,'#bb8b73');rect(348,238,8,20,'#c4997c');rect(332,256,12,5,'#775c4a');rect(347,256,13,5,'#775c4a');
  rect(291,214,31,28,'#c7ba93');rect(293,215,6,21,'#e0cfaa');rect(315,215,7,17,'#a29876');rect(299,235,18,5,'#aea382');
  rect(296,196,23,20,'#b78464');rect(294,193,24,8,'#393d32');rect(294,200,5,11,'#3c3c30');rect(299,191,15,3,'#393d32');rect(298,200,18,10,'#d1a17d');rect(312,203,2,2,'#303d32');rect(317,204,3,5,'#c89771');rect(310,210,5,1,'#97664e');rect(304,213,8,5,'#b78464');
  rect(328,207,30,35,'#b87e73');rect(332,215,5,23,'#d79a86');rect(351,215,7,23,'#9b6c62');rect(326,237,34,6,'#a87369');
  rect(330,193,23,24,'#443e33');rect(328,200,7,29,'#423e32');rect(349,200,7,32,'#423e32');rect(333,197,18,16,'#d2a281');rect(332,193,21,6,'#433d32');rect(333,201,2,2,'#384036');rect(332,204,3,4,'#c08f70');rect(334,210,5,1,'#9f6756');rect(341,212,7,5,'#b98a6e');rect(351,214,3,13,'#68503d');
  // His arm rests around her shoulders.
  rect(316,216,16,6,'#c7ba93');rect(327,215,7,6,'#c89a77');rect(330,214,6,4,'#d3a483');rect(291,239,69,4,'#786a4e');rect(267,244,104,5,'#ab8956');rect(263,242,112,3,'#c09b65');rect(268,249,4,13,'#535541');rect(368,249,4,13,'#535541');
  palm(43,277,204,1);palm(4,258,139,1);
  bush(4,288,84,['#345b4b','#3e6951','#547555']);bush(628,282,76,['#345b4b','#3d6350','#557557']);bush(591,300,53,['#3e6550','#517557','#6f885f']);
  for(let i=0;i<80;i++){let x=rand()*640,y=280+rand()*24;if(x<180||x>420){rect(x,y,2,4,'#73885e');if(i%7===0)rect(x,y-1,2,2,'#d5b98a')}}
  // Shells, footprints and a small shorebird.
  rect(418,246,5,2,'#ead7b1');rect(419,244,3,2,'#ead7b1');rect(228,265,3,1,'#cfbd99');rect(230,270,3,1,'#cfbd99');rect(235,275,3,1,'#cfbd99');rect(407,209,7,3,'#f5e4bf');rect(411,206,3,4,'#f5e4bf');rect(414,207,3,1,'#b18a59');rect(409,212,1,4,'#776e54');
  // A quiet fishing boat on the horizon.
  poly([[126,162],[148,162],[144,166],[130,166]],'#5c7970');rect(138,148,1,14,'#657a6c');poly([[140,149],[140,159],[148,159]],'#d9c1a0');
}
function frame(x,y,w,h){rect(x-3,y-3,w+6,h+6,'#694e42');rect(x-1,y-1,w+2,h+2,'#c69768');rect(x,y,w,h,'#eee0bd')}
function plant(x,y,h){rect(x-6,y,14,14,'#ad7960');rect(x-4,y+11,10,5,'#8c5f50');rect(x-8,y,18,3,'#c79974');line(x+1,y,x+1,y-h,'#627351',2);for(let i=0;i<4;i++){let yy=y-i*h/4-5;poly([[x,yy],[x-13,yy-9],[x-11,yy-15],[x-3,yy-10]],'#667c54');poly([[x+1,yy-6],[x+14,yy-16],[x+15,yy-8],[x+4,yy-2]],'#859262')}}
function room(){seed=20;
  rect(0,0,640,304,'#8d7e69');rect(0,0,640,10,'#655f50');rect(0,9,640,3,'#bca17e');rect(0,182,640,5,'#5c5b49');rect(0,187,640,117,'#9b805e');
  for(let j=0;j<7;j++){rect(0,188+j*18,640,1,'#7f6b51');for(let x=(j%2)*60;x<640;x+=121)rect(x,188+j*18,1,18,'#806d51')}
  rect(0,181,640,4,'#b19b75');
  // Starry blue window framed by warm curtains.
  rect(57,34,115,120,'#514e48');rect(63,40,103,107,'#495d67');rect(65,42,99,103,'#4c6372');rect(65,92,99,53,'#506a75');
  ellipse(135,63,10,10,'#e9d7a7');ellipse(139,59,9,9,'#4c6372');
  for(let i=0;i<23;i++)rect(68+rand()*93,45+rand()*89,1,1,'#c0c7b0');
  poly([[65,132],[82,111],[94,125],[112,108],[128,125],[144,116],[165,130],[165,146],[65,146]],'#384e56');rect(111,40,4,109,'#aa9676');rect(63,94,103,4,'#aa9676');rect(59,146,112,6,'#c2a481');
  rect(47,29,134,4,'#5c5548');rect(49,34,19,122,'#bc967b');rect(52,37,5,117,'#d1ad88');rect(63,34,7,57,'#a9836e');rect(158,34,19,122,'#bc967b');rect(165,37,5,117,'#d1ad88');rect(155,34,7,57,'#a9836e');rect(50,105,16,4,'#e1c295');rect(161,105,16,4,'#e1c295');
  // Books, keepsakes, and warm string lights.
  rect(221,48,127,5,'#4b5748');rect(223,53,123,3,'#6b644e');const colors=['#ae785e','#77836a','#c5aa7c','#7d9290','#a5846a'];for(let i=0;i<9;i++){rect(227+i*7,28-(i%3)*3,5,20+(i%3)*3,colors[i%5]);rect(228+i*7,32,3,1,'#dbca9c')}
  frame(300,28,22,17);heart(306,33,1,'#b9856b');plant(337,47,19);
  frame(385,37,39,43);rect(389,41,31,35,'#84917a');ellipse(405,53,7,7,'#dac294');poly([[389,75],[400,57],[408,69],[413,61],[420,75]],'#536e5b');
  line(0,19,130,25,'#4f5849');line(130,25,265,15,'#4f5849');line(265,15,400,24,'#4f5849');line(400,24,526,14,'#4f5849');line(526,14,640,21,'#4f5849');
  for(let i=0;i<19;i++){const x=12+i*35,y=18+Math.sin(i*.8)*5;rect(x,y,1,8,'#565b49');rect(x-2,y+6,5,5,'#e7c28b');rect(x-1,y+7,3,3,'#ffe0a1')}
  // Floor lamp, a pool of honey light, and books beside the sofa.
  poly([[185,114],[214,114],[247,237],[146,237]],'#b29a6c');rect(198,104,3,118,'#5f6350');rect(185,220,28,4,'#555c4b');poly([[184,79],[213,79],[222,109],[175,109]],'#dfc498');rect(180,108,37,4,'#edd4a1');rect(185,80,4,24,'#e9d5ad');
  // Rug.
  poly([[183,237],[461,237],[510,299],[132,299]],'#697965');poly([[193,244],[453,244],[489,292],[154,292]],'#9ba181');poly([[202,251],[445,251],[471,285],[173,285]],'#7d8d73');
  for(let i=0;i<18;i++){rect(150+i*20,296,2,6,'#c4bb91');rect(194+i*15,239,2,4,'#b0b08b')}
  // Deep sage couch.
  ellipse(320,231,112,12,'#6a6c54');rect(225,161,181,64,'#3e6454');rect(230,155,170,15,'#587c63');rect(236,159,76,41,'#64886c');rect(317,159,77,41,'#64886c');rect(238,162,72,3,'#7e9977');rect(319,162,72,3,'#7e9977');rect(239,198,154,23,'#7b9673');rect(239,201,77,2,'#9aaa82');rect(320,201,70,2,'#9aaa82');rect(317,200,2,21,'#597b5f');rect(215,183,26,39,'#5b7d62');rect(213,179,29,10,'#8ca17b');rect(391,183,26,39,'#5b7d62');rect(390,179,29,10,'#8ca17b');rect(222,222,188,8,'#415e4c');rect(228,229,7,10,'#504f3f');rect(398,229,7,10,'#504f3f');
  // Pillow and a knitted blanket over their legs.
  poly([[243,164],[263,169],[259,192],[240,188]],'#cfaa81');line(246,169,257,184,'#dfc199');
  rect(281,170,27,34,'#c5b48e');rect(281,172,5,26,'#d7c49d');rect(284,146,23,23,'#b6896a');rect(282,143,24,8,'#3d4034');rect(281,149,5,15,'#3d4034');rect(288,141,14,4,'#3d4034');rect(287,151,18,14,'#cca181');rect(301,155,2,2,'#3f4738');rect(302,163,3,1,'#9c7258');rect(292,165,9,7,'#b6896a');
  rect(314,172,30,31,'#ba8174');rect(315,150,24,23,'#493f34');rect(312,156,8,39,'#493f34');rect(334,158,8,36,'#493f34');rect(319,154,16,16,'#d1a380');rect(318,151,20,6,'#493f34');rect(321,159,2,2,'#444537');rect(321,166,5,1,'#a7765c');rect(323,169,8,6,'#c09274');rect(317,176,4,19,'#d99b86');
  // His other hand holds hers.
  rect(301,189,22,6,'#c5b48e');rect(319,189,8,5,'#d2a17c');
  poly([[268,200],[344,197],[358,223],[279,223]],'#c6ab7d');rect(277,204,67,2,'#ddc298');rect(280,214,70,2,'#ad946e');for(let i=0;i<12;i++)rect(281+i*6,202,1,20,'#b99b73');
  // Side table and the two milkshakes.
  rect(429,208,58,6,'#c7a37a');rect(435,214,5,28,'#705f49');rect(477,214,5,28,'#705f49');rect(429,206,58,3,'#dec09a');
  rect(439,188,11,18,'#d6b3a1');rect(441,190,7,12,'#efbdad');rect(439,187,11,3,'#eee0c0');rect(441,184,7,4,'#f8e5c6');rect(445,176,2,11,'#b67869');rect(445,176,6,2,'#b67869');rect(440,192,2,9,'#f7dac2');
  rect(465,187,11,19,'#b99f7e');rect(467,191,7,12,'#ae8c6c');rect(465,186,11,4,'#e8d4af');rect(467,183,7,4,'#f8e5c6');rect(472,175,2,11,'#91a290');rect(472,175,6,2,'#91a290');rect(466,191,2,10,'#ead6b3');
  // TV at the right, showing an original pixel interpretation of the four elements.
  rect(507,107,114,73,'#3c4941');rect(511,111,106,63,'#293c3c');rect(515,115,98,55,'#819b89');rect(515,147,98,23,'#72886e');ellipse(562,133,13,13,'#d2cc9d');poly([[515,162],[537,133],[551,153],[571,139],[599,164],[613,157],[613,170],[515,170]],'#55785f');
  // Aang's silhouette, orange robes and blue arrow.
  rect(558,140,10,18,'#d5a16d');rect(561,141,7,17,'#b67450');ellipse(562,135,5,5,'#e1c397');rect(561,130,2,7,'#85abad');rect(559,134,6,2,'#85abad');rect(555,155,16,3,'#cead7e');line(572,135,572,162,'#625947',1);rect(529,123,5,3,'#c5d0b4');rect(600,131,7,2,'#bdcdb4');
  rect(559,181,11,12,'#424c41');rect(546,192,37,3,'#424c41');rect(501,196,126,8,'#b8946a');rect(504,204,120,31,'#6e7056');rect(511,209,48,19,'#4e5b49');rect(566,209,48,19,'#4e5b49');rect(503,235,5,8,'#4c5544');rect(617,235,5,8,'#4c5544');
  plant(533,195,15);rect(583,185,14,10,'#c1aa7f');rect(585,183,10,3,'#d6c398');rect(585,186,10,1,'#7a7057');
  // A little golden retriever puppy, curled on a cushion.
  ellipse(401,268,29,9,'#b99875');ellipse(400,265,26,9,'#d4b18a');rect(386,251,28,14,'#c4995c');rect(383,256,7,9,'#d8b16d');rect(388,263,9,4,'#e2bd7c');rect(405,263,9,4,'#e2bd7c');rect(408,245,17,17,'#d8ae68');rect(407,246,5,15,'#b78950');rect(422,248,5,12,'#b78950');rect(415,257,12,6,'#ebc98a');rect(424,257,4,3,'#514f3d');rect(416,251,2,2,'#524a36');rect(413,262,4,3,'#a1744c');
  plant(32,214,51);rect(27,227,23,4,'#6c624b');
  // Tiny slippers, a book, and a room full of soft light.
  rect(258,235,12,5,'#b88a69');rect(274,237,12,5,'#b88a69');rect(158,261,18,9,'#b27e62');rect(160,260,18,2,'#e2c89d');rect(163,264,9,1,'#d1a27a');
  rect(0,0,640,304,'#edba7110');
}
const base=document.createElement('canvas');base.width=640;base.height=304;const baseCtx=base.getContext('2d');
function cache(){scene==='beach'?beach():room();baseCtx.clearRect(0,0,640,304);baseCtx.drawImage(canvas,0,0)}
function render(time){tick=time/1000;ctx.drawImage(base,0,0);if(!reduced){if(scene==='beach'){for(let i=0;i<13;i++){const x=(i*53+Math.sin(tick*.45+i)*9)%420,y=172+(i%4)*11;rect(x,y,12+(i%3)*5,1,'#d9d0ad77')}const drift=Math.sin(tick*.7)*2;heart(324,175+drift,1,'#dca28a');if(Math.sin(tick*.4)>.1){line(356,75,360,73,'#837e7b');line(360,73,364,74,'#837e7b');line(371,82,375,80,'#837e7b');line(375,80,379,81,'#837e7b')}}else{const caress=Math.round(Math.sin(tick*1.5)*2);rect(305,173,6,12,'#c6b68f');rect(306,165,6,10,'#c6b68f');rect(309,155+caress,13,6,'#c69a78');rect(315,153+caress,7,4,'#d4a985');rect(319,152+caress,4,2,'#d4a985');rect(379,251+Math.round(Math.sin(tick*5)*2),10,5,'#d4aa66');rect(377,248+Math.round(Math.sin(tick*5)*3),5,7,'#e2bd79');rect(513,113,102,59,'#d8e5b8'+(Math.sin(tick*2)>0?'08':'03'));heart(341,139+Math.sin(tick)*2,1,'#e3b190')}}requestAnimationFrame(render)}
const invitation=document.getElementById('invitation');
function closeInvite(){invitation.hidden=true;document.getElementById('next').focus()}
function showInvite(){invitation.hidden=false;document.getElementById('continue').focus()}
function goTo(which){scene=which;invitation.hidden=true;cache();const isRoom=scene==='room';document.getElementById('scene-time').textContent=isRoom?'JUST US. AND ONE MORE EPISODE.':'A KERALA KIND OF EVENING';document.getElementById('location').textContent=isRoom?'Our happy place · Tuesday night':'Thiruvananthapuram, Kerala';document.getElementById('greeting').textContent=isRoom?'Right where I belong.':'Hey, Ammu!';document.getElementById('letter-tag').textContent=isRoom?'you + me + one sleepy puppy ♡':'a little note for you ♡';document.getElementById('letter-text').innerHTML=isRoom?'<p>You, me, two milkshakes, and ATLA. Your head on my shoulder, my fingers in your hair, and a sleepy golden puppy keeping us company.</p><p>Tuesday is ours, Ammu. No rushing, no distractions — just our favourite show and my favourite person. There’s nowhere else I’d rather be. I love you. ♡</p>':'<p>I’m sorry I haven’t been around as much while I’ve been travelling. I’ve missed you so much, and I love you.</p><p>We planned to watch ATLA tonight, but I ended up going to the hackathon. I’m so sorryyy. Let’s watch it together on Tuesday — just you and me. I love you so, so much. ♡</p>';document.getElementById('letter-footnote').textContent=isRoom?'Home has always been a person. You.':'Any place is my favourite place, if you’re there.';document.getElementById('next').innerHTML=isRoom?'Back to our sunset <span>↶</span>':'A cozy night with you <span>→</span>';document.getElementById('chapter-count').textContent=isRoom?'CHAPTER 02 / 02':'CHAPTER 01 / 02';canvas.setAttribute('aria-label',isRoom?'Original pixel art of Hope gently caressing Ammu’s hair on a cozy green couch while they watch ATLA. Two milkshakes sit on a table, and a golden retriever puppy rests on a cushion.':'Original pixel art of Hope and Ammu sitting on a beach bench in Kerala at sunset with a stylized Padmanabhaswamy Temple in the background.');for(const [id,active]of[['beach-tab',!isRoom],['room-tab',isRoom]]){const el=document.getElementById(id);el.classList.toggle('active',active);active?el.setAttribute('aria-current','step'):el.removeAttribute('aria-current')}const wrap=document.getElementById('scene-wrap');wrap.classList.remove('scene-change');void wrap.offsetWidth;wrap.classList.add('scene-change');}
document.getElementById('next').onclick=()=>scene==='beach'?showInvite():goTo('beach');document.getElementById('continue').onclick=()=>{goTo('room');document.getElementById('greeting').tabIndex=-1;document.getElementById('greeting').focus({preventScroll:true})};document.getElementById('stay').onclick=closeInvite;document.getElementById('beach-tab').onclick=()=>goTo('beach');document.getElementById('room-tab').onclick=()=>scene==='room'?goTo('room'):showInvite();
invitation.addEventListener('keydown',e=>{if(e.key==='Escape')closeInvite();if(e.key==='Tab'){e.preventDefault();(document.activeElement===document.getElementById('continue')?document.getElementById('stay'):document.getElementById('continue')).focus()}});
function expand(){const active=document.getElementById('scene-wrap').classList.toggle('expanded');document.body.style.overflow=active?'hidden':'';document.getElementById('expand').setAttribute('aria-label',active?'Close expanded scene':'Expand the pixel scene');document.getElementById('expand').textContent=active?'×':'⛶'}
document.getElementById('expand').onclick=expand;document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('scene-wrap').classList.contains('expanded'))expand()});
// A matching handmade portrait for the letter.
const p=document.getElementById('portrait').getContext('2d');rect(0,0,40,44,'#dcd6b8',p);rect(7,32,27,12,'#68846a',p);rect(14,27,12,9,'#ba906e',p);rect(10,9,22,21,'#c79c79',p);rect(8,7,23,8,'#3c4434',p);rect(8,12,6,14,'#3c4434',p);rect(14,5,14,3,'#3c4434',p);rect(16,17,3,3,'#424a35',p);rect(27,17,3,3,'#424a35',p);rect(23,20,3,4,'#b58564',p);rect(19,26,8,2,'#8d6650',p);rect(12,21,4,3,'#d9a88b',p);rect(14,33,11,3,'#d5caa1',p);
cache();requestAnimationFrame(render);
