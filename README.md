# EestiSkateparkideKaardiApp
rakenduses saab vaatada erinavaid skateparke üle eesti maakese
### tegijad
- Saimon siipan
- Siim Belõi
- Airon Tatrik

### arendaja keskkona seadistamine ja projekti käivaitamine
1. klooni repositoorium
1. ava kaust VS Code-iga või muu IDE-GA
1. Ava terminal `cmd` ja mine `backend` kausta
Installi andmebaasi draiveri pakett: `npm install mariadb`
1. install Node-i paketid `npm install`
1. käivita arendus `npm run dev`

Link to project https://github.com/users/Siim-byte/projects/4

### produktsiooni käivitamine
1. `backend` kausta
1. konstrueeri produktsiooni kood käsuga `npm run build`
1. käivita toodangu kood käsuga `npm run start`

<img width="903" height="700" alt="image" src="https://github.com/users/Siim-byte/projects/4/views/1?filterQuery=" />

## Keskkonnamuutujate seadistamine (.env)

Enne projekti käivitamist pead looma `backend` kausta sisse `.env` faili. 

1. Tee failist `.env.example` koopia ja nimeta see ümber **`.env`** failiks.
2. Täida vajalikud andmebaasi ja serveri seadistused:

```env
DB_NAME="sinu_andmebaasi_nimi"
DB_USERNAME="sinu_andmebaasi_kasutajanimi"
DB_PASSWORD="sinu_andmebaasi_parool"
DB_HOSTNAME="localhost"
PORT=8080
SYNC=true