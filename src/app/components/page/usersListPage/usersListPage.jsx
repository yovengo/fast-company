import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import SearchLine from "../../ui/searchLine";
import _ from "lodash";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchLineValue, setSearchLineValue] = useState("");
    const pageSize = 8;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
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

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    });
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSearchLineValue("");
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchLineChange = ({ target }) => {
        setSelectedProf(undefined);
        setSearchLineValue(target.value);
    };

    const searchLineRegExp = new RegExp(`${searchLineValue.toLowerCase()}`, "g");

    if (users) {
        const filteredUsers = searchLineValue
            ? users.filter((user) => String(user.name).toLowerCase().match(searchLineRegExp))
            : selectedProf
                ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count}/>
                    <SearchLine search={searchLineValue} onChange={handleSearchLineChange}/>
                    {count > 0 && (
                        <UsersTable onToggleBookMark={handleToggleBookMark} onDelete={handleDelete} onSort={handleSort} selectedSort={sortBy} users={userCrop}/>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};
export default UsersListPage;
