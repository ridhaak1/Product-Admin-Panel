## Ridha Alkhaykanee

# Webontwikkeling Project – Authenticatie & Rollen

## 📌 Beschrijving
Dit project is een webapplicatie gebouwd met **Node.js, Express, MongoDB en EJS**.  
De applicatie bevat een volledig **authenticatiesysteem** met gebruikersrollen (**ADMIN** en **USER**).

Gebruikers kunnen zich registreren, inloggen en uitloggen.  
De toegang tot pagina’s en functionaliteiten is beveiligd op basis van de loginstatus en rol van de gebruiker.

---

## 🚀 Functionaliteiten

### 👤 Gebruikers & Rollen
- Bij het opstarten van de applicatie worden **twee default gebruikers** toegevoegd:
  - **Admin gebruiker** met rol `ADMIN`
  - **Normale gebruiker** met rol `USER`
- Wachtwoorden worden **veilig opgeslagen met bcrypt**

---

### 🔐 Login
- Iedereen heeft toegang tot de **login pagina**
- De login pagina bevat:
  - Input veld voor username/email
  - Input veld voor password
  - Login knop
- Na een succesvolle login:
  - De gebruiker wordt doorgestuurd naar het **dashboard**
- Als een gebruiker al is ingelogd:
  - Kan hij de login pagina niet meer bezoeken
  - Wordt hij automatisch doorgestuurd naar het dashboard

---

### 🧾 Registratie
- Gebruikers kunnen zich registreren via een **register pagina**
- De pagina bevat:
  - Username/email
  - Password
- Validaties:
  - Gebruikersnaam mag niet al bestaan
  - Wachtwoord wordt gehasht met bcrypt
- Na registratie wordt de gebruiker doorgestuurd naar de login pagina

---

### 📊 Dashboard
- Het dashboard is **alleen toegankelijk voor ingelogde gebruikers**
- Niet ingelogd → redirect naar login pagina

#### ADMIN
- Kan de **edit button** zien
- Heeft toegang tot edit functionaliteiten

#### USER
- Ziet de edit button niet
- Heeft geen toegang tot admin-pagina’s

---

### 🔒 Beveiliging
- Sessies worden gebruikt voor authenticatie
- Beveiligde routes met middleware
- Rol-gebaseerde toegang (ADMIN / USER)
- Flash messages voor fout- en succesmeldingen

---

### 🚪 Logout
- Ingelogde gebruikers kunnen uitloggen via een **logout knop**
- Na logout:
  - De sessie wordt vernietigd
  - De gebruiker wordt doorgestuurd naar de login pagina

---

## 🛠️ Gebruikte Technologieën
- Node.js
- Express
- MongoDB
- EJS
- TypeScript
- bcrypt
- express-session

---

## 📁 Installatie & Gebruik

1. Installeer de dependencies:
   ```bash
   npm install
