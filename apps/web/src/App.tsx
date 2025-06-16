import { Game } from '@duck_beat/game-core'
import { platforms, scenes } from '@duck_beat/game-core/engine';
import { events } from '@duck_beat/game-core/core';
import { type GameEvents } from '@duck_beat/game-core/game'


const webEngine = platforms.createWebEngine()

const manager = new scenes.PixiSceneManager();
const game = new Game({
  engine: webEngine,
  events: new events.EventManager<GameEvents>(),
  scenes: manager
})



function App() {
  const handleButtonClick = async () => {
    await game.engine.audio.bg.load('https://sound-effects-media.bbcrewind.co.uk/mp3/07011205.mp3')
    await game.engine.audio.init()

    game.engine.audio.bg.play()
  }
  return (
    <div>
      <button onClick={handleButtonClick}>
        CLICK ME
      </button>
      <span>123</span>
    </div>
  )
}

export default App
