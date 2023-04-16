import type { ReactNode } from 'react';

import { BasicLayout } from './basic-layout';
import { MDXTheme } from './mdx-theme';

const LolCard = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-500 rounded-full">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Create a new project</h2>
                <p className="text-sm text-center text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
                </p>
            </div>
        </>
    );
};

const ACard = () => {
    // rectangle card with avatar, name, and description
    return (
        <>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg">
                <div className="flex items-center">
                    <div className="relative flex-shrink-0">
                        <img
                            className="w-16 h-16 rounded-full"
                            src="https://images.unsplash.com/photo-1542731195-5d0d4dd7f4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="avatar"
                        />
                        <span className="absolute bottom-0 right-0 block w-3 h-3 -mb-1 -mr-1 border-2 border-white rounded-full bg-green-500"></span>
                    </div>
                    <div className="ml-4">
                        <h4 className="text-sm font-semibold text-gray-800">John Doe</h4>
                        <p className="text-xs text-gray-600">Online</p>
                    </div>
                </div>
                <button className="px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Message
                </button>
            </div>
        </>
    );
};

const Card = ({ avatar, name, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-5 flex items-center">
                <div className="mr-6">
                    <img className="h-16 w-16 rounded-full" src={avatar} alt={name} />
                </div>
                <div className="text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
};

export const FriendsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <BasicLayout>
            <MDXTheme>{children}</MDXTheme>
            <div className={'flex'}>
                <Card avatar={''} name={'asdad'} description={'ddd'} />
            </div>
        </BasicLayout>
    );
};
