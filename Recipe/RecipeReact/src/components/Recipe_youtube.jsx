import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import API_KEY from './API_KEY';
function Recipe_youtube(props){
    const [title, setTitle] = useState(props.value.title);
    //api key
    // const apiKey = 'AIzaSyBi_udQ-Ji3SEDzWjt2TPND9wwY-PUU9Q0';
    // //채널아이디
    // // const channelId = '[가져오고싶은 유튜브 채널 아이디 !!! ]';
    // // Channel
    // const channels = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=snippet,contentDetails,statistics`;
    // const iframeProps = {
    //     id: "ytplayer",
    //     type: "text/html",
    //     width: "720",
    //     height: "405",
    //     // src: "https://www.youtube.com/embed/XV0lSvr0huU",
    //     src: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=react&type=video&key=XV0lSvr0huU",
    //     frameborder: "0",
    //     allowfullscreen: "allowfullscreen",
    //   };
    const [videoIds, setVideoIds] = useState([]);
    useEffect(() => {
        // YouTube Data API로 '김치찌개' 관련 동영상 검색
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search`,
                    {
                        params: {
                            // AIzaSyB32-GzATIsFXZk3CvOCFumvqxYmKairp0
                            key: API_KEY,
                            q: `${title} 레시피`,
                            part: 'snippet',
                            type: 'video',
                            maxResults: 4,
                            order: 'date' 
                        },
                    }
                );
                // 검색 결과에서 videoId 추출
                const ids = response.data.items.map(item => item.id.videoId);
                setVideoIds(ids);
                // console.log(response.params.q)
                console.log(props)
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        if (title) {fetchVideos();}
    }, [title]);
    const opts = {
        height: '167.625',
        width: '298',
        playerVars: {
            autoplay: 0,
        },
    };
    return (
        <>
            <h4 className='Recipe_youtube_title'>관련 영상도 감상해 보세요</h4>
            <ul className='Recipe_youtube_list'>
                {videoIds.map(videoId => (
                    <li key={videoId}>
                        <YouTube className='iframe_area' videoId={videoId} opts={opts} allowFullScreen/>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Recipe_youtube;
