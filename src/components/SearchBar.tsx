'use client';

import { useRouter } from 'next/navigation';
import Select, { type Theme } from 'react-select'
import type { Cafe } from "@prisma/client";

type SearchBarProps = {
    cafes: Cafe[]
};

export function SearchBar(props: SearchBarProps) {
    const { cafes } = props;
    const router = useRouter();
    const options = cafes.map((cafes) => ({ value: cafes.name, label: cafes.name }));

    const setTheme = (theme: Theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: '#8fbc5c',
            primary: '#8fbc5c',
        }
    });

    const instanceId = 'search-bar';

    return (
        <Select theme={setTheme} options={options} onChange={(option) => router.push(`/cafe/${option!.value}`)} instanceId={instanceId} />
    )
}