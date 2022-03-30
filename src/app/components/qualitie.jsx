import React from "react";

const Qualitie = ({color, name}) => {
    return (
        <span color={color} className={`badge mx-1 bg-${color}`}>{name}</span>
    )
}
export default Qualitie