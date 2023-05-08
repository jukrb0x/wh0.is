import { Router } from 'next/router';
import NP from 'nprogress';
import { ReactElement, useEffect, useState } from 'react';

export interface NProgressProps {
    delayMs?: number;
    showSpinner?: boolean;
    color?: string;
}

// client-only code
function isValidColor(strColor: string) {
    if (!strColor) return false;
    const s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
}

/**
 * NProgress component
 */
export default function NProgress({
    delayMs = 0,
    showSpinner,
    color
}: NProgressProps): ReactElement {
    useEffect(() => {
        let timer: NodeJS.Timeout;
        const handleRouteStart = () => {
            console.log('np handled');
            clearTimeout(timer);
            timer = setTimeout(() => {
                console.log('np start.');
                NP.start();
            }, delayMs);
        };
        const handleRouteDone = () => {
            console.log('np done');
            clearTimeout(timer);
            NP.done();
        };

        Router.events.on('routeChangeStart', handleRouteStart);
        Router.events.on('routeChangeComplete', handleRouteDone);
        Router.events.on('routeChangeError', handleRouteDone);

        return () => {
            Router.events.off('routeChangeStart', handleRouteStart);
            Router.events.off('routeChangeComplete', handleRouteDone);
            Router.events.off('routeChangeError', handleRouteDone);
        };
    }, [delayMs]);

    const colorStyle = isValidColor(color!) ? color : '#29d';
    return (
        <>
            <style jsx global>
                {`
                    //  Original stylesheet: import "nprogress/nprogress.css";

                    /* Make clicks pass-through */
                    #nprogress {
                        pointer-events: none;
                    }

                    #nprogress .bar {
                        background: ${colorStyle};
                        opacity: 0.75;

                        position: fixed;
                        z-index: 1031;
                        top: 0;
                        left: 0;

                        width: 100%;
                        height: 2px;
                    }

                    /* Fancy blur effect */
                    #nprogress .peg {
                        display: block;
                        position: absolute;
                        right: 0px;
                        width: 100px;
                        height: 100%;
                        box-shadow: 0 0 10px ${colorStyle}, 0 0 5px ${colorStyle};
                        opacity: 1;

                        -webkit-transform: rotate(3deg) translate(0px, -4px);
                        -ms-transform: rotate(3deg) translate(0px, -4px);
                        transform: rotate(3deg) translate(0px, -4px);
                    }

                    /* Remove these to get rid of the spinner */
                    #nprogress .spinner {
                        display: ${showSpinner ? 'block' : 'none'};
                        position: fixed;
                        z-index: 1031;
                        top: 15px;
                        right: 15px;
                    }

                    #nprogress .spinner-icon {
                        width: 18px;
                        height: 18px;
                        box-sizing: border-box;

                        border: solid 2px transparent;
                        border-top-color: #29d;
                        border-left-color: #29d;
                        border-radius: 50%;

                        -webkit-animation: nprogress-spinner 400ms linear infinite;
                        animation: nprogress-spinner 400ms linear infinite;
                    }

                    .nprogress-custom-parent {
                        overflow: hidden;
                        position: relative;
                    }

                    .nprogress-custom-parent #nprogress .spinner,
                    .nprogress-custom-parent #nprogress .bar {
                        position: absolute;
                    }

                    @-webkit-keyframes nprogress-spinner {
                        0% {
                            -webkit-transform: rotate(0deg);
                        }
                        100% {
                            -webkit-transform: rotate(360deg);
                        }
                    }

                    @keyframes nprogress-spinner {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </>
    );
}
