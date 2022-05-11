import React from "react";
import PropTypes from "prop-types";

const SearchLine = ({ search, onChange }) => {
    return (
        <form>
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Search..."
                value={search}
                onChange={onChange}
                className="w-100"
            />
        </form>
    );
};
SearchLine.propTypes = {
    search: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
export default SearchLine;
