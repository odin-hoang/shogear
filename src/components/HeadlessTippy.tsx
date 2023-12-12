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
            render={(attributes) => (
                <div tabIndex={-1} {...attributes}>
                    {content}
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default HeadlessTippy;
