import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    // crear pala como rectangulo
    this.paddle = this.add.rectangle(400, 500, 100, 20, 0x6666ff);

    // crear bola como circulo
    this.ball = this.add.circle(400, 300, 10, 0xff6666);

    //crear obstaculo
    this.obstacle = this.add.rectangle(400, 200, 100, 100, 0x66ff66);

    //agregarlos a las fisicas
    this.physics.add.existing(this.paddle);
    this.physics.add.existing(this.ball);
    this.physics.add.existing(this.obstacle);

    //hacer la paleta inamovible
    this.paddle.body.setImmovable(true);

    //agregar configuraciones de fisicas a la paleta
    this.paddle.body.setCollideWorldBounds(true);

    //agregar configuracion de fisicas a la pelota
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(200, 200);

    //agregar configuracion de fisicas al obstaculo
    this.obstacle.body.setImmovable(true);

    //agregar cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    //colision de la pelota con la paleta
    this.physics.add.collider(this.paddle, this.ball, null, null, this);

    //colision de la pelota con el obstaculo
    this.physics.add.collider(
      this.obstacle,
      this.ball,
      this.handleCollision,
      null,
      this
    );
  }

  update() {
    if (this.cursor.right.isDown) {
      this.paddle.x += 10;
    } else if (this.cursor.left.isDown) {
      this.paddle.x -= 10;
    }
  }

  handleCollision = (obstacle, ball) => {
    console.log("collision");
    obstacle.destroy();
  };
}
