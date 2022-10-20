import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getSearchProductsThunk } from '../../store/search';
import './Searchbar.css'

function Searchbar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [showSearches, setShowSearches] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;

        const fetchData = async (search) => {
            const data = await fetch('/api/search/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search })
            })
            const dataJson = await data.json()
            if (isSubscribed) {
                setSearchResults(dataJson.products)
            }
        };

        fetchData(search)
        // if (search) {
        //     setShowSearches(true)
        // }
        // else {
        //     setShowSearches(false)
        // }

        return () => isSubscribed = false;
    }, [search])

    const submitSearch = async (e) => {
        e.preventDefault();
        if (search === '') return;
        if (isEmptyObject(searchResults)) return;
        const searchButton = await dispatch(getSearchProductsThunk(search))
        if (searchButton) {
            history.push(`/search/?searchbar=${search}`)
        }
        setSearch('')
    }

    const isEmptyObject = (obj) => {
        return JSON.stringify(obj) === '{}';
    }

    return (
        <>
            <form className='search-form'>
                <div className='search-div'>
                    <input className='search-input'
                        name='searchbar'
                        placeholder='Search for anything'
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <button className='search-button' onClick={submitSearch}><i className='fa-solid fa-magnifying-glass'></i></button>
                </div>
            </form>
            {search && searchResults && searchResults.length > 0 && (
                <ul className='search-results-container'>
                    {searchResults.map(result => (
                        <li className='search-results-line' key={result.id}>
                            <NavLink to={`/products/${result.id}`} className='result-link' onClick={() => setSearch('')}><p className='result-p'>{result.name}</p></NavLink>
                        </li>
                    ))}
                </ul>
            )}
            {search && isEmptyObject(searchResults) && search.length > 0 && (
                <ul className='search-results-container'>
                    <li className='search-results-line-none'>No results found</li>
                </ul>
            )}
        </>
    )
}

export default Searchbar;
