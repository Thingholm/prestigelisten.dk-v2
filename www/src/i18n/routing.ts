import { defineRouting } from "next-intl/routing";

const locales = ['en', 'da'];

export const routing = defineRouting({
    locales: locales,
    defaultLocale: 'en',
    pathnames: {
        '/': {
            en: '/',
            da: '/',
        },
        '/year': {
            en: '/year',
            da: '/år',
        },
        '/year/[year]': {
            en: '/year/[year]',
            da: '/år/[year]',
        },
        '/team': {
            en: '/teams',
            da: '/hold',
        },
        '/team/[team]': {
            en: '/team/[team]',
            da: '/hold/[team]',
        },
        '/team/[team]/[[...name]]': {
            en: '/team/[team]/[[...name]]',
            da: '/hold/[team]/[[...name]]',
        },
        '/calendar': {
            en: '/calendar',
            da: '/kalender',
        },
        '/race': {
            en: '/race',
            da: '/løb',
        },
        '/race/[race]': {
            en: '/race/[race]',
            da: '/løb/[race]',
        },
        '/race/[race]/[[...name]]': {
            en: '/race/[race]/[[...name]]',
            da: '/løb/[race]/[[...name]]',
        },
        '/rankings/riders': {
            en: '/rankings/riders',
            da: '/listen/ryttere',
        },
        '/rankings/nations': {
            en: '/rankings/nations',
            da: '/listen/nationer',
        },
        '/rankings/riders/3-year_period': {
            en: '/rankings/riders/3-year_period',
            da: '/listen/ryttere/3-årig_periode',
        },
        '/rankings/riders/ages': {
            en: '/rankings/riders/ages',
            da: '/listen/ryttere/alderstrin',
        },
        '/rankings/riders/ages/[age]': {
            en: '/rankings/riders/ages/[age]',
            da: '/listen/ryttere/alderstrin/[age]',
        },
        '/rankings/riders/greatest_seasons': {
            en: '/rankings/riders/greatest_seasons',
            da: '/listen/ryttere/største_sæsoner',
        },
        '/nation': {
            en: '/nation',
            da: '/nation',
        },
        '/nation/[nation]': {
            en: '/nation/[nation]',
            da: '/nation/[nation]',
        },
        '/nation/[nation]/[[...name]]': {
            en: '/nation/[nation]/[[...name]]',
            da: '/nation/[nation]/[[...name]]',
        },
        '/about_prestigelisten': {
            en: '/about_prestigelisten',
            da: '/om_prestigelisten',
        },
        '/results_this_year': {
            en: '/results_this_year',
            da: '/pointgivende_resultater_i_år',
        },
        '/point_scale': {
            en: '/point_scale',
            da: '/pointsystem',
        },
        '/rider': {
            en: '/rider',
            da: '/rytter',
        },
        '/rider/[rider]': {
            en: '/rider/[rider]',
            da: '/rytter/[rider]',
        },
        '/rider/[rider]/[[...name]]': {
            en: '/rider/[rider]/[[...name]]',
            da: '/rytter/[rider]/[[...name]]',
        },
        '/compare': {
            en: '/compare',
            da: '/sammenlign',
        },
        '/compare/riders': {
            en: '/compare/riders',
            da: '/sammenlign/ryttere',
        },
        '/compare/nations': {
            en: '/compare/nations',
            da: '/sammenlign/nationer',
        },
    }
});