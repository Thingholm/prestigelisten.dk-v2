import { createTranslator } from 'next-intl';
import { cache, useEffect, useState, } from 'react';

const getTranslator = cache(async (locale: string, namespace: string) => {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return createTranslator({ locale, messages, namespace });
});

export async function t(namespace: string, locale: string) {
    return getTranslator(locale, namespace);
}

    
const messageCache: Record<string, any> = {};

async function loadMessages(locale: string) {
    if (!messageCache[locale]) {
        messageCache[locale] = (await import(`../../messages/${locale}.json`)).default;
    }
    return messageCache[locale];
}

export function useT(namespace: string, locale: string) {
    const [translator, setTranslator] = useState<ReturnType<typeof createTranslator> | null>(null);

    useEffect(() => {
        loadMessages(locale).then(messages => {
            setTranslator(() => createTranslator({ locale, messages, namespace }));
        });
    }, [locale, namespace]);

    return translator ?? ((key: string) => "");
}