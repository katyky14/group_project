import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Searchbar.css'

function Searchbar() {
    const [search, setSearch] = useState('');
    const [showSearches, setShowSearches] = useState(false);
    const dispatch = useDispatch();

    const submitSearch = async (e) => {
        e.preventDefault();
    }

    return (
        <form className='search-form'>
            <div className='search-div'>
                <input className='search-input'
                    name='searchbar'
                    placeholder='Search for anything'
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
                <button className='search-button'></button>
            </div>
        </form>

    )
}

export default Searchbar;
