# engeto-final-project
engeto-final-project


# Final project for web dev course
Tvým cílem je vytvořit komplexní webovou aplikaci na správu menu v restauraci. Aplikace bude mít veřejnou část a administraci.

## Veřejná část
- rvní stránka – přehledně zobrazíš kategorie jídel (Předkrmy, Polévky, Hlavní jídla atd.).
- druhá stránka – zobrazíš odpovídající jídla, která patří do dané kategorie. Pokud návštěvník stránky klikne na hlavní stránce na Předkrmy, zobrazíš mu všechny předkrmy. Pokud klikne na hlavní stránce na Polévky, zobrazíš mu všechny polévky. U každého jídla zobrazíš název, popis a cenu.
- třetí stránka – formulář pro přihlášení administrátora (projekt nebude mít registrační formulář, protože by u takového projektu nedával smysl).

## Administrace

Pokud se administrátor přihlásí, uvidí výpis všech jídel z databáze. Administrátor bude mít možnost
- přidat nové jídlo,
- smazat jídlo,
- editovat stávající jídlo. To jsme v kurzu sice nedělali, ale společně s AI to jistě zvládneš.

Uspořádání v administraci necháme na tobě.
Nezapomeň stránky vhodně prolinkovat (odkazy z jedné stránky na druhou).

## Technické požadavky
- back-end: Express.js
- databáze: PostgreSQL
- front-end: HTML, CSS, popř. JavaScript
- session management: express-session
- middleware pro výpis chyb.

## SQL 
Název databáze: menuapp
Při přípravě tabulek v databázi používej prosím jen tyto SQL příkazy. Budeš mít vytvořené 3 tabulky. Níže máš příkazy pro naplnění tabulek vzorovými daty
Dále máš k dispozici SQL příkaz pro nastavení administrátora - viz ukol v engetu

menu_items ma sloupecky name, description, price - pozn. daji se pridat obrazky?
