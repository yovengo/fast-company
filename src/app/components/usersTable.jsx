import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";

const UsersTable = ({ users, onDelete, onToggleBookMark, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
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
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
            {/* <tbody> */}
            {/*    {users.map((user) => ( */}
            {/*        <User */}
            {/*            key={user._id} */}
            {/*            user={user} */}
            {/*            onDelete={onDelete} */}
            {/*            onToggleBookMark={onToggleBookMark} */}
            {/*        /> */}
            {/*    ))} */}
            {/* </tbody> */}
        </table>
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
