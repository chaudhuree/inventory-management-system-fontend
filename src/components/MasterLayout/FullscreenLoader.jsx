import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
const FullscreenLoader = () => {
    const settings = useSelector((state) => state.settings.loader)
    // settings will contain d-none or empty string
    // by default it is d-none in the store so it is hidden
    // when show loader is called in the store the value will be empty string
    // when hide loader is called then it will be d-none
    return (
        <Fragment>
            <div className={settings + " LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate" />
                </div>
            </div>
        </Fragment>
    );
};
export default FullscreenLoader;