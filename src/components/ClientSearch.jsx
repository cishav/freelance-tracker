import { useState } from "react";

function ClientSearch({ onSearch }){

    const [searchValue, setSearchValue] = useState('');
    const [selectStatus, setSelectStatus] = useState('All');
    const [sortOrder, setSortOrder] = useState('Oldest First');

    function handleNameChange(e){
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value, selectStatus, sortOrder);
    }

    function handleStatusChange(e){
        const value = e.target.value;
        setSelectStatus(value);
        onSearch(searchValue, value, sortOrder);
    }

    function handleSortOrderChange(e){
        const value = e.target.value;
        setSortOrder(value);
        onSearch(searchValue, selectStatus, value);
    }

    return (
        <div className="client-search">
            <input type="text" value={searchValue} onChange={handleNameChange}/>
            <select value={selectStatus} onChange={handleStatusChange}>
                <option value="All">All</option>
                <option value="In Progress">In Progress</option>
                <option value="Paid">Paid</option>
                <option value="Inactive">Inactive</option>
            </select>
            <select value={sortOrder} onChange={handleSortOrderChange}>
                <option value="Oldest First">Oldest First</option>
                <option value="Newest First">Newest First</option>
                <option value="Name (A-Z)">Name (A-Z)</option>
                <option value="Name (Z-A)">Name (Z-A)</option>
            </select>
        </div>
    )
}

export default ClientSearch;