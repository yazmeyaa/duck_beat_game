import { Game } from '@duck_beat/game-core'
import { platforms } from '@duck_beat/game-core/engine';
import { scenes } from '@duck_beat/game-core/game'
import { useEffect, useRef, type FC } from 'react';
import { resources } from '@duck_beat/game-core/engine';


const GameElement: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null)

  useEffect(() => {
    if (!canvasRef.current) return;
    const game = platforms.createWebEngine({
      targetElement: canvasRef.current
    })
    game.resources.registerList([
      { key: "note", type: resources.ResourceType.Texture, path: "https://picsum.photos/536/354" },
      { key: "background", type: resources.ResourceType.Texture, path: "https://picsum.photos/536/354" },
    ])

    game.init().then(() => {
      game.resources.loadAll().then(() => {
        game.scenes.register('play-track', () => new scenes.playTrack.PlayTrackScene())
        game.scenes.switchTo('play-track').then(() => {
          let last = Date.now();
          setInterval(() => {
            const now = Date.now();
            const dt = (now - last) / 1000;
            game.update(dt)
            last = now;
          }, 16);
        })
      })
    })

    gameRef.current = game;
  }, [])

  const handleButtonClick = async () => {
    if (!gameRef.current) return;
    canvasRef.current?.focus()

    const game = gameRef.current;
    await game.audio.bg.load('https://sound-effects-media.bbcrewind.co.uk/mp3/07011205.mp3')
    await game.audio.init()

    game.audio.bg.play()
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
