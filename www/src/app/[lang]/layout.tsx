import "./globals.css";
import "../../../node_modules/flag-icons/css/flag-icons.min.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import {getTranslations} from 'next-intl/server';
 
export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "da" }> }) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'metadata.homepage'});
 
  return {
    title: t('title'),
    description: t("description")
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "da" }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body
            className={`font-inter antialiased overflow-x-hidden text-sm sm:text-[0.938rem] flex flex-col min-h-screen`}
        >
          <Header/>
          <div className="flex-1 pt-11 sm:pt-[3.25rem]">
            {children}
          </div>
          <Footer/>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
