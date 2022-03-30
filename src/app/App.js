import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => {
            return prevState.filter((user) => user._id !== userId)
        })
    }
    const handleToggleBookMark = (id) => {

    }

    return (
        <>
            <SearchStatus length={users.length}/>
            <Users users={users} onDelete={handleDelete}/>
        </>
    )
}
export default App