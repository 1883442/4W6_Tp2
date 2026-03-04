"use client";
import { ContextWrapper } from "@/app/_components/context-wrapper";
import { usePathname, useRouter } from "@/i18n/navigation";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function OtherLayout({ children }: Readonly<{ children: React.ReactNode }>) {

 const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [selectLocale, setSelectLocale] = useState(locale);

function chooseLocale(e : any){
    setSelectLocale(e.target.value); 
    router.replace(pathname, { locale : e.target.value }); 
  }

function pushHome() {
router.push('../');
}


  // ... Bidules variés pour i18n (locale, router, pathname, etc.)
  const t = useTranslations('Layout')
  return (
    <><header className="w-full">
		  <div className="flex items-center">
			  <div className="p-2 navHover">
				  <h1 onClick={pushHome} className="text-3xl">{t('SpotMoi')}</h1>
			  </div>
			  <div className="flex-1"></div>
			  <div className="p-2 navHover">
				  <h2 onClick={pushHome} className="text-3xl"><a>{t('YourArtist')}</a></h2>
			  </div>
			  <div className="p-2">
				  <select onChange={chooseLocale} value={selectLocale} name="language" className="bg-black py-1 px-2 rounded-md text-whites">
					  <option value="fr">{t('Fr')}</option>
					  <option value="en">{t('En')}</option>
				  </select>
			  </div>
		  </div>
	  </header>
			  <ContextWrapper>
				  {children}
			  </ContextWrapper>
		  <footer className="w-full">
			  <div className="py-1">
				  <div>
					  <p className="text-center">&copy; {t("Yoink")}</p>
				  </div>
			  </div>
		  </footer></>
  );

}