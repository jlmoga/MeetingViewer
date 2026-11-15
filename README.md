# Meeting Viewer - Panell Mecànic Split-Flap per a Calendaris (iCal / .ics)

Aplicació web lleugera a pantalla completa que reprodueix l'estètica dels panells mecànics d'estacions de tren i aeroports antics (estil Solari di Udine), mostrant les pròximes convocatòries dels teus calendaris (Google Calendar, Outlook, Hotmail, Apple Calendar, etc.) mitjançant enllaços iCal / .ics, amb caràcters mòbils i so mecànic autèntic.

---

## ✨ Característiques principals (Key Features)

* 🕒 **Estètica retro autèntica (Split-Flap Solari):** Fitxes mecàniques amb línia de divisió central (*split flap*), animació en cascada de gir de caràcters i llums indicadors LED segons l'estat de la reunió (en curs parpellejant, propera o programada).
* 🔊 **Motor de so mecànic d'alta fidelitat:** Simulació acústica procedural de làmines de policarbonat (Web Audio API) amb cadència de repic continu (*flutter*) inspirada en l'estil de l'aeroport de Hakodate, compressor dinàmic anti-saturació i suport natiu per a fitxers d'àudio externs (`.mp3` / `.wav`).
* 📅 **Sincronització multi-calendari universal:** Gestió simultània de múltiples calendaris mitjançant adreces iCal / `.ics` (Google Calendar, Outlook, Hotmail, Apple Calendar, Nextcloud, etc.).
* 🎛️ **Filtre ràpid a la capçalera:** Botons interactius per aïllar una agenda específica o veure totes les convocatòries consolidades.
* 🏷️ **Títol del panell editable:** Possibilitat de personalitzar el nom del panell (cantonada superior esquerra) des del menú de configuració amb memòria persistent.
* 🌍 **Suport multiidioma:** Traducció completa en temps real a **Català**, **Castellà** i **Anglès**.
* 📺 **Disseny 100% responsiu i sense scroll:** S'ajusta automàticament a qualsevol resolució de pantalla (monitors, televisors o tauletes), recalculant en temps real el nombre òptim de files i caràcters visibles.
* 🎮 **Mode Demostració (Demo):** Convocatòries simulades per provar la visualització i les animacions sense necessitat de configurar dades reals.
* ⚡ **Sense dependències feixugues:** Desenvolupat en Vanilla JavaScript, CSS3 i HTML5 amb un servidor local mínim en Node.js que resol les restriccions de CORS.
* 📱 **Arquitectura aïllada per a APK:** Codi de la interfície centralitzat a la carpeta `www/`, llest per empaquetar en aplicacions mòbils Android mitjançant Capacitor, Cordova o un WebView natiu.

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
  * `snd/`: Fitxers i mostres d'àudio mecànic.
* **`server.js`**: Servidor Node.js local que serveix la carpeta `www/` i fa de passarel·la/proxy per descarregar els calendaris iCal (`.ics`) sense problemes de CORS.
* **`run.bat`**: Script per arrencar el servidor i obrir l'aplicació en Mode App directament.
