import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UsersTable = ({ users, onDelete, onToggleBookMark, onSort }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th onClick={() => onSort("profession.name")} scope="col">Профессия</th>
                    <th onClick={() => onSort("completedMeetings")} scope="col">Встретился, раз</th>
                    <th onClick={() => onSort("rate")} scope="col">Оценка</th>
                    <th onClick={() => onSort("bookmark")} scope="col">Избранное</th>
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
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};
export default UsersTable;
