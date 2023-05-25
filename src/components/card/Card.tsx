import "./Card.css"
import { items } from "../../data/itens"
type Items = {
    item: number | null;
    shown: boolean,
    permanetShown: boolean
  }

type Props = {
    item: Items,
    onClick: () => void
}

export default function Card({ item, onClick }: Props) {

    return (
        <div className={`${item.permanetShown ? "game-card--permanentOppened" : item.shown ? "game-card--oppened" :"game-card"}`} onClick={onClick}>
            {(item.permanetShown || item.shown) && item.item !== null &&
            <img className="game-card-img" src={items[item.item].icon} alt="" /> }
        </div>
    )
}