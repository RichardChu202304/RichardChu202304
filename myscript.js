
document.oncontextmenu = new Function("return false");

var btnarr=[0x100];
var size=8;
var bumbs=10;
var timer=0;
var tickTime=40;
var died=0;
var remain=0;

function init(){
    console.log(0x11);
    for(var i=0;i<0x100;i++){
        btnarr[i]=new groundObj(1,0,i);
    }
    document.getElementById(addbtn(0)).hidden=0;
    document.getElementById("btng").hidden=1;
    //fnbtng();
    fnbtnh();
    document.getElementById("warning").textContent="";
    //document.getElementById("btng").textContent="DEBUG"
    setInterval(tick,tickTime);
}

/*
for(var i=0;i<0x100;i++){
    tester[i]=new testobj(0,0);
}
console.log(tester[0]._a)
console.log(document.getElementById("input01").value);

function testobj(_a,_b){
        this._a=_a;
        this.Number
}
var a1={x: 0,y: 0,z:0,vx:0,vy:0,vz:0};
*/

function tick(){
    if(died==0){
        timer+=tickTime;
    }
    if(timer%1000>=100){
        document.getElementById("btnj").textContent=Math.floor(timer/1000)+"."+timer%1000+"s";
    }else if(timer%1000<100 & timer%1000>=10){
        document.getElementById("btnj").textContent=Math.floor(timer/1000)+".0"+timer%1000+"s";
    }else{
        document.getElementById("btnj").textContent=Math.floor(timer/1000)+".00"+timer%1000+"s";
    }
}
function fnbtng(){//debug
    //console.clear();
    for(var i=0;i<0x100;i++){
        console.log(btnarr[i]);
        if(btnarr[i]._bumb===1){
                document.getElementById(addbtn(i)).style.background="#FF0000";
        }
    }
}
function fnbtngR(){
        console.log("hello world");
}

function fnbtnh(){//reset
    died=0;
    timer=0;
    document.getElementById("warning").textContent=""
    if(Number(document.getElementById("input01").value)<=16 & Number(document.getElementById("input01").value)>0){
        size=Number(document.getElementById("input01").value);
    }else{
        document.getElementById("warning").textContent="ERROR:格數溢位(最大16格)";
        return;
    }
    console.log(size);
    for(var i=0;i<0x100;i++){
        if(btnarr[i]._x>=size | btnarr[i]._y>=size){
                btnarr[i]._visible=0;
        }else{
                btnarr[i]._visible=1;
        }
        document.getElementById(addbtn(i)).hidden=(!(btnarr[i]._visible));
        btnarr[i]._clicked=0;//-------恢復未被點擊----------------------
    }
    if(Number(document.getElementById("input02").value)<size*size & Number(document.getElementById("input02").value)>0){
        bumbs=Number(document.getElementById("input02").value);
    }else{
        document.getElementById("warning").textContent="ERROR:地雷數量需大於零且小於總格數";
        return;
    }
    remain=size*size-bumbs;
    document.getElementById("btni").textContent="剩下"+remain+"格安全";
    document.getElementById("btni").style.fontSize="20px"
    for(var i=0;i<0x100;i++){
        btnarr[i]._bumb=0;
        document.getElementById(addbtn(i)).textContent="&";
        document.getElementById(addbtn(i)).style="width: 40px;color: #E0E0E0;height: 40px;border-width: 5px;border-color: #E0E0E0;background: #E0E0E0;font-size: 25px;font-weight: 700;"
    }
    var temp=0;
    while(bumbs>0){
        temp=Math.floor((Math.random()*size))*16+Math.floor((Math.random()*size));
        console.log(temp);
        if(btnarr[temp]._bumb==0 & btnarr[temp]._visible==1){
                btnarr[temp]._bumb=1;
                bumbs--;
        }
    }
}

function find_bumb(_y,_x){
        if(_y<0){
                return 0;
        }else if(_y>=size){
                return 0;
        }else if(_x<0){
                return 0;
        }else if(_x>=size){
                return 0;
        }
        return btnarr[_y*16+_x]._bumb;
}

function click(_y,_x){
    if(_y>=size | _y<0 | _x>=size | _x<0){
        return;
    }
    var _btnnum=_y*16+_x;
    if(btnarr[_btnnum]._clicked>=1){//防重復點----------
        return;
    }
    if(died==1){
        return;
    }
    btnarr[_btnnum]._clicked=1;
    if(btnarr[_btnnum]._bumb==1){//觸雷--------------
        for(var i=0;i<0x100;i++){
            if(btnarr[i]._bumb==1){
                document.getElementById(addbtn(i)).style.color="#000000";
                document.getElementById(addbtn(i)).textContent="X";
                document.getElementById(addbtn(i)).style.background="#FF0000";
            }
        }
        died=1;
        return;
    }
    document.getElementById(addbtn(_btnnum)).style.borderWidth="2px";
    var temp=find_bumb(_y+1,_x+1)+find_bumb(_y+1,_x)+find_bumb(_y+1,_x-1)+find_bumb(_y,_x+1)+find_bumb(_y,_x-1)+find_bumb(_y-1,_x+1)+find_bumb(_y-1,_x)+find_bumb(_y-1,_x-1);
    if(temp==0){
        click(_y+1,_x+1)+click(_y+1,_x)+click(_y+1,_x-1)+click(_y,_x+1)+click(_y,_x-1)+click(_y-1,_x+1)+click(_y-1,_x)+click(_y-1,_x-1);
    }else{
        document.getElementById(addbtn(_btnnum)).textContent=temp;
        if(temp==1){
                document.getElementById(addbtn(_btnnum)).style.color="#0000FF";
        }else if(temp==2){
                document.getElementById(addbtn(_btnnum)).style.color="#00FF00";
        }else if(temp==3){
                document.getElementById(addbtn(_btnnum)).style.color="#FF0000";
        }else if(temp==4){
                document.getElementById(addbtn(_btnnum)).style.color="#000080";
        }else if(temp==5){
                document.getElementById(addbtn(_btnnum)).style.color="#800000";
        }else if(temp==6){
                document.getElementById(addbtn(_btnnum)).style.color="#00FFFF";
        }else if(temp==7 | temp==8){
                document.getElementById(addbtn(_btnnum)).style.color="#000000";
        }
    }
    remain--;
    document.getElementById("btni").textContent="剩下"+remain+"格安全";
    
    if(remain==0){
        document.getElementById("btni").textContent="You Win!";
        died=-1;
        for(var i=0;i<0x100;i++){
                if(btnarr[i]._bumb==1){
                        document.getElementById(addbtn(i)).textContent="V";
                        document.getElementById(addbtn(i)).style.color="#000000";
                }
        }
    }
    return;
}


function fnbtn(_btnnum){
    console.log(_btnnum);
    if(btnarr[_btnnum]._clicked>=1 | died==-1){//防重復點----------
        return;
    }
    var x=_btnnum%16;
    var y=(_btnnum-_btnnum%16)/16;
    document.getElementById(addbtn(_btnnum)).style.background="#D8D8D8";
    document.getElementById(addbtn(_btnnum)).style.color="#D8D8D8";
    click(y,x);
}

function fnbtnR(_btnnum){
    if(died==-1){
        return;
    }
    if(document.getElementById(addbtn(_btnnum)).textContent=="V"){
        document.getElementById(addbtn(_btnnum)).textContent="&";
        document.getElementById(addbtn(_btnnum)).style.color="#E0E0E0";
        btnarr[_btnnum]._clicked=0;
        return;
    }
    console.log(_btnnum);
    document.getElementById(addbtn(_btnnum)).textContent="V";
    document.getElementById(addbtn(_btnnum)).style.color="#000000";
    btnarr[_btnnum]._clicked=1;
}


function groundObj(_visible,_bumb,_place){
    this._visible=_visible;
    this._bumb=_bumb;
    this._y=(_place-_place%16)/16;
    this._x=_place%16;
    this._clicked=0;
}
//----------save--------
function addbtn(aa){
    var bb;
    bb='btn'+numToString_629(aa);
    return bb;
}
function numToString_629(aa){
    var cc;
    cc=numToChar_629((aa-aa%16)/16)+numToChar_629(aa%16);
    return cc;
}
function numToChar_629(ww){
    if(ww===0){
        return '0';
    }else if(ww===1){
        return '1';
    }else if(ww===2){
        return '2';
    }else if(ww===3){
        return '3';
    }else if(ww===4){
        return '4';
    }else if(ww===5){
        return '5';
    }else if(ww===6){
        return '6';
    }else if(ww===7){
        return '7';
    }else if(ww===8){
        return '8';
    }else if(ww===9){
        return '9';
    }else if(ww===10){
        return 'A';
    }else if(ww===11){
        return 'B';
    }else if(ww===12){
        return 'C';
    }else if(ww===13){
        return 'D';
    }else if(ww===14){
        return 'E';
    }else if(ww===15){
        return 'F';
    }
}
/*
function fnbtn00(){
    if(btnarr[0x00]===0){
        btnarr[0x00]=1;
    }else if(btnarr[0x00]===1){
        btnarr[0x00]=0;
    }
}
function fnbtn01(){
    if(btnarr[0x01]===0){
        btnarr[0x01]=1;
    }else if(btnarr[0x01]===1){
        btnarr[0x01]=0;
    }
}
*/



