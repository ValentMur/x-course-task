import { useState } from "react";

import './filterPanel.scss';
import searchIcon from '../../assets/img/search_icon.svg';

const FilterPanel = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('all');

    const onValueChange = (e) => {
        const changedValue = e.target.value.trim();
        if (e.target.tagName === 'INPUT') {
            setSearchValue(changedValue);
            props.onUpdateFilterOrSearch('search', changedValue);
        } else {
            setFilterValue(changedValue);
            props.onUpdateFilterOrSearch('filter', changedValue);
        }
    }

    return(
        <div className="filter-panel">
            <img src={searchIcon} className="filter-panel__icon" alt="magnifying glass"/>
            <input type="text"
                className="filter-panel__search fs16"
                placeholder="Search by book name"
                maxLength="20"
                onChange={onValueChange}
                value={searchValue} />
            <select className="filter-panel__sort fs16"
                    value={filterValue} 
                    onChange={onValueChange}>
                <option value="all">All</option>
                <option value="0-p-15">0 &lt; Price &lt; 15</option>
                <option value="15-p-30">15 &lt; Price &lt; 30</option>
                <option value="p-30">Price &gt; 30</option>
            </select>
        </div>
    )
}

export default FilterPanel;