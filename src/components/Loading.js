import React, { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-container">
            <div className="loading-text">Loading Members... {progress}%</div>
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Loading; 