import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UsersTable = ({ users, onDelete, onToggleBookMark }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"/>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onDelete={onDelete}
                        onToggleBookMark={onToggleBookMark}
                    />
                ))}
            </tbody>
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default UsersTable;
