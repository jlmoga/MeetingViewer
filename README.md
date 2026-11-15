# Meeting Viewer - Panell Mecànic Split-Flap per a Calendaris (iCal / .ics)

Aplicació web lleugera a pantalla completa que reprodueix l'estètica dels panells mecànics d'estacions de tren i aeroports antics (estil Solari di Udine), mostrant les pròximes convocatòries dels teus calendaris (Google Calendar, Outlook, Hotmail, Apple Calendar, etc.) mitjançant enllaços iCal / .ics, amb caràcters mòbils i so mecànic autèntic.

---

## 🚀 Com iniciar l'aplicació

Fes doble clic al fitxer:
```bat
run.bat
```
Això engegarà el servidor local i obrirà automàticament el teu navegador predeterminat a:
**[http://localhost:8080](http://localhost:8080)**

---

## 📁 Estructura del Projecte

* **`www/`**: Carpeta amb els recursos web de l'aplicació (client frontend). Ideal per empaquetar directament en una APK d'Android (Cordova/Capacitor/WebView).
  * `index.html`: Estructura del panell d'estació i modal de configuració.
  * `style.css`: Estils visuals split-flap, LEDs i animacions mecàniques.
  * `app.js`: Lògica del panell, sintetitzador d'àudio, sincronització de calendaris i i18n.
  * `img/`: Imatges i icones del projecte.
* **`server.js`**: Servidor Node.js local que serveix la carpeta `www/` i fa de passarel·la/proxy per descarregar els calendaris iCal (`.ics`) sense problemes de CORS.
* **`run.bat`**: Script per arrencar el servidor i obrir l'aplicació en Mode App directament.


1. **Pantalla completa i sense scroll:**
   * Ocupa el 100% de la pantalla disponible (`100vw` x `100vh`).
   * Calcula automàticament el nombre òptim de files segons la mida del monitor o tauleta.
2. **Estètica mecànica autèntica:**
   * Fitxes dividides al mig amb línia de solapa (*split flap*).
   * Animació de gir ràpid de lletres en canviar de text o estat.
   * Efecte de so mecànic (*clack-clack*) sintetitzat en temps real (Web Audio API, sense descàrregues).
   * Llums indicadors LED a la dreta de cada fila (en curs parpellejant en groc, pròximament en groc, programada en verd).
3. **Estats del panell:**
   * **Sense calendaris configurats:** Mostra un avís mecànic demanant obrir la configuració per afegir enllaços iCal.
   * **Sense convocatòries pendents:** Mostra el missatge: `FELICITATS. AVUI NO TENS FEINA`.
   * **Amb convocatòries:** Mostra les pròximes reunions ordenades cronològicament.
4. **Configuració discreta:**
   * Icona d'engranatge atenuada a la cantonada superior dreta (no distreu la vista del panell).
   * Gestor de múltiples calendaris simultanis (activa/desactiva caselles i botons de filtre ràpid).
   * Títol personalitzat editable a la cantonada superior esquerra.
   * Selector de 3 idiomes: **Català**, **Castellà** i **Anglès**.
   * Interruptor per activar/desactivar el so mecànic.
   * **Mode Demostració (Demo):** Permet provar el panell a l'instant amb reunions simulades.
5. **Preparat per a convertir en APK d'Android:**
   * Desenvolupat en HTML5, CSS3 i JavaScript pur (Vanilla JS), sense dependències feixugues.
   * Preparat per integrar-se en un `WebView` d'Android o empaquetar-se amb Capacitor.
