import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({user, onDelete, onToggleBookMark}) => {
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>{user.qualities.map((quality) => (
                    <Qualitie key={quality._id} color={quality.color} name={quality.name}/>
                ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td><BookMark onToggleBookMark={onToggleBookMark} id={user._id} status={user.bookmark}/></td>
                <td>
                    <button className="btn btn-danger" onClick={() => {
                        onDelete(user._id)
                    }}>delete
                    </button>
                </td>
            </tr>
        </>
    )
}
export default User