# MOMENT PROJEKT - KLIENT, FRONTEND, VUE, CSS
Syftet med projektet är att omsätta kunskaper från de tidigare kursmomenten och skapa ett större sammanhängande projekt, samt fördjupa era kunskaper i:

* REST-webbtjänst (API) med Laravel som backend-ramverk.
* Klient-applikation (SPA) baserad på Vue som frontend-ramverk.
* Att i klient-applikationen använda och dra fördelarna av att använda ett CSS-ramverk.

## SPA-APPLIKATION
Intranet-applikationen har CRUD-funktionalitet med auth-funktionalitet. Endast användare som är registrerade och inloggade kan ha access till CRUD-funktionaliteten och meny med dess sidor. Applikationen fungerar som SPA så ingen HTTP-hämtning/efterfrågan krävs för att navogera mellan sidor och att använda funktionaliteten.

## FUNKTIONER
Det finns en hel funktioner:
0. Menyn/navigation (fixerad högst upp sida och följer med i skrollande; syns endast för inloggade användare) och alla sidor är otillgängliga för oinloggade användare: navigationen består av fyra knappar där tre är sidor och en är funktion:
START - registrering och inloggning - publikt tillgänglig - inloggad användare ser inte denna knapp
ADD - lägg till produkter/artiklar - en lista av de 10 senaste artiklar med senast överst där funktion för minska/öka av lager finns
EDIT - redigera artiklar - en lista alla artiklar med senast överst där funktion för minska/öka av lager finns
LOG OUT - utloggningsfunktion - tar användaren till START 
1. Registera en ny användare med namn, e-mejl, lösenord och säkerhetsnyckel. Nyckeln är för extra säkerhet vilket ges till behörig personal.
2. Inloggning sker med e-mejl och lösenord som kollar med SQL-databas via API
3. Tillägg av artiklar/produkter med olika inmatningsfält för olika attribut av en produkt såsom titelnamn och EAN-nummer
4. Från dynamsik lista att enkelt minska/öka värdet gällande lager med en knapptryck i 1-inkrement
5. Redigera en existerande artikel från listan/databasen. Allt kan redigeras inklusive artikelnummer
6. Utloggning sker via en knapp i navigationen vilket vid tryck tar bort användarens token i kaka och skickar denne tillbaka till startsida
7. Meny är dynamiskfunktion - START visas inte för inloggade med resten visas
8. Bootstrap används för CSS-stilsättning med egen CSS-kod
9. Applikationen fungerar på alla typer av enheter som mobil, padda och dator

## ARBETSPROCESS
0. skapa Vue-projekt: npm init vue@latest
1. skapa nya view-filer
2. importera vue-filer
3. skapa router
4. --HEADER-- skapa en Header-fil med template-kod
5. skapa huvudmeny
6. importera routerlänk
7. redogör vilka komponenter att använda
8. skapa länklista med RouterLink
9. --APP.VUE-- importera Header/Footer-komponent till rootkomponent
10. redogör komponent att använda
11. infoga Header/Footer i template 
11-1. infoga RouterView i <main>
12. --LISTPRODUCTSUPDATE.VUE-- lägg till biblioteksfunktioner 
13. --PRODUCTADDVIEW.VUE-- importera komponent för ListProducts samt lägg till komponentmetod
13-1. lägg till HTML
14. skapa props för varje AddProduct-objekt
15. loopa igenom array med objekt
16. methods: hämta data dynamiskt via AJAX; skapa funktioner
16-1. skapa FETCH mot API
16-2. lagra svar i JSON-format
16-3. lagra svaren/JSON-objektet i games-array
17. skapa metod mounted() för att anropa API igen vid tillägg
18. skapa händelselyssnare för DELETE, genom emit 
18-1. koppla händelselyssnare med barnkomponent och funktionen deleteGame
19. skapa funktion för DELETE deleteProduct, med id som argument
20. nytt AJAX-anrop med FETCH-data
20-1. lagra svara i JSON
20-2. anropa getProducts för att uppdatera listan
21. lägg till AddProduct.vue; importera i view-fil; lägg till komponenten i components
22. --ADDPRODUCT.VUE-- skapa formulär
22-0. skapa data för inmatning - länka med formulär-HTML
22-1. länka inmatninsgfält med "game" i data
22-2. lägg till händelselyssnare för submit samt prevent.default
22-3. skapa funktion för att lagra data
22-4. kontroll om någon inmatning
22-5. skapa varibel för body för JS-objekt som ska skickas
22-6. omvandla variabeln till JSON-objekt
23. ladda om sidan vid submit med en emit
23-1. deklerara emitten 
23-2. lägg till emitten i föräldrarkomponenten
24. lägg till övrig formulär
25. lägg till värde i fält
26. omvänd ordning av lista
27. fixa listan med HTML
28. skapa knappar för ökning/minskning av lager
29. v-if/else-sats vid slut i lager - 0.
30. @click-funktion för att hämta vid klick/tag bort
31. rendera endast 10 senaste objekt med .slice()-metod
och så vidare...