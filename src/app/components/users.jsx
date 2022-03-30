import React, {useState} from "react";
import User from "./user";
import {logDOM} from "@testing-library/react";

const Users = (props) => {
    const {users, onDelete} = props

    return (
        <>
            {users.length > 0 && (<table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => <User key={user._id} user={user} onDelete={onDelete}/>)}
                </tbody>
            </table>)}
        </>
    )
}
export default Users