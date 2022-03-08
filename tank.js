function drawtank(tank){
    //******************坦克整体40*30
    switch(tank.direct){
        case 0:
        case 2:
            br.fillStyle=tank.color;
            br.fillRect(tank.x,tank.y,30,10);
            br.fillRect(tank.x,tank.y+20,30,10);
            br.beginPath();
            br.arc(tank.x+15,tank.y+15,5,0,2*Math.PI);
            // br.closePath();
            br.fill();
            if(tank.direct==0){
                br.fillRect(tank.x+20,tank.y+13,10,3);
            }
            if(tank.direct==2){
                br.fillRect(tank.x,tank.y+13,10,3);
            }
            break;
        case 1:
        case 3:
            br.fillStyle=tank.color;
            br.fillRect(tank.x,tank.y,10,30);
            br.fillRect(tank.x+20,tank.y,10,30);
            br.beginPath();
            br.arc(tank.x+15,tank.y+15,5,0,2*Math.PI);
            // br.closePath();
            br.fill();
            if(tank.direct==1){
                br.fillRect(tank.x+14,tank.y+20,3,10);
            }
            if(tank.direct==3){
                br.fillRect(tank.x+14,tank.y,3,10);
            }
            break;
    }
}

function tank(x,y,direct,color){
    this.islive=true;
    this.x=x;
    this.y=y;
    this.direct=direct[0];
    this.color=color;
    this.speed=6;

    this.moveUp=function(){
        this.direct=direct[3];
        if(isStrikeWall (this,walls)&&this.y-this.speed>=0)
        {this.y=this.y-this.speed;}
        
    }
    this.moveRight=function(){
        this.direct=direct[0];
        if(isStrikeWall (this,walls)&&this.x+this.speed<=510)
        {this.x=this.x+this.speed;}
        
    }
    this.moveDown=function(){
        this.direct=direct[1];
        if(isStrikeWall(this,walls)&&this.y+this.speed<=510)
        {this.y=this.y+this.speed;}
        
    }
    this.moveLeft=function(){
        this.direct=direct[2];
        if(isStrikeWall(this,walls)&&this.x-this.speed>=0)
        {this.x=this.x-this.speed;}
        
    }
    this.shot=function(key){
        if(key==13){
            if(g<50)
            {gbullet[g]=new bullet(this);
            drawbullet(gbullet[g]);
            g++;
            eb.innerText=g;
        }
        }else{
            if(e<50)
           { ybullet[e]=new bullet(this);
            drawbullet(ybullet[e])
            e++;
            hb.innerText=e;
        }
        }
    }
}

function machinetank(x,y,direct,color){
    this.machinetank=tank;
    this.machinetank(x,y,direct);
    this.color=color;
    this.isbullet=0;
    this.speed = 4;
    this.count=0;
    this.run = function(){
        switch(this.direct){
            case 0:
                if(isStrikeWall(this,walls)&&this.x+this.speed<=510)
                {this.x=this.x+this.speed;} 
            break;
            case 1:
                if(isStrikeWall(this,walls)&&this.y+this.speed<=510)
                {this.y=this.y+this.speed;}
            
            break;
            case 2:
                if(isStrikeWall(this,walls)&&this.x-this.speed>=0)
                {this.x=this.x-this.speed;}
            break;
            case 3:
                if(isStrikeWall(this,walls)&&this.y-this.speed>=0)
                {this.y=this.y-this.speed;}
            break;
        }
        
        if(this.count>=20){
            this.direct = Math.floor(Math.random()*4);
            this.isbullet = Math.floor(Math.random()*4);
            this.count=0;
        }
        this.count++;
        //在坦克走的过程中,判断一下,这个坦克是否发子弹
        if(this.isbullet == 1 && this.islive){

            machineBullets.push(new bullet(this));
        
        }
    }
}

function bullet(tank){
    this.islive=true;
    this.direct=tank.direct;
    this.color=tank.color
    this.speed=6;
    switch(this.direct){
        case 0:
            this.x=tank.x+30;
            this.y=tank.y+13.5;
            break;
        case 2:               
            this.x=tank.x;   
            this.y=tank.y+13.5;            
            break;
        case 1:               
            this.x=tank.x+13.5;
            this.y=tank.y+30;            
            break;
        case 3:
            this.x=tank.x+13.5;
            this.y=tank.y;         
            break;
       } 
}

function drawbullet(bullet){
    br.fillStyle=bullet.color;
    br.beginPath();

    br.fillRect(bullet.x,bullet.y,3,3);
   switch(bullet.direct){
    case 0:  
        bullet.x+=bullet.speed;
        break;
    case 2:
        bullet.x-=bullet.speed;
        break;
    case 1:
        bullet.y+=bullet.speed;
        break;
    case 3:
        bullet.y-=bullet.speed;
        break;
   }
}
//判断子弹击中坦克
function isHitTank (bullet,tank){
    if(bullet.islive==true && tank.islive==true){
        if(bullet.x >= tank.x && bullet.x <= tank.x+30 && bullet.y >= tank.y && bullet.y<=tank.y+30){
            bullet.islive=false;
            tank.islive=false;
            br.drawImage(img,tank.x,tank.y);
            if(bullet.color=="#0FF"){
                eh.innerText=++ehitnum;
            }
            if(bullet.color=="#ff5"){
                hh.innerText=++ghitnum;
            }
        }
    }
}
//判断子弹击中墙体
function isHitWall (bullet,walls){
    walls.forEach(swall=>{
        if(bullet.islive==true && swall.islive==true){
            if(bullet.x >= swall.x && bullet.x <=swall.x+30 && bullet.y >=swall.y && bullet.y <=swall.y+30){
                bullet.islive=false;
                if(swall.color=="#f55")
                {swall.islive=false;}
            }
        }
    })
}
//判断tank撞击墙体
function isStrikeWall (tank,walls){
    var n;
    var m;
    var i=0;
    switch(tank.direct){
        case 0: n=tank.x+tank.speed;m=tank.y;break;
        case 1: m=tank.y+tank.speed;n=tank.x;break;
        case 2: n=tank.x-tank.speed;m=tank.y;break;
        case 3: m=tank.y-tank.speed;n=tank.x;break;
    }
    
    walls.forEach(swall=>{
        if(tank.islive==true && swall.islive==true){
            if(n > swall.x && n <swall.x+30 && m >swall.y-2 &&m <swall.y+30){
                i=1;
            }
            if( n+30 > swall.x && n+30 <swall.x+30 && m+30 >swall.y-2 && m+30 <swall.y+30){
                i=1;
            }
            if( n+30 > swall.x && n+30 <swall.x+30 && m >swall.y+2 && m <swall.y+30){
                i=1;
            }
            if( n > swall.x && n <swall.x+30 && m+30 >swall.y+2 && m+30 <swall.y+30){
                i=1;
            }
        }
    })
   if(i==0){
       return true;
   }
   return false;
}

function wall(x,y,color){
    
    this.islive=true;
    this.x=x;
    this.y=y;
    this.color=color;
    this.drawWall=function(){
        br.beginPath();
        br.fillStyle=this.color;
        br.strokeStyle="#f00";
        br.lineWidth=2;
        br.fillRect(this.x,this.y,30,30);
        br.strokeRect(this.x,this.y,30,30);

        br.beginPath();
        br.lineWidth=2;
        br.strokeStyle="#f00";
        br.moveTo(this.x,this.y);
        br.lineTo(this.x+30,this.y+30);
        br.moveTo(this.x+30,this.y);
        br.lineTo(this.x,this.y+30);
        br.stroke();
    }
}
function drawmap(walls){
    walls.forEach(swall => {
        if(swall.islive){
            swall.drawWall();
        }
    });
}

