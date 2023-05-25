type Props = {
    sec:number,
    min:number,
    move:number,
    handleRestart: () => void,
    handleStartGame: () => void,
}

export default function Info({ sec, min, handleRestart, handleStartGame, move }: Props) {
    return (
        <div className='game-info'>
            <h1 className='game-title'>Memory Game</h1>
            <h4>Tempo:
                <span className="game-nums">{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}</span>
            </h4>
            <h4>Movimentos:
                <span className="game-nums">{move}</span>
            </h4>
            <div className="game-buttons">
                <button className='game-button' onClick={() => handleStartGame()}>Iniciar</button>
                <button className='game-button' onClick={() => handleRestart()}>Reiniciar</button>
            </div>
        </div>
    )
}