import React, { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import '../../styles/reels.css';
import ReelFeed from '../../components/ReelFeed';

const Home = () => {
    const [ videos, setVideos ] = useState([]);
    const [ error, setError ] = useState('');
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        apiClient.get('/api/food')
            .then(response => {
                setVideos(response.data.foodItems);
            })
            .catch(() => {
                setError('Unable to load reels. Please try again.');
            });
    }, []);

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {
        try {
            const response = await apiClient.post('/api/food/like', { foodId: item._id });
            const increment = response.data.like ? 1 : -1;
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + increment } : v));
        } catch {
            setError('Unable to update like state.');
        }
    }

    async function saveVideo(item) {
        try {
            const response = await apiClient.post('/api/food/save', { foodId: item._id });
            const increment = response.data.save ? 1 : -1;
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount ?? 0) + increment } : v));
        } catch {
            setError('Unable to update save state.');
        }
    }

    return (
        <>
            {error && <div className="page-error" role="alert">{error}</div>}
            <ReelFeed
                items={videos}
                onLike={likeVideo}
                onSave={saveVideo}
                emptyMessage="No videos available."
            />
        </>
    );
}

export default Home