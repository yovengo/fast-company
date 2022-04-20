import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({ users, onDelete, onToggleBookMark, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities}/>) },
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
