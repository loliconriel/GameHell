window.onload = function(){

    document.addEventListener('keydown', function(event) {
        //是否按下了r
        if (event.key === 'r') {
            customPopup.style.display = 'none';
            init();
        }
    });
    document.getElementById("closePopupBtn").addEventListener('click', function () {
        customPopup.style.display = 'none';
        init();
        
    });
    init();

}
let TimeID;
let Time = 0;
let Size = 0;
let MineCount = 0;
let BlockStartTag = "<button onclick = \"";
let BlockEndTag = "</button>"
let EmptyBlock = "PressButton(event)\" id = \"myButton\" class = \"Emptyblock block\">";
let MineBlock = "PressButton(event)\" id = \"myButton\" class = \"Mineblock block\">"
let NumberBlock = "PressButton(event)\" id = \"myButton\" class = \"Numberblock block\">";
let MapArray;

function init(){
    
    var Difficulty = document.getElementById("DifficultyShow").innerHTML;
    if(Difficulty == '簡單'){
        GenerateMap(10,10);
    }
    else if(Difficulty == '普通'){
        GenerateMap(18,40);
    }
    else if(Difficulty == '困難'){
        GenerateMap(24,99);
    }
    else{
        GenerateMap(18,40);
    }
    
    BlockListener();

    PlayTime();
    
}

function PlayTime(){
    clearInterval(TimeID);
    Time = 0;
    document.getElementById("TimeClock").innerHTML = Time;
    TimeID = setInterval(function(){
        Time++;
        document.getElementById("TimeClock").innerHTML = Time;
    },1000);
}
function WinCheck(){
    let Allblock = document.getElementsByClassName("block");
    let Markblock = 0;
    let Notopenblock = 0;
    let Openblock = 0;
    for(let i = 0;i<Size*Size;i++){
        let blockclass = Allblock[i].className.split(' ');
        if(blockclass.length==2)Notopenblock++;
        else if(blockclass[2]=="mark")Markblock++;
        else Openblock++;
    }
    if(Markblock+Notopenblock==MineCount){
        console.log("You Win");
        document.getElementById("content").innerHTML = "你贏了 關掉視窗開始新的一局";
        customPopup.style.display = 'block';
        clearInterval(TimeID);
    }
    
}
function ChangeMineAmount(MineAmount,event){
    Amount = parseInt(MineAmount+event);
    document.getElementById("MineAmount").innerHTML = Amount;
    if(Amount==0){
        WinCheck();
    }
}
function GenerateMap(MartrixSize = 20,MineAmount = 10){
    //alert("成功呼叫")
    
    MapArray = MapGenerate(MartrixSize,MineAmount);
    ChangeMineAmount(MineAmount,0);
    let MapHTML = "<div>";
    for(let x = 0;x<MartrixSize;x++){
       //MapHTML+="<ul class = 'list'>";
        for(let y = 0;y<MartrixSize;y++){
            if(MapArray[x][y]==0){
                MapHTML+= BlockStartTag+EmptyBlock+BlockEndTag;
            }
            else if(MapArray[x][y]==-1){
                MapHTML+= BlockStartTag+MineBlock+BlockEndTag;
            }
            else{
                MapHTML+= BlockStartTag+NumberBlock+BlockEndTag;
            }
        }
        //MapHTML+="</ul>";
        MapHTML+="<br>";
    }
    //console.log(MapHTML);
    document.getElementById("MiniMap").innerHTML = MapHTML;
    Size = MartrixSize;
    MineCount = MineAmount;
    BlockInsert(MapArray);
    //Setlist();
}

function MapGenerate(MartrixSize,MineAmount){
    // -1 為炸彈 0 為安全 1(含)以上皆為附近8格所藏有的炸彈
    let Map = new Array(MartrixSize*MartrixSize);

    //放置炸彈和初始化
    for(let i = 0;i<MineAmount;i++){
        Map[i] = -1;
    }
    for(let i = MineAmount;i<MartrixSize*MartrixSize;i++){
        Map[i] = 0;
    }
    //隨機擺炸彈
    for (let i = 0; i < MartrixSize*MartrixSize; i ++) {
        const rand = Math.floor(Math.random() * (MartrixSize*MartrixSize - i)) + i;
        [Map[i], Map[rand]] = [Map[rand], Map[i]];
    }
    //一維轉二維
    const newMap = [];
    while(Map.length>0){
        newMap.push(Map.splice(0,MartrixSize));
    }
    //計算周圍8格有多少炸彈
    for(let x = 0;x<MartrixSize;x++){
        for(let y = 0;y<MartrixSize;y++){
            //控制x值
            for(let i = -1;i<=1;i++){
                //控制y值
                for(let j = -1;j<=1;j++){
                    try{
                        if(newMap[x][y]!=-1&&newMap[x+i][y+j]==-1&&!(i==0&&j==0)){
                            newMap[x][y]+=1;
                        }
                    }
                    catch(e){
                        
                    }
                }
            }

        }
    }
    //console.log(newMap);
    return newMap;
}
function Setlist(){
    let lists = document.querySelectorAll('.list');
    lists.forEach(function(list){
        
    })
}
function BlockInsert(MapArray){
    var buttons = document.querySelectorAll(".block");
    let i = 0,j = 0;
    buttons.forEach(function(button){
        let n = MapArray[parseInt(i/MapArray.length)][i%MapArray.length];

        button.innerHTML = n.toString();
        switch(button.innerHTML){
            case "1":
                button.style.color = "blue";
                break;
            case "2":
                button.style.color = "green";
                break;
            case "3":
                button.style.color = "red";
                break;
            case "4":
                button.style.color = "darkblue";
                break;
            case "5":
                button.style.color = "brown";
                break;
            case "6":
                button.style.color = "darkblue";
                break;
            case "7":
                button.style.color = "cadetblue";
                break;
            case "8":
                button.style.color = "gray";
                break;
        }
        i++;
        
    })
}

function BlockListener(){
    var buttons =document.querySelectorAll(".block");
    //console.log(buttons);
    let  i = 0;
    buttons.forEach(function(button){
        button.id = button.id+'_'+i.toString();
        i++;
        button.addEventListener("contextmenu", function(event) {
            // 阻止默认的右键菜单弹出
            event.preventDefault();
            // 判断右键点击的是哪个按钮
            var buttonId = event.target.id;
            // 在这里执行按钮特定的操作，例如触发点击事件
            simulateClick(buttonId);
            

          });
    })
}
function simulateClick(buttonId) {
    var button = document.getElementById(buttonId);

    var clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 2
    });


    // 触发按钮的点击事件
    button.dispatchEvent(clickEvent);
}
function PressButton(event){
    // console.log(document.activeElement.innerHTML)
    //console.log(event.target.id);
    if(event.type =='click'){
        const button = document.getElementById(event.target.id);
        if(event.button==2){
            Mark(button);
            WinCheck();
        }
        else{
            Detect(button);
        }
        
    }
}
function Detect(button){
    let className = button.className.split(' ');
    if(className.length>2){
        return;
    }
    else{
        if("Emptyblock" == className[0]){
            EmptyButton(button);
            WinCheck();
        }
        else if("Numberblock" == className[0]){
            NumberButton(button);
            WinCheck();
        }
        else{
            MineButton();
        }
        
    }
    
}
function Mark(button){
    if(button.className.split(' ').length>2){
        if(button.className.split(' ')[2]=="mark"){
            button.className = button.className.split(' ')[0]+" "+button.className.split(' ')[1];
            ChangeMineAmount(parseInt(document.getElementById("MineAmount").innerHTML),1);
        }
    }
    else{
        button.className+=" mark";
        ChangeMineAmount(parseInt(document.getElementById("MineAmount").innerHTML),-1);
    } 
    
}
function BlockCompare(button1,button2){
    return button1.className.split(' ')[0]== button2.className.split(' ')[0];
}
function EmptyButton(button){
    //console.log("Click Empty");
    
    let className = button.className.split;
    if(className.length>2){

    }
    else if(button.className.split(' ')[2]=="open"){
        return;
    }
    else{
        button.className+=" open";
        let EmptyID = button.id.split("_");
        let EmptyFront = EmptyID[0]+"_";
        let FrontID = parseInt(EmptyID[1]);
        if(parseInt((FrontID-1)/Size)==parseInt(FrontID/Size)&&document.getElementById(EmptyFront+(FrontID-1).toString())!=null){
            // if(BlockCompare(button,document.getElementById(EmptyFront+(parseInt((FrontID-1))).toString()))){
            //     Detect(document.getElementById(EmptyFront+(parseInt((FrontID-1))).toString()));
            // }
            Detect(document.getElementById(EmptyFront+(parseInt((FrontID-1))).toString()));
            
        }
        if(parseInt((FrontID+1)/Size)==parseInt(FrontID/Size)&&document.getElementById(EmptyFront+(FrontID+1).toString())!=null){
            // if(BlockCompare(button,document.getElementById(EmptyFront+(parseInt((FrontID+1))).toString()))){
            //     Detect(document.getElementById(EmptyFront+(parseInt((FrontID+1))).toString()));
            // }
            Detect(document.getElementById(EmptyFront+(parseInt((FrontID+1))).toString()));
        }
        
        if(parseInt((FrontID+Size)/Size)-1==parseInt(FrontID/Size)&&document.getElementById(EmptyFront+(FrontID+Size).toString())!=null){
            // if(BlockCompare(button,document.getElementById(EmptyFront+(parseInt((FrontID+Size))).toString()))){
            //     Detect(document.getElementById(EmptyFront+(parseInt((FrontID+Size))).toString()));
            // }
            Detect(document.getElementById(EmptyFront+(parseInt((FrontID+Size))).toString()));
        }
        if(parseInt((FrontID-Size)/Size)+1==parseInt(FrontID/Size)&&document.getElementById(EmptyFront+(FrontID-Size).toString())!=null){
            // if(BlockCompare(button,document.getElementById(EmptyFront+(parseInt((FrontID-Size))).toString()))){
            //     Detect(document.getElementById(EmptyFront+(parseInt((FrontID-Size))).toString()));
            // }
            Detect(document.getElementById(EmptyFront+(parseInt((FrontID-Size))).toString()));
        }
        if(document.getElementById(EmptyFront+(parseInt((FrontID+1+Size))))!=null&&parseInt((FrontID+1+Size)/Size)==parseInt(FrontID/Size)+1){
            if(document.getElementById(EmptyFront+(parseInt((FrontID+1+Size)))).className.split(' ')[0]!='Mineblock'&&document.getElementById(EmptyFront+(parseInt((FrontID+1+Size)))).className.split(' ').length<3){
                if(document.getElementById(EmptyFront+(parseInt((FrontID+1+Size)))).className.split(' ')[0]=='Emptyblock'){
                    Detect(document.getElementById(EmptyFront+(parseInt((FrontID+1+Size))).toString()));
                }
                else document.getElementById(EmptyFront+(parseInt((FrontID+1+Size)))).className+=' open';
            }
        }
        
        if(document.getElementById(EmptyFront+(parseInt((FrontID-1+Size))))!=null&&parseInt((FrontID-1+Size)/Size)==parseInt(FrontID/Size)+1){
            if(document.getElementById(EmptyFront+(parseInt((FrontID-1+Size)))).className.split(' ')[0]!='Mineblock'&&document.getElementById(EmptyFront+(parseInt((FrontID-1+Size)))).className.split(' ').length<3){
                if(document.getElementById(EmptyFront+(parseInt((FrontID-1+Size)))).className.split(' ')[0]=='Emptyblock'){
                    Detect(document.getElementById(EmptyFront+(parseInt((FrontID-1+Size))).toString()));
                }
                else document.getElementById(EmptyFront+(parseInt((FrontID-1+Size)))).className+=' open';
            }
        }
        if(document.getElementById(EmptyFront+(parseInt((FrontID+1-Size))))!=null&&parseInt((FrontID+1-Size)/Size)==parseInt(FrontID/Size)-1){
            if(document.getElementById(EmptyFront+(parseInt((FrontID+1-Size)))).className.split(' ')[0]!='Mineblock'&&document.getElementById(EmptyFront+(parseInt((FrontID+1-Size)))).className.split(' ').length<3){
                if(document.getElementById(EmptyFront+(parseInt((FrontID+1-Size)))).className.split(' ')[0]=='Emptyblock'){
                    Detect(document.getElementById(EmptyFront+(parseInt((FrontID+1-Size))).toString()));
                }
                else document.getElementById(EmptyFront+(parseInt((FrontID+1-Size)))).className+=' open';
            }
        }
        if(document.getElementById(EmptyFront+(parseInt((FrontID-1-Size))))!=null&&parseInt((FrontID-1-Size)/Size)==parseInt(FrontID/Size)-1){
            if(document.getElementById(EmptyFront+(parseInt((FrontID-1-Size)))).className.split(' ')[0]!='Mineblock'&&document.getElementById(EmptyFront+(parseInt((FrontID-1-Size)))).className.split(' ').length<3){
                if(document.getElementById(EmptyFront+(parseInt((FrontID-1-Size)))).className.split(' ')[0]=='Emptyblock'){
                    Detect(document.getElementById(EmptyFront+(parseInt((FrontID-1-Size))).toString()));
                }
                else document.getElementById(EmptyFront+(parseInt((FrontID-1-Size)))).className+=' open';
            }
        }
        
 
    }

}
function NumberButton(button){
    //console.log("Click Number");
    if(button.className.split(' ').length>2){

    }
    else{
        button.className+=" open";
    }
    
}
function MineButton(event){
    document.getElementById("content").innerHTML = "你輸了 關掉視窗開始新的一局";
    customPopup.style.display = 'block';
    clearInterval(TimeID);
    //console.log("BOOM");

}
