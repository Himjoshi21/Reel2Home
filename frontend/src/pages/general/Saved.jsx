import React, { useEffect, useState } from 'react';
import '../../styles/reels.css';
import apiClient from '../../api/axiosClient';
import ReelFeed from '../../components/ReelFeed';

const Saved = () => {
    const [ videos, setVideos ] = useState([]);
    const [ error, setError ] = useState('');

    useEffect(() => {
        apiClient.get('/api/food/save')
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }));
                setVideos(savedFoods);
            })
            .catch(() => {
                setError('Unable to load saved videos.');
            });
    }, []);

    const removeSaved = async (item) => {
        try {
            await apiClient.post('/api/food/save', { foodId: item._id });
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v));
        } catch {
            setError('Unable to remove saved video.');
        }
    }

    return (
        <>
            {error && <div className="page-error" role="alert">{error}</div>}
            <ReelFeed
                items={videos}
                onSave={removeSaved}
                emptyMessage="No saved videos yet."
            />
        </>
    );
}

export default Saved
