# Welcome to your Expo app 👋
## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. get google-services.json from firebase setup for android "note: dont change anything in gradel files"
   add google-services.json in android/app
   also add the same in root level

3. create .env
   add WEB_CLIENT_ID=your-web-clientid
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

4. run the following command
   ```bash
   pnpm expo prebuild
   ```

5. Start the app
   debug mode
   ```bash
   pnpm expo run:android --variant debug
   ```
   ```bash
    pnpm expo run:android
   ```

