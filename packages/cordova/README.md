# `cordova`

easy create your hybird app with [cordova](https://cordova.apache.org/)

## 文档

[bnorth 文档](//able99.github.io/#cbnorth)
[hybird 开发](//able99.github.io//cbnorht/bybird.html)


## Env

### Android

1. Install [Java 1.8 or later](https://www.webcamrips.com/wilmot69noah-chaturbate-webcamshow-23-09-2018-1747/)
1. Install [Gradle](https://gradle.org/install/)
1. Android SDK

### IOS

1. xcode
1. command build tools

## Get Started

```js
npm install bnorth-cordova
npx bnorth-cordova
```

## Usage

1. npx bnorth-cordova config: sync package.json to cordova project config, such as name, version, etc
1. npx bnorth-cordova web: sync web publish file to cordova project
1. npx bnorth-cordova platform add android: add android platform
1. npx bnorth-cordova plugin add xxx: add cordova plugin
1. npx bnorth-cordova build android: build and gen android apk
1. npx bnorth-cordova run android: build and install gen apk to your phone connected
1. Check [Cordova Doc](https://cordova.apache.org/docs/en/latest/) for more details

## Example

```js
npx bnorth-cli create yourapp
cd yourapp
npm run build
npm install bnorth-cordova
npx bnorth-cordova web
npx bnorth-cordova platform add android
npx bnorth-cordova build android
```

## Name 

There are some ways to set app name in ***Package.json***, priority to rank, from high to low are:

1. displayName[Platform], such as displayNameAndroid
1. displayName
1. name

```json
{
  ...
  "name": "app name",
  ...
}
```

## Id and Version

Set app id and version, for android it is the package id and package version, for ios it is bundle id and bundle version

```json
{
  ...
  "id": "app id",
  "version": "1.0.0",
  ...
}
```

## Icon

Set app icon, use same icon for all platform

```json
{
  ...
  "icon": "../res/logo.png",
  ...
}
```

Or set icon on ./cordova/config.xml, for more detail link to [Icon](https://cordova.apache.org/docs/en/latest/config_ref/images.html)

## Splash

[Splash](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html)

## App Config

Config app options

```json
{
  ...
  "preferences": {
    "key":"value"
  }
  ...
}
```
1. **BackgroundColor**: Sets the app's background color.
  color string
1. **Orientation**: orientation. 
  default, landscape, portrait

For more preference link to [preference](https://cordova.apache.org/docs/en/latest/config_ref/index.html#preference)

## App Sign

1. move sign file to res dir
1. config package.json
  ***the relative path is ./cordova***
  ```json
  {
    ...
    "buildParams": {
      "android": {
        "debug": {
          "keystore": "../res/your.keystore",
          "storePassword": "your store password",
          "alias": "your alias",
          "password" : "your password",
          "keystoreType": ""
        },
        "release": {
          "keystore": "../res/your.keystore",
          "storePassword": "your store password",
          "alias": "your alias",
          "password" : "your password",
          "keystoreType": ""
        }
      },
      "ios": {
        "debug": {
          "codeSignIdentity": "your code sign identity installed",
          "provisioningProfile": "your code sign provisioning profile installed",
          "developmentTeam": "your team with sign",
          "packageType": "development"
        },
        "release": {
          "codeSignIdentity": "your code sign identity installed",
          "provisioningProfile": "your code sign provisioning profile installed",
          "developmentTeam": "your team with sign",
          "packageType": "app-store"
        }
      }
    },
    ...
  }
  ```

1. npx bnorth-cordova config

## Other Config

Edit cordova/confix.xml and refer to [config.xml](https://cordova.apache.org/docs/en/latest/config_ref/index.html)

## Usefull Cordova Plugins

### Android Performance

Use plugin crosswalk webview

```js
npx bnorth-cordova plugin add cordova-plugin-crosswalk-webview
npx bnorth-cordova plugin add cordova-android-support-gradle-release
```

### Android Permissions

cordova-plugin-android-permissions

### Image Multi Picker with Camera

cordova-plugin-adam-imagepicker

### Use Native Navigator

cordova-plugin-yc-navigator

### GeoLocation 

cordova-plugin-baidu-geolocation-c
cordova-plugin-baidumaplocation
https://github.com/ETENG-OSP/cordova-plugin-baidu-geolocation.git

### Custom Statusbar

cordova-plugin-statusbar

### QQ Sdk for Oath, Share

cordova-plugin-qqsdk

### Wechat Sdk for Oath, Share

cordova-plugin-wechat https://github.com/xu-li/cordova-plugin-wechat

### Weibo Sdk for Oath, Share

cordova-plugin-weibo

### Alipay payment

cordova-plugin-alipay-v2

### More Plugins

[cordova plugins](https://cordova.apache.org/plugins/)  