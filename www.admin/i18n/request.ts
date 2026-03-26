import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
 
export default getRequestConfig(async ({requestLocale}) => {
    const requested = await requestLocale;
    const locale = hasLocale(requested, ["en", "da"]) ? requested : "en"
        
    const messages = (await import(`../messages/${locale}.json`)).default;
    
    return {
        locale,
        messages
    };
});