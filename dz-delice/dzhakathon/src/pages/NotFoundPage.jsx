import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../icons/NotFound';
const NotFoundPage = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#FFF8F0] ">
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg width="2100" height="154" viewBox="0 0 1280 154" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-320 153C-237.167 73.1667 24.9 -61.6 410.5 38C796.1 137.6 1317.17 54.8333 1529.5 1" stroke="#EA6A12" stroke-opacity="0.3"/>
</svg>
<svg width="2100" height="164" viewBox="0 0 1280 164" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-323.052 110.984C-233.101 39.2666 40.4446 -70.3419 415.011 64.9638C789.577 200.269 1316.11 166.709 1532.55 133.016" stroke="#EA6A12" stroke-opacity="0.3"/>
</svg>
</div>
            <div className="">
                <NotFound />
                <h1 className="text-3xl font-bold mb-4 mt-7">Page not Found</h1>
                <p className="text-gray-500 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link 
                    to="/" 
                    className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
