'use client'

import { CSS_ACTIVIST_CLASSES } from '@/src/shared/empowerCss';
import { lazy } from 'react';

const ReactMarkdown = lazy(() => import('react-markdown'));

export function IntroQuote(props: { text: string, updated: string, ipab: number }) {

    const myCss = CSS_ACTIVIST_CLASSES(props.ipab);

    return (
        <div className="border shadow-md bg-white p-4 px-6 ">
            <ReactMarkdown
                components={{
                    a: ({ children, href }) => (
                        <a href={href} className={myCss.linkNormal}>
                            {children}
                        </a>
                    ),
                }}
            >
                {props.text}
            </ReactMarkdown>
            <p className={myCss.textFaded}>{props.updated}</p>
        </div>
    );
}