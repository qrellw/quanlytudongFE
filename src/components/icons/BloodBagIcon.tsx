import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BloodBagSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <mask id="blood-bag-mask-unique">
                <rect width="24" height="24" fill="white" />
                {/* Mask out the front drop shape plus a bit of border */}
                <path d="M10 2C10 2 3 10 3 14C3 18 6 21 10 21C14 21 17 18 17 14C17 10 10 2 10 2Z" fill="black" stroke="black" strokeWidth="4" />
            </mask>
        </defs>

        {/* Secondary Drop (Behind) - applied mask */}
        <g mask="url(#blood-bag-mask-unique)">
            <path d="M16 6C16 6 21 11 21 15C21 18.3 18.3 21 15 21C11.7 21 9 18.3 9 15C9 11 16 6 16 6Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Main Drop (Front) */}
        <path d="M10 2C10 2 3 10 3 14C3 18 6 21 10 21C14 21 17 18 17 14C17 10 10 2 10 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Inner Circle and Cross */}
        <circle cx="10" cy="14" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 12V16M8 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const BloodBagIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={BloodBagSvg} {...props} />
);
