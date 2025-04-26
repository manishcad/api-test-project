"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import "../app/styles/Home.css"
export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/scraper");
        setNewsData(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error-text">Error: {error}</div>;
  }

  return (
    <div className="news-container">
      {newsData.length === 0 ? (
        <div className="loading-text">Loading...</div>
      ) : (
        newsData.map((item, index) => (
          <div key={index} className="news-card">
            {item.image && (
              <div className="image-wrapper">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="news-image"
                />
              </div>
            )}
            <div className="news-content">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-time">{item.time}</p>
              <a href={item.link} target="_blank" className="read-more">
                Read more →
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
