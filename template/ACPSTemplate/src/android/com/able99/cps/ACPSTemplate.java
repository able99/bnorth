package com.able99.cps.ACPSTemplate;

import android.app.ActivityManager;
import android.app.NotificationManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Process;
import android.util.Log;

import com.xiaomi.mipush.sdk.MiPushClient;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class ACPSTemplate extends CordovaPlugin {
    public static final String LOG_TAG = "ACPSTemplate";
    private static CallbackContext _CallbackContext;

    @Override
    public boolean execute(final String action, final JSONArray data, final CallbackContext callbackContext) {
        Log.v(LOG_TAG, "execute: action=" + action);
        _CallbackContext = callbackContext;

        if (INITIALIZE.equals(action)) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    
                    JSONObject jo = null;

                    Log.v(LOG_TAG, "execute: data=" + data.toString());

                    try {

                        jo = data.getJSONObject(0).getJSONObject(ANDROID);
                        Log.v(LOG_TAG, "execute: jo=" + jo.toString());

                        // 初始化小米推送
                        String appId = jo.getString("appid");
                        String appKey = jo.getString("appkey");
                        MiPushClient.registerPush(getApplicationContext(), appId, appKey);

                    } catch (JSONException e) {
                        Log.e(LOG_TAG, "execute: error " + e.getMessage());
                        callbackContext.error(e.getMessage());
                    }
                }
            });
        } else {
            Log.e(LOG_TAG, "Invalid action : " + action);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
            return false;
        }

        return true;
    }

    public static void sendEvent(JSONObject _json) {
        PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, _json);
        pluginResult.setKeepCallback(true);
        if (pushContext != null) {
            pushContext.sendPluginResult(pluginResult);
        }
    }

    public static void sendError(String message) {
        PluginResult pluginResult = new PluginResult(PluginResult.Status.ERROR, message);
        pluginResult.setKeepCallback(true);
        if (pushContext != null) {
            pushContext.sendPluginResult(pluginResult);
        }
    }


    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
