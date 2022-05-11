import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";

const UsersTable = ({ users, onDelete, onToggleBookMark, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя", component: (user) => (<Link to={`/users/${user._id}`}>{user.name}</Link>) },
        qualities: { name: "Качества", component: (user) => (<Qualities qualities={user.qualities}/>) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    id={user._id}
                    status={user.bookmark}
                    onToggleBookMark={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger">delete
                </button>
            )
        }
    };

    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    handleSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
