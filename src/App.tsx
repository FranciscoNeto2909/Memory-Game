import { useEffect, useState } from 'react'
import "./App.css"
import Card from './components/card/Card'
import { items } from './data/itens'
import Info from './components/info/Info'

type Items = {
  item: number | null;
  shown: boolean,
  permanetShown: boolean
}


function App() {
  const [sec, setSec] = useState<number>(0)
  const [min, setMin] = useState<number>(0)
  const [start, setStart] = useState<boolean>(false)
  const [move, setmove] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<Items[]>([])
  const [win, setWin] = useState<boolean>(false)

  function handleCreateGrid() {
    setWin(false);
    setMin(0);
    setSec(0);
    setmove(0);
    setShownCount(0);
    setGridItems([]);

    const grid: Items[] = [];

    for (let i = 0; i < (items.length * 2); i++) {
      grid.push({
        item: null,
        shown: false,
        permanetShown: false
      })
    }

    for (let g = 0; g < 2; g++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        while (pos < 0 || grid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        grid[pos].item = i
      }
    }

    setGridItems(grid)
  }

  function handleStartGame() {
    setStart(true)
  }

  function handleItemClick(i: number) {
    if (start && i !== null && shownCount < 2) {
      setmove(move + 1)
      const grid = [...gridItems];
      if (grid[i].permanetShown === false && grid[i].shown === false)
        grid[i].shown = true;
      setShownCount(shownCount + 1)
      setGridItems(grid);
    }
  }

  useEffect(() => {
    if (!win) {
      const timer = setTimeout(() => {
        start && setSec(sec + 1)
        if (sec === 60) {
          setSec(0);
          setMin(min + 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [sec, start, min, win])

  useEffect(() => {
    handleCreateGrid()
  }, [start])

  useEffect(() => {
    if (shownCount === 2) {
      const openeds = gridItems.filter(i => i.shown === true);
      const grid = [...gridItems]

      if (openeds[0].item === openeds[1].item) {
        for (const i in grid) {
          if (grid[i].shown) {
            grid[i].permanetShown = true;
            grid[i].shown = false;
          }
        }
        setGridItems(grid);
        setShownCount(0);
      } else {
        setTimeout(() => {
          for (const i in grid) {
            if (grid[i].shown) {
              grid[i].shown = false;
            }
          }
          setGridItems(grid);
          setShownCount(0);
        }, 1000);
      }
    }
  }, [shownCount, gridItems])

  useEffect(() => {
    const openeds = gridItems.filter(i => i.permanetShown === true);
    if (openeds.length > 0 && openeds.length == gridItems.length) {
      setWin(true);
    }
  }, [gridItems, start, min, sec])

  return (
    <div className='game'>
      <Info sec={sec} min={min} handleStartGame={handleStartGame} handleRestart={handleCreateGrid} move={move} />
      <div className='game-container'>
        {gridItems.map((item, i) => (
          <Card key={i} item={item} onClick={() => handleItemClick(i)} />
        ))}
      </div>
      {win === true &&
        <div className='game-win'>
          <h2>Parabens você ganhou</h2>
        </div>}
    </div>
  )
}

export default App
