import Tippy from '@tippyjs/react/headless';
import React from 'react';

interface HeadlessTippyProps {
    children: React.ReactElement;
    content: React.ReactNode;
}

const HeadlessTippy: React.FC<HeadlessTippyProps> = ({ children, content }) => {
    return (
        <Tippy
            interactive
            placement='bottom'
            trigger='click'
            render={(attributes) => (
                <div tabIndex={-1} {...attributes} className='shadow-overflow rounded-md border bg-white px-4 py-2'>
                    {content}
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default HeadlessTippy;
