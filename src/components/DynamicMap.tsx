'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
      <div className="text-gray-500 font-bold">Loading Map...</div>
    </div>
  )
});

export default DynamicMap;
