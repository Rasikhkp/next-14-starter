'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="text-sm flex transition-all items-center gap-2 hover:gap-3 text-neutral-800"
        >
            <ArrowLeft color="black" size={20} />
            Back
        </button>
    );
};

export default BackButton;
