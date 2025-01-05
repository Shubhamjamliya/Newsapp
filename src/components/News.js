import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capiltalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&category=${props.category}&country=${props.country}&language=en`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // setArticles(parsedData.articles)
    setArticles(parsedData.results)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `SpeedNews-${capiltalizeFirstLetter(props.category)}`;
    updateNews();
    //eslint-disable-next-line
  }, [])


  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

    const url = `https://newsdata.io/api/1/latest?apikey=pub_643900e731aced8a39fcc1896a050fae54604 `;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.results))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };


  return (
    <>
      <h1 className='text-center' style={{ margin: '40px 0px', marginTop: '90px' }}>SpeedNews-Top {capiltalizeFirstLetter(props.category)}  Headlines</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >

        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-3" key={element.article_id}>
                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.image_url ? element.image_url : "https://www.informalnewz.com/wp-content/uploads/2022/08/3RD-1024x825-1-300x242-1.png"} newsUrl={element.link} author={!element.creator ? "unknown" : element.creator} date={element.pubDate} source={element.source_name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>


  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News