import React from "react";

const BookMark = ({onToggleBookMark, id, status}) => {
    const getBookMarkClasses = () => {
        let classes = 'bi '
        classes += status ? "bi-bookmark-fill" : "bi-bookmark"
        return classes
    }

    return (
        <button className={getBookMarkClasses()} onClick={() => {
            onToggleBookMark(id)
        }}/>
    )
}
export default BookMark