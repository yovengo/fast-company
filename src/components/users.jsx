import React, {useState} from "react";
import api from "../api";
import {logDOM} from "@testing-library/react";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers((prevState) => {
            return prevState.filter((user) => user._id !== userId)
        })
    }

    const renderPhrase = () => {
        let n = users.length
        let classes = 'badge bg-'
        if (n === 0) {
            return <span className={`${classes}danger`}>Никто с тобой не тусанёт</span>
        } else if (n % 10 === 0 || n % 10 === 1 || (n % 10 >= 5 && n % 10 <= 9) || (n >= 12 && n <= 14)) {
            return <span className={`${classes}primary`}>{`${n} человек тусанёт с тобой сегодня`}</span>
        } else {
            return <span className={`${classes}primary`}>{`${n} человека тусанут с тобой сегодня`}</span>
        }
    }

    return (
        <>
            <h2>
                {renderPhrase()}
            </h2>
            <table className="table">
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
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.qualities.map((quality) => (
                            <span key={quality._id} className={`badge mx-1 bg-${quality.color}`}>{quality.name}</span>
                        ))}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}/5</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => {
                                handleDelete(user._id)
                            }}>delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}
export default Users