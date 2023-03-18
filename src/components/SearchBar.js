import {useState} from 'react';
const SearchBar =() =>{
const [searchTerm, setSearchTerm] = useState('')
const [fullSearch, setFullSearch] = useState('')

const postMatches = (post, text) => {
    if (post.title.inclues(text)){
        return true
    }
}

const filteredPosts = posts.filter(post => postMatches(post, fullSearch));
const postsToDisplay = fullSearch.length ? filteredPosts : posts;
}

export default SearchBar;
