import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function NewsPage() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    function getNews() {
        axios.get('/api/getNews').then(res => {
            setNews(res.data);
            console.log(res.data);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            {news ? 'yes there\'s data. check the console.' : 'No news yet'}
        </div>
    )
}

// the routes and controller are read for other news crud
// when adding news, date needs to be in this format:
// now= current_timestamp
// something else= '2021-07-09 08:08:08'