// src/SearchMovies.tsx

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

type SearchMoviesProps = {
    handleSearch: (searchTerm: string) => Promise<void>;
    searchMessage: string;
};

const SearchMovies: React.FC<SearchMoviesProps> = ({ handleSearch, searchMessage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        setLoading(true);
        const handleInputChange = (value: string) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {

                handleSearch(value).finally(() => {
                    setLoading(false);
                });


            }, 500);
        };

        handleInputChange(searchTerm);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);

    return (
        <div className='flex flex-col justify-center items-center p-8 w-2/5'>
            <div className='flex justify-center items-center w-full relative'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border border-gray-400 p-2 w-full rounded-3xl'
                />

                {loading && (
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2">

                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white-900"></div>
                    </div>
                )}

            </div>
            <br />
            <p className='ml-4'>{searchMessage}</p>
        </div>
    );
};

export default SearchMovies;
