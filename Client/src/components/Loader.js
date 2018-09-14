import React from 'react';

const Loader = () => (
    <div className="lds-ripple"><div></div><div></div></div>
);

export const LoaderWithOverlay = () => (
    <div>
        <div className="lds-ripple lds-ripple-light"><div></div><div></div></div>
        <div id="overlay"></div>
    </div>
);

export default Loader;
