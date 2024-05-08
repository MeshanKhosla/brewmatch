# BrewMatch

Project for CS160 - User Interfaces

Winner of "Best Class Project - Most Polished"

<img src="https://github.com/MeshanKhosla/brewmatch/assets/24885081/1a87131c-3b60-4a87-8de8-16e716a4a545" width="250" alt="Award Picture" />

## Local Development
1. Clone this repo
2. Run `cp .env.example .env` and add the environment variables to the `.env` file (see below)
3. Run `npm install` to install dependencies
4. Run `npx prisma db push` to update the schema
5. Run `npm run dev` to start the dev server

The app should be running at `http://localhost:3000`

## Environment variables
<details>
<summary>NextAuth</summary>

Run `openssl rand -base64 32` (you may need to download openssl) and put the result inside of `NEXTAUTH_SECRET`.

</details>

<details>
<summary>Google OAuth</summary>

Google OAuth is used for authentication.

1. Create a new project on <a target="_blank" href="https://console.developers.google.com">Google Cloud Platform</a>.

2. Navigate to the Credentials tab. Press the "Create Credentials" button and select "OAuth client ID". Go throuth the process of filling out the form. Select `External` if you're given the option. Press the "Create Credentials" button again. This time select "Web application" as the application type.

3. Create a new OAuth client ID. Make sure to set the Authorized JavaScript origins to `http://localhost` and redirect URI to `http://localhost:3000/api/auth/callback/google`. When deployed, add new entries, replacing `localhost`/`localhost:3000` to the new URL.

4. Copy the client ID and paste it into the `GOOGLE_CLIENT_ID` variable in the `.env` file.

5. Copy the client secret and paste it into the `GOOGLE_CLIENT_SECRET` variable in the `.env` file.

</details>

<details>
<summary>Database</summary>
  
For the database, you can self-host a database or consider a hosted provider such as Planetscale, Aiven, AWS RDS, etc. This project uses Aiven.

1. Create a new database on your platform.

2. Copy the database URL and paste it into the `DATABASE_URL` variable in the `.env` file.

</details>

<details>
<summary>Uptash Vector</summary>
  
Visit <a target="_blank" href="https://console.upstash.com/vector">Upstash</a> and create a new index using `BAAI/bge-large-en-v1.5` as the embedding model. Then fill out the `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN`.

</details>

<details>
<summary>Reagent</summary>
  
Visit <a target="_blank" href="https://rea.gent/noggins">Reagent</a> and create a nwe GPT-4 Turbo Noggin. Use the credentials to fill out `REAGENT_URL` and `REAGENT_TOKEN`.

This is the prompt we used on Reagent:

```
Here is a drink profile that a cafe customer created that details their current drink preferences, which include a description and sweetness level.  
Description: $profile_description

Sweetness: $profile_sweetness



Based on those drink profile details, I recommended these drinks to the customer. I have included the name, description, and sweetness level of each of the recommended drinks.
$drinks
 

Please provide a SHORT 1-2 sentence explanation for why each drink was recommended to the customer. Do try to always come up with a reasonable explanation based on the drink profile and recommendation details. Please make sure you ONLY have the 1-2 sentence explanation for each drink. Please return the explanations for each drink in a list, with each explanation in double quotes (ie. ["explanation for drink 1", "explanation for drink 2",...]) in the same order of the drinks provided. Please make sure ONLY the list with each drinks' 1-2 sentence explanation is included in your answer.
```

</details>

After your `.env` file is set up, run the following commands to install dependencies populate the database with the schema:

```bash
npm install
npx prisma db push
```
