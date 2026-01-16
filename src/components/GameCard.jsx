import { Link } from "react-router-dom"

function GameCard({ 
    cn, link_to, 
    default_src, hover_src, 
    alt_name, hoveredCard, 
    setHoveredCard, setBackground 
}) {

    const isActive = hoveredCard === cn; // for card hovered on
    const isDimmed = hoveredCard && hoveredCard !== cn; // for card not hovered on while other card is hovered on
    
    const imgSrc = isActive ? hover_src : default_src; // to change card image on hover

    return <div
        className={`${cn} ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
        onMouseEnter={() => {
            setHoveredCard(cn);
            setBackground(true);
        }}
        onMouseLeave={() => {
            setHoveredCard(null);
            setBackground(false);
        }}
        onClick={() => {
            setHoveredCard(null);
            setBackground(false);
        }}
    >
        <Link to={link_to}>
            <img src={imgSrc} alt={alt_name} />
        </Link>
    </div>
}

export default GameCard