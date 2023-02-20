import { useState } from "react";

import BookList from "../bookList/BookList";
import FilterPanel from "../filterPanel/FilterPanel";

const BookListPage = () => {
    const [searchValue, setSearchValue] = useState("");
	const [filterValue, setFilterValue] = useState("");

    const onUpdateFilterOrSearch = (valueName, changedValue) => {
		valueName === 'filter' ? setFilterValue(changedValue) : setSearchValue(changedValue);
	}

    return (
        <>
            <FilterPanel onUpdateFilterOrSearch={onUpdateFilterOrSearch}/>
            <BookList searchValue={searchValue} filterValue={filterValue}/>
        </>
    )
}

export default BookListPage;