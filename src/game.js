import Enemy from "./Enemy"
import Smile from "./Smile"
import { keyPress, key } from "./keyboard"
import Hero from "./Hero"
import redCircle from "./geometries/redCirc"

let CTX
let CANVAS
const FRAMES = 60

const qtdEnemies = 5

let enemies = Array.from({length:qtdEnemies});

const smile = new Smile(300, 100, 20, 5, 'yellow')

const hero = new Hero(310,100,20,5,82,89,'img/goblin.png',FRAMES)

let gameover = false
let anime;
let boundaries

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			10, 5, 'green'
		))
	
	keyPress(window)
	loop()
}

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		redCircle(CTX)
		
		smile.move(boundaries, key)
		smile.draw(CTX)

		hero.move(boundaries, key)
		hero.draw(CTX)
		
		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
			 //var = teste?verdadeiro:falso;
			 gameover = !gameover 
			 		? hero.colide(e)
					: true;
		})
		
		if (gameover){
			console.error('DEAD!!!')
			cancelAnimationFrame(anime)
		}else {
			anime = requestAnimationFrame(loop)
		}
	}, 1000 / FRAMES)
}

export { init }