/*TO DO LIST

Añadir la opcion de que el jugador elija el máximo de canicas posibles

Mejorar las colisiones en las esquinas

Arreglar el bug cuando se elimina un jugador

Mejorar el mapa para hacerlo equitativo

Añadir paredes indestructibles

Separar la app en diversos archivos .js para organizar mejor el código

*/
document.addEventListener('DOMContentLoaded', ()=>{
    const playBtn = document.getElementById('play');
    const pauseBtn = document.getElementById('pause');
    const restartBtn = document.getElementById('restart');
    var settings = document.getElementById('settings');

    //Number of players

    //getting the select input from html
    var playersSelect = document.getElementById("players");
    //default value
    var numPlayers = 2;
    //Redrawing the canvas considering the number of players selected
    playersSelect.addEventListener('change', (event) => {
        let changeFirstBallSpeed;
        numPlayers = event.target.value;
        initialBricks();
        initialKernels(numPlayers);
        draw(numPlayers);
        for(i=0; i<numPlayers; i++){
            changeFirstBallSpeed = getDirection(ballSpeed);
            teams[i][0][0][2] = changeFirstBallSpeed[0];
            teams[i][0][0][3] = changeFirstBallSpeed[1];
        }
    });

    //Ball spawn rating

    //getting the select input from html
    var ballSpawnSelect = document.getElementById("ballSpawnRating");
    //default value
    var ballSpawnRating = 4000;
    //redrawing the canvas considering the ballSpawnRating selected
    ballSpawnSelect.addEventListener('change', (event) =>{
        let rawValue = event.target.value;
        //Format the data from the input to an integer
        ballSpawnRating = parseInt(rawValue.slice(0, 2)) * 1000;
        initialBricks();
        initialKernels(numPlayers);
        draw(numPlayers);
    })

    //Ball speed selection

    //getting the select input from html
    var ballSpeedSelect = document.getElementById("ballSpeedRating");
    //default value
    var ballSpeed = 1;
    //redrawing the canvas considering the ballSpeedRating selected
    ballSpeedSelect.addEventListener('change', (event)=>{
        let rawValue = event.target.value;
        let changeFirstBallSpeed;
        //Format the data from the input to an integer
        ballSpeed = parseInt(rawValue.slice(1));
        initialBricks();
        initialKernels(numPlayers);
        draw(numPlayers);
        for(i=0; i<numPlayers; i++){
            changeFirstBallSpeed = getDirection(ballSpeed);
            teams[i][0][0][2] = changeFirstBallSpeed[0];
            teams[i][0][0][3] = changeFirstBallSpeed[1];
        }
    })

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");


    //Canvas attributes
    var initialStatus = 0;
    var ballRadius = 7;
    var brickRowCount = 30;
    var brickColumnCount = 30;
    var brickWidth = 20;
    var brickHeight = 20;
    var brickPadding = 1;
    var brickOffsetTop = 1;
    var brickOffsetLeft = 1;
    var bricks = [];
    var numBalls = 1;


    /*
    TEAMS
    team[0] -> balls
    team[1] -> Status
    team[2] -> ballColor
    team[3] -> kernelStatus
    */

    /*
    BALLS
    team[0][0] -> X
    team[0][1] -> Y
    team[0][2] -> Dx
    team[0][3] -> Dy
    */
    var teams = [];
    var initialPositions = [];
    var kernels = [];
    var infiniteDirectionsDx = 0;
    var infiniteDirectionsDy = 0;
    var directions;


    //Blue team
    var blueTeam = [];
    var blueInitialPosition = [];
    var blueBalls = [];
    var firstBlueBall = [];
    var blueX = Math.round(canvas.width/2);
    var blueY = 30;
    directions = getDirection(ballSpeed);
    var blueDx = directions[0];
    var blueDy = directions[1];
    var blueStatus = 1;
    var blueKernelStatus = 111;
    var ballColorBlue = "#0033FF";
    var blueKernelCoords =
    [
    [[14],[1]],
    [[14],[2]],
    [[15],[1]],
    [[15],[2]]
    ];
    firstBlueBall.push(blueX);
    firstBlueBall.push(blueY);
    firstBlueBall.push(blueDx);
    firstBlueBall.push(blueDy);
    blueBalls.push(firstBlueBall);
    blueTeam.push(blueBalls);
    blueTeam.push(blueStatus);
    blueTeam.push(ballColorBlue);
    blueTeam.push(blueKernelStatus);
    teams.push(blueTeam);
    blueInitialPosition.push(blueX);
    blueInitialPosition.push(blueY);
    initialPositions.push(blueInitialPosition);
    kernels.push(blueKernelCoords);

    //Orange team
    var orangeTeam = [];
    var orangeInitialPosition = [];
    var orangeBalls = [];
    var firstOrangeBall = [];
    var orangeX = Math.round(canvas.width/2);
    var orangeY = canvas.height-30;
    directions = getDirection(ballSpeed);
    var orangeDx = directions[0];
    var orangeDy = directions[1];
    var orangeStatus = 2;
    var orangeKernelStatus = 222;
    var ballColorOrange = "#CC3300";
    var orangeKernelCoords =
    [
    [[14],[27]],
    [[14],[28]],
    [[15],[27]],
    [[15],[28]]
    ];
    firstOrangeBall.push(orangeX);
    firstOrangeBall.push(orangeY);
    firstOrangeBall.push(orangeDx);
    firstOrangeBall.push(orangeDy);
    orangeBalls.push(firstOrangeBall);
    orangeTeam.push(orangeBalls);
    orangeTeam.push(orangeStatus);
    orangeTeam.push(ballColorOrange);
    orangeTeam.push(orangeKernelStatus);
    teams.push(orangeTeam);
    orangeInitialPosition.push(orangeX);
    orangeInitialPosition.push(orangeY);
    initialPositions.push(orangeInitialPosition);
    kernels.push(orangeKernelCoords);


    //Green team
    var greenTeam = [];
    var greenInitialPosition = [];
    var greenBalls = [];
    var firstGreenBall = [];
    var greenX = 30;
    var greenY = Math.round(canvas.height/2);
    directions = getDirection(ballSpeed);
    var greenDx = directions[0];
    var greenDy = directions[1];
    var greenStatus = 3;
    var greenKernelStatus = 333;
    var ballColorGreen = "#0e900a";
    var greenKernelCoords =
    [
    [[1],[14]],
    [[1],[15]],
    [[2],[14]],
    [[2],[15]]
    ];
    firstGreenBall.push(greenX);
    firstGreenBall.push(greenY);
    firstGreenBall.push(greenDx);
    firstGreenBall.push(greenDy);
    greenBalls.push(firstGreenBall);
    greenTeam.push(greenBalls);
    greenTeam.push(greenStatus);
    greenTeam.push(ballColorGreen);
    greenTeam.push(greenKernelStatus);
    teams.push(greenTeam);
    greenInitialPosition.push(greenX);
    greenInitialPosition.push(greenY);
    initialPositions.push(greenInitialPosition);
    kernels.push(greenKernelCoords);


    //Red team
    var redTeam = [];
    var redInitialPosition = [];
    var redBalls = [];
    var firstRedBall = [];
    var redX = canvas.width-30;
    var redY = Math.round(canvas.height/2);
    directions = getDirection(ballSpeed);
    var redDx = directions[0];
    var redDy = directions[1];
    var redStatus = 4;
    var redkernelStatus = 444;
    var ballColorRed = "#900a0a";
    var redKernelCoords =
    [
    [[27],[14]],
    [[27],[15]],
    [[28],[14]],
    [[28],[15]]
    ];
    firstRedBall.push(redX);
    firstRedBall.push(redY);
    firstRedBall.push(redDx);
    firstRedBall.push(redDy);
    redBalls.push(firstRedBall);
    redTeam.push(redBalls);
    redTeam.push(redStatus);
    redTeam.push(ballColorRed);
    redTeam.push(redkernelStatus);
    teams.push(redTeam);
    redInitialPosition.push(redX);
    redInitialPosition.push(redY);
    initialPositions.push(redInitialPosition);
    kernels.push(redKernelCoords);


    //Yellow team
    var yellowTeam = [];
    var yellowInitialPosition = [];
    var yellowBalls = [];
    var firstYellowBall = [];
    var yellowX = 33;
    var yellowY = 40;
    directions = getDirection(ballSpeed);
    var yellowDx = directions[0];
    var yellowDy = directions[1];
    var yellowStatus = 5;
    var yellowKernelStatus = 555;
    var ballColorYellow = "#8e900a";
    var yellowKernelCoords =
    [
    [[1],[1]],
    [[1],[2]],
    [[2],[1]],
    [[2],[2]]
    ];
    firstYellowBall.push(yellowX);
    firstYellowBall.push(yellowY);
    firstYellowBall.push(yellowDx);
    firstYellowBall.push(yellowDy);
    yellowBalls.push(firstYellowBall);
    yellowTeam.push(yellowBalls);
    yellowTeam.push(yellowStatus);
    yellowTeam.push(ballColorYellow);
    yellowTeam.push(yellowKernelStatus);
    teams.push(yellowTeam);
    yellowInitialPosition.push(yellowX);
    yellowInitialPosition.push(yellowY);
    initialPositions.push(yellowInitialPosition);
    kernels.push(yellowKernelCoords);


    //Purple team
    var purpleTeam = [];
    var purpleInitialPosition = [];
    var purpleBalls = [];
    var firstPurpleBall = [];
    var purpleX = canvas.width-33;
    var purpleY = 40;
    directions = getDirection(ballSpeed);
    var purpleDx = directions[0];
    var purpleDy = directions[1];
    var purpleStatus = 6;
    var purpleKernelStatus = 666;
    var ballColorPurple = "#650a90";
    var purpleKernelCoords =
    [
    [[27],[1]],
    [[27],[2]],
    [[28],[1]],
    [[28],[2]]
    ];
    firstPurpleBall.push(purpleX);
    firstPurpleBall.push(purpleY);
    firstPurpleBall.push(purpleDx);
    firstPurpleBall.push(purpleDy);
    purpleBalls.push(firstPurpleBall);
    purpleTeam.push(purpleBalls);
    purpleTeam.push(purpleStatus);
    purpleTeam.push(ballColorPurple);
    purpleTeam.push(purpleKernelStatus);
    teams.push(purpleTeam);
    purpleInitialPosition.push(purpleX);
    purpleInitialPosition.push(purpleY);
    initialPositions.push(purpleInitialPosition);
    kernels.push(purpleKernelCoords);


    //Black team
    var blackTeam = [];
    var blackInitialPosition = [];
    var blackBalls = [];
    var firstBlackBall = [];
    var blackX = 33;
    var blackY = canvas.height-40;
    directions = getDirection(ballSpeed);
    var blackDx = directions[0];
    var blackDy = directions[1];
    var blackStatus = 7;
    var blackKernelStatus = 777;
    var ballColorBlack = "#000000";
    var blackKernelCoords =
    [
    [[1],[27]],
    [[1],[28]],
    [[2],[27]],
    [[2],[28]]
    ];
    firstBlackBall.push(blackX);
    firstBlackBall.push(blackY);
    firstBlackBall.push(blackDx);
    firstBlackBall.push(blackDy);
    blackBalls.push(firstBlackBall);
    blackTeam.push(blackBalls);
    blackTeam.push(blackStatus);
    blackTeam.push(ballColorBlack);
    blackTeam.push(blackKernelStatus);
    teams.push(blackTeam);
    blackInitialPosition.push(blackX);
    blackInitialPosition.push(blackY);
    initialPositions.push(blackInitialPosition);
    kernels.push(blackKernelCoords);


    //Pink team
    var pinkTeam = [];
    var pinkInitialPosition = [];
    var pinkBalls = [];
    var firstPinkBall = [];
    var pinkX = canvas.width-33;
    var pinkY = canvas.height-40;
    directions = getDirection(ballSpeed);
    var pinkDx = directions[0];
    var pinkDy = directions[1];
    var pinkStatus = 8;
    var pinkKernelStatus = 888;
    var ballColorPink = "#d10a77";
    var pinkKernelCoords =
    [
    [[27],[27]],
    [[27],[28]],
    [[28],[27]],
    [[28],[28]]
    ];
    firstPinkBall.push(pinkX);
    firstPinkBall.push(pinkY);
    firstPinkBall.push(pinkDx);
    firstPinkBall.push(pinkDy);
    pinkBalls.push(firstPinkBall);
    pinkTeam.push(pinkBalls);
    pinkTeam.push(pinkStatus);
    pinkTeam.push(ballColorPink);
    pinkTeam.push(pinkKernelStatus);
    teams.push(pinkTeam);
    pinkInitialPosition.push(pinkX);
    pinkInitialPosition.push(pinkY);
    initialPositions.push(pinkInitialPosition);
    kernels.push(pinkKernelCoords);


    //Randommize the direction of the ball
    function getDirection(ballSpeed){
        var directions = [];
        var signal;
        ballSpeed = ballSpeed/2;

        //The speed of the ball is determined by hoy many pixels the ball advances in the x and y axis.
        while(  infiniteDirectionsDx < 0.1 ||
                infiniteDirectionsDx > ballSpeed-0.1){
            infiniteDirectionsDx = (Math.round(Math.random()*100) / 100)*2;
        }
        infiniteDirectionsDy = ballSpeed - infiniteDirectionsDx;
        signal = Math.random();
        if(signal < 0.5){
            infiniteDirectionsDx = -infiniteDirectionsDx;
        }
        signal = Math.random();
        if(signal < 0.5){
            infiniteDirectionsDy = -infiniteDirectionsDy;
        }
        directions.push(infiniteDirectionsDx);
        directions.push(infiniteDirectionsDy);
        return directions;
    }


    function initialBricks(){
        for(c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: initialStatus };
            }
        }
    }

    function initialKernels(numPlayers){
        for(i=0; i<numPlayers; i++){
            /*
            Blue example (data from blueKernelCoords):
            bricks[column coord][row coord] (first set of coords)
            bricks[column coord][row coord] (second set of coords)
            bricks[column coord][row coord] (third set of coords)
            bricks[column coord][row coord] (fourth set of coords)
            */
            bricks[kernels[i][0][0]][kernels[i][0][1]].status = teams[i][3];
            bricks[kernels[i][1][0]][kernels[i][1][1]].status = teams[i][3];
            bricks[kernels[i][2][0]][kernels[i][2][1]].status = teams[i][3];
            bricks[kernels[i][3][0]][kernels[i][3][1]].status = teams[i][3];
        }
    }

    function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    brickColor(bricks[c][r].status);
                    ctx.fill();
                    ctx.closePath();
            }
        }
    }

    function brickColor(status){
        switch(status){
            case blueStatus:
                ctx.fillStyle = "#00CCFF"; //blue
                break;
            case blueKernelStatus:
                ctx.fillStyle = "#0526AD"; //blue kernel
                break;
            case orangeStatus:
                ctx.fillStyle = "#CC6600"; //orange
                break;
            case orangeKernelStatus:
                ctx.fillStyle = "#833F00"; //orange kernel
                break;
            case greenStatus:
                ctx.fillStyle = "#00CC00"; //green
                break;
            case greenKernelStatus:
                ctx.fillStyle = "#128300"; //green kernel
                break;
            case redStatus:
                ctx.fillStyle = "#EA1010"; //red
                break;
            case redkernelStatus:
                ctx.fillStyle = "#830000"; //red kernel
                break;
            case yellowStatus:
                ctx.fillStyle = "#E7EA10"; //yellow
                break;
            case yellowKernelStatus:
                ctx.fillStyle = "#9FA100"; //yellow kernel
                break;
            case purpleStatus:
                ctx.fillStyle = "#9810EA"; //purple
                break;
            case purpleKernelStatus:
                ctx.fillStyle = "#450083"; //purple kernel
                break;
            case blackStatus:
                ctx.fillStyle = "#5F5F5F"; //black
                break;
            case blackKernelStatus:
                ctx.fillStyle = "#3A3A3A";//black kernel
                break;
            case pinkStatus:
                ctx.fillStyle = "#F110CC"; //pink
                break;
            case pinkKernelStatus:
                ctx.fillStyle = "#A100A1"; //pink kernel
                break;
            default:
                ctx.fillStyle = "#BEBEBE"; //gray
                break;
        }

    }

    function drawBall(x, y, color){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#505050";
        ctx.stroke();
        ctx.closePath();
    }

    function addBall(){
        var newBall = [];
        var dx;
        var dy;

        for(i=0; i<numPlayers; i++){
            directions = getDirection(ballSpeed);
            dx = directions[0];
            dy = directions[1];

            //Give the new ball the data it needs: X, Y, Dx, Dy
            newBall.push(initialPositions[i][0]);
            newBall.push(initialPositions[i][1]);
            newBall.push(dx);
            newBall.push(dy);
            teams[i][0].push(newBall);
            //reset newBall variable
            newBall = [];
        }
        if(numBalls<3){
            numBalls++;
        }
    }

    function collisionDetection(x, y, dx, dy, status, kernelStatus) {
        //Put "dx" and "dy" data in direction variable to return it at the end
        var direction = [];
        direction.push(dx);
        direction.push(dy);

        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                var ballWall;
                //If the status of the current brick is not equal to the status of the ball or the kernel of its team, a collision may occurs
                if(b.status != status && b.status != kernelStatus){
                    ballWall = ballCollides(x, y, b.x, b.y);
                    if(ballWall != 0){
                        b.status = status;
                    }
                    switch(ballWall){
                        //left
                        case 1:
                            if(x-ballRadius <= b.x+brickWidth &&
                                x-ballRadius > b.x+brickWidth-Math.abs(dx)){
                                    direction.splice(0, 1, -dx);
                                } else {
                                    if(dx < 0){
                                        direction.splice(0, 1, -dx);
                                        direction.splice(1, 1, -dy);
                                    } else {
                                        direction.splice(0, 1, dy);
                                        direction.splice(1, 1, dx);
                                    }
                                }
                            break;
                        //right
                        case 2:
                            if(x+ballRadius >= b.x &&
                                x+ballRadius < b.x+dx){
                                    direction.splice(0, 1, -dx);
                                } else {
                                    if(dx > 0){
                                        direction.splice(0, 1, -dx);
                                        direction.splice(1, 1, -dy);
                                    } else {
                                        direction.splice(0, 1, dy);
                                        direction.splice(1, 1, dx);
                                    }
                                }
                            break;
                        //top
                        case 3:
                            if(y+ballRadius >= b.y &&
                                y+ballRadius < b.y+dy){
                                    direction.splice(1, 1, -dy);
                                } else {
                                    if(dy > 0){
                                        direction.splice(0, 1, -dx);
                                        direction.splice(1, 1, -dy);
                                    } else {
                                        direction.splice(0, 1, dy);
                                        direction.splice(1, 1, dx);
                                    }
                                }
                            break;
                        //bottom
                        case 4:
                            if(y-ballRadius <= b.y+brickHeight &&
                                y-ballRadius > b.y+brickHeight-Math.abs(dy)){
                                    direction.splice(1, 1, -dy);
                                } else {
                                    if(dy < 0){
                                        direction.splice(0, 1, -dx);
                                        direction.splice(1, 1, -dy);
                                    } else {
                                        direction.splice(0, 1, dy);
                                        direction.splice(1, 1, dx);
                                    }
                                }
                            break;
                    }
                }
            }
        }
        return direction;
    }

    /*Returns which side of the ball collides with a brick
    Values:
    0 -> no collision
    1 -> left side
    2 -> right side
    3 -> top side
    4 -> bottom side
    */
    function ballCollides(ballX, ballY, brickX, brickY){
        var wall = 0;
        if(ballWallCollision(ballX-ballRadius, ballY, brickX, brickY)){
            wall = 1;
        }
        if(ballWallCollision(ballX+ballRadius, ballY, brickX, brickY)){
            wall = 2;
        }
        if(ballWallCollision(ballX, ballY+ballRadius, brickX, brickY)){
            wall = 3;
        }
        if(ballWallCollision(ballX, ballY-ballRadius, brickX, brickY)){
            wall = 4;
        }
        return wall;
    }

    //Checking if the North - West - South - East coords of the ball collides with a brick
    function ballWallCollision(ballX, ballY, brickX, brickY){
        if(ballX >= brickX &&
            ballX <= brickX+brickWidth &&
            ballY >= brickY &&
            ballY <= brickY+brickHeight){
                return true;
            }
        return false;
    }

    //Checking the collisions of the walls of the canvas
    function topBottomWallCollision(y, dy){
        if(y + dy > canvas.height-ballRadius || y + dy < ballRadius){
            dy = -dy;
        }
        return dy;
    }

    function leftRightWallCollision(x, dx){
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
            dx = -dx;
        }
        return dx;
    }



    //Function to draw the canvas, including the bricks and the balls
    function draw(players){
        //Clear the canvas and redraw the bricks considering their new status
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();

        for(i=players-1; i>=0; i--){
            var direction = [];

            for(j=0; j<numBalls; j++){
                drawBall(teams[i][0][j][0], teams[i][0][j][1], teams[i][2]);

                direction = collisionDetection(
                    teams[i][0][j][0],
                    teams[i][0][j][1],
                    teams[i][0][j][2],
                    teams[i][0][j][3],
                    teams[i][1],
                    teams[i][3]);
                teams[i][0][j][2] = direction[0];
                teams[i][0][j][3] = direction[1];

                teams[i][0][j][3] = topBottomWallCollision(
                    teams[i][0][j][1],
                    teams[i][0][j][3]);

                teams[i][0][j][2] = leftRightWallCollision(
                    teams[i][0][j][0],
                    teams[i][0][j][2]);

                teams[i][0][j][0] += teams[i][0][j][2];
                teams[i][0][j][1] += teams[i][0][j][3];
            }

            if(playerIsEliminated(i)){
                removePlayer(i);
                players--;
            }

        }
    }

    function playerIsEliminated(player){
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == teams[player][3]){
                    return false;
                }
            }
        }
        return true;
    }

    function removePlayer(player){
        teams.splice(player, 1);
        initialPositions.splice(player, 1);
        numPlayers--;
    }

    function resetBallCoords(players){
        for(i=0; i<players; i++){
            teams[i][0].splice(1, numBalls-1);
            teams[i][0][0][0] = initialPositions[i][0];
            teams[i][0][0][1] = initialPositions[i][1];
        }
        numBalls = 1;
    }

    initialBricks();
    initialKernels(numPlayers);
    draw(numPlayers);

    var gameId;
    var ballsInterval;

    playBtn.onclick = function() {
        ballsInterval = setInterval(addBall, ballSpawnRating);
        gameId = setInterval(draw, 10, numPlayers);
        settings.style.display = "none";
    }

    pauseBtn.onclick = function() {
        clearInterval(gameId);
        clearInterval(ballsInterval);
    }

    restartBtn.onclick = function() {
        initialBricks();
        initialKernels(numPlayers);
        clearInterval(gameId);
        clearInterval(ballsInterval);
        resetBallCoords(numPlayers);
        draw(numPlayers);
        settings.style.display = "flex";
    }
});
