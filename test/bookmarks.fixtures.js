function makeBookmarks() {
    return [ 
        {   
            id: 1,
            title: 'first bookmark',
            description: 'some description for testing',
            url: 'https://test.com',
            rating: 2
        },
        {
            id: 2,
            title: 'second bookmark',
            description: 'some description for testing',
            url: 'https://test.com',
            rating: 5
        },
        {
            id: 3,
            title: 'third bookmark',
            description: 'more description for testing',
            url: 'https://test.com',
            rating: 3
        }

    ]
}

module.exports = makeBookmarks