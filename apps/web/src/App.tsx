import { Game } from '@duck_beat/game-core'
import { platforms, scenes } from '@duck_beat/game-core/engine';
import { events } from '@duck_beat/game-core/core';
import { type GameEvents } from '@duck_beat/game-core/game'
import { useEffect, useRef, type FC } from 'react';


const GameElement: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null)

  useEffect(() => {
    if (!canvasRef.current) return;
    const webEngine = platforms.createWebEngine({
      targetElement: canvasRef.current
    })

    const manager = new scenes.PixiSceneManager();
    const game = new Game({
      engine: webEngine,
      events: new events.EventManager<GameEvents>(),
      scenes: manager
    })

    canvasRef.current.focus();

    gameRef.current?.engine.input.keyboard.on('down', (key) => {
      console.log(`Pressed key: ${key}`);
    })

    gameRef.current = game;
  }, [])

  const handleButtonClick = async () => {
    if (!gameRef.current) return;
    canvasRef.current?.focus()

    const game = gameRef.current;
    await game.engine.audio.bg.load('https://sound-effects-media.bbcrewind.co.uk/mp3/07011205.mp3')
    await game.engine.audio.init()

    game.engine.audio.bg.play()
  }

  return (
    <div>
      <h1>My game engine!!</h1>
      <canvas style={{ border: "1px solid red" }} ref={canvasRef} onClick={handleButtonClick}>
        Enable JS to run app!
      </canvas>
    </div>
  );
}


function App() {
  return (
    <div>
      <GameElement />
    </div>
  )
}

export default App
