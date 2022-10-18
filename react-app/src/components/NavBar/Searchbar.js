import {useState} from 'react';
import {useDispatch} from 'react-redux';

function Searchbar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const submitSearch = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='search-div'>
            <form className='search-form'>
                <input className='search-input'
                name='searchbar'
                placeholder='Search for anything'
                type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ></input>
                <button className='search-button'></button>
            </form>
        </div>
    )
}

export default Searchbar;
