# Welcome to your Expo app 👋
## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```
2. run the following command to get android folder
   ```bash
   pnpm expo prebuild

3. to get sha keys
   ```bash
   cd android
   ```
   ```bash
   keytool -list -v -keystore app/debug.keystore
   ```
   password 
   ```bash
   android
   ```


4. get google-services.json from firebase setup for android "note: dont change anything in gradel files"
   also add the same in root level

5. create .env
   add 
   ```bash
   WEB_CLIENT_ID=your-web-clientid
   PACKAGE_NAME=com.yourpackage.name
   GOOGLE_SERVICES_FILE=./google-services.json
   GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```
   inside your google-services.json
   "oauth_client": [
        {
          "client_id": "dont use this id",
          "client_type": 1,
          "android_info": {
            "package_name": "com.tripconnect.dev",
            "certificate_hash": "1234"
          }
        },
        {
          "client_id": "Id to be used", // use this id
          "client_type": 3
        }
      ],

6. run the following command
   ```bash
   pnpm expo prebuild
   ```
7. Start the app
   debug mode
   ```bash
   pnpm expo run:android --variant debug
   ```
   ```bash
    pnpm expo run:android
   ```

"# tripconnect-expo" 
