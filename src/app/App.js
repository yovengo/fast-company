import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState();
    console.log(users);
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    });

    const handleDelete = (userId) => {
        setUsers((prevState) => {
            return prevState.filter((user) => user._id !== userId);
        });
    };

    const handleToggleBookMark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </>
    );
};
export default App;
