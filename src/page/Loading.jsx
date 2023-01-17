import React from 'react';

const Loading = () => {
    return (
        <div className='overlay'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loading;