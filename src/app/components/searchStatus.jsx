import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = () => {
        const n = length;
        const classes = "badge bg-";
        if (n === 0) {
            return (
                <span className={`${classes}danger`}>
                    Никто с тобой не тусанёт
                </span>
            );
        } else if (
            n % 10 === 0 ||
            n % 10 === 1 ||
            (n % 10 >= 5 && n % 10 <= 9) ||
            (n >= 12 && n <= 14)
        ) {
            return (
                <span
                    className={`${classes}primary`}
                >{`${n} человек тусанёт с тобой сегодня`}</span>
            );
        } else {
            return (
                <span
                    className={`${classes}primary`}
                >{`${n} человека тусанут с тобой сегодня`}</span>
            );
        }
    };

    return <h2>{renderPhrase()}</h2>;
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
