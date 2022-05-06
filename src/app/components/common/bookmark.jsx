import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggleBookMark, id, status }) => {
    const getBookMarkClasses = () => {
        let classes = "bi ";
        classes += status ? "bi-bookmark-fill" : "bi-bookmark";
        return classes;
    };

    return (
        <button
            className={getBookMarkClasses()}
            onClick={() => {
                onToggleBookMark(id);
            }}
        />
    );
};
BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired,
    id: PropTypes.string,
    status: PropTypes.bool
};
export default BookMark;
