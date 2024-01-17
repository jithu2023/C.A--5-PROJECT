import React from 'react';

function Details({ select, onBack }) {
    return (
        <div className='bg-gradient-to-r from-purple-900 to-black min-h-screen flex flex-col items-center justify-center'>
            <button onClick={onBack} className=' goback text-red-500 ml-10 text-lg font-semibold mt-4'>
                Back to Books
            </button>
            <div className='h-80 flex justify-center items-center mt-4'>
                <div>
                    <img
                        src={select.imageLinks.thumbnail}
                        alt={select.title}
                        className='h-72 w-52 rounded-md shadow-lg'
                    />
                </div>
                <div className='container overflow-hidden flex flex-col justify-center ml-10 w-2/5 bg-white bg-opacity-80 shadow-lg p-8 rounded-md'>
                    <h1 className='text-2xl font-semibold text-3xl text-gray-800 mb-4'>
                        Category: {select.categories}, Title: {select.title}
                    </h1>
                    <p className='text-lg'>Subtitle: {select.subtitle || '-'}</p>
                    <p className='text-lg text-gray-700 mt-2'>Author: {select.authors.join(', ')}</p>
                    <div className='flex items-center text-center text-gray-500 mt-2'>
                        <div className='justify-center items-center'>Rating: {select.averageRating || '-'}</div>
                        <div className='text-sm ml-4'>⭐ Free</div>
                    </div>
                    <div className='overflow-y-auto max-h-36 mt-4'>
                        <p className='text-sm'>{select.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
