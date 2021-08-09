class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];
    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();


        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            p1Score = allPlayers.player1.score;
            p2Score = allPlayers.player2.score;

            if(index === player.index){   
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25); 
                
            }
           
            // Add code to diplay the scores of both 
            // the players on the screen
            
        fill("white");
        textSize(30);
        text(allPlayers.player1.name + ":" + p1Score, 10, 40);
        text(allPlayers.player2.name + ":" + p2Score, 10, 80);
        console.log(p1Score);
        console.log(p2Score);



        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
        if(frameCount % 150 === 0){
            bomb = createSprite(random(100, 1000), 0, 100, 100);
            bomb.addImage(bomb_img);
            bomb.scale = 0.3;
            bomb.velocityY = 6;
            bombGroup.add(bomb);
        }

        if (frameCount % 100 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
            
        }

        if(player.index !== null){
            for(var i = 0 ; i<bombGroup.length;i++){
                if(bombGroup[i].isTouching(players)){
                    bombGroup[i].destroy();
                    player.score = player.score - 1;
                    player.update();                
                }
            }
            for(var i = 0 ; i<fruitGroup.length;i++){
                if(fruitGroup[i].isTouching(players)){
                    fruitGroup[i].destroy();
                    player.score = player.score + 1;
                    player.update(); 
                }
            }
        }
        // Add code to destroy fruits, calculate scores and
        // update the scores to the database


        // Add code for game end condition
        if(player.score === 5 || player.score < 0){
            gameState = 2;
        }


    }

    end(){
        if(player.score < 0){
        fill("white");
        textSize(100);
        text('Game Over', 250, 250);
        }

        if(player.score === 5){
            fill("white");
            textSize(100);
            text('You Won', 250, 250);
        }
        // Add code to update game state and display Game Over


       
    }
}
