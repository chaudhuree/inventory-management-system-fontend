import React from 'react';
// this is for lazy susspense loading
// this component will be used in all pages

const LazyLoader = () => {
    return (
        <div className="LoadingOverlay">
            <div className="Line-Progress">
                <div className="indeterminate"/>
            </div>
        </div>
    );
};
export default LazyLoader;