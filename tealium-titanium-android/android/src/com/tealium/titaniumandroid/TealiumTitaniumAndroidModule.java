/**
 * This file was auto-generated by the Titanium Module SDK helper for Android
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2017 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */
package com.tealium.titaniumandroid;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.util.TiConvert;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.common.TiConfig;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollFunction;
import com.tealium.library.Tealium;
import com.tealium.internal.tagbridge.RemoteCommand;
import com.tealium.lifecycle.LifeCycle;
import com.tealium.adidentifier.AdIdentifier;
import com.tealium.library.ConsentManager;
import android.webkit.WebView;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;
import java.util.HashSet;
import java.util.Iterator;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.SharedPreferences;
import android.os.Handler;
import android.content.Context;

import java.lang.reflect.*;

@Kroll.module(name = "TealiumTitaniumAndroid", id = "com.tealium.titaniumandroid")
public class TealiumTitaniumAndroidModule extends KrollModule {

 // Standard Debugging variables
 private static final String LCAT = "TealiumTitaniumAndroidModule";
 private static final boolean DBG = TiConfig.LOGD;
 private static TiApplication thisApp = null;
 private final String LOG_TAG = "Tealium-Titanium-0.1";
 private static final String TRACK_TYPE_EVENT = "link";
 private static final String TRACK_TYPE_VIEW = "view";
 private boolean isDevBuild = false;
 private static Context appContext = null;

 public TealiumTitaniumAndroidModule() {
  super();
 }

 @Kroll.onAppCreate
 public static void onAppCreate(TiApplication app) {
  Log.d(LCAT, "inside onAppCreate");
  thisApp = app;
  // grab app context for Ad Identifier initialization
  appContext = thisApp.getApplicationContext();
 }

 @Kroll.method
 public void initTealium(final String instanceName, String account, String profile, String env, String dataSourceId,
  String collectDispatchURL, String collectDispatchProfile, boolean isLifecycleEnabled, boolean isCrashReporterEnabled, boolean isConsentManagerEnabled) {
  // we can't initialize without an application handle
  if (thisApp == null) {
   return;
  }

  if (env != null && env.equals("dev")) {
   // enable webview debugging for dev environment only
   WebView.setWebContentsDebuggingEnabled(true);
   this.isDevBuild = true;
  }

  Tealium.Config config = Tealium.Config.create(thisApp, account, profile, env);

  // full URL takes precedence over just the profile.
  if (collectDispatchURL != null) {
   config.setOverrideCollectDispatchUrl(collectDispatchURL);
  } else if (collectDispatchProfile != null) {
   config.setOverrideCollectDispatchUrl("https://collect.tealiumiq.com/vdata/i.gif?tealium_account=" + account + "&tealium_profile=" + collectDispatchProfile);
  }

  if (isLifecycleEnabled == true) {
   LifeCycle.setupInstance(instanceName, config, isLifecycleEnabled);
  }

  if (isConsentManagerEnabled == true) {
   config.enableConsentManager(instanceName);
  }

  if (dataSourceId != null) {
   config.setDatasourceId(dataSourceId);
  }

  if (isCrashReporterEnabled) {
   try {
    // using reflection to check if optional crashreporter module is present in the app
    Class < ? > crashReporter = Class.forName("com.tealium.crashreporter.CrashReporter");
    Class[] cArg = new Class[3];
    cArg[0] = String.class;
    cArg[1] = Tealium.Config.class;
    cArg[2] = boolean.class;
    Method initCrashReporter = crashReporter.getDeclaredMethod("initialize", cArg);
    initCrashReporter.setAccessible(true);
    initCrashReporter.invoke(null, instanceName, config, false);
   } catch (Exception e) {
    Log.e(LCAT, "INFO: Tealium Crash Reporter module not found");
   }
  }
  Tealium.createInstance(instanceName, config);
 }

 @Kroll.method
 public void setUserConsentStatus(String instanceName, String consentStatus) {
  if (consentStatus.equals("consented")) {
   Tealium.getInstance(instanceName).getConsentManager().setUserConsentStatus(ConsentManager.ConsentStatus.CONSENTED);
  } else if (consentStatus.equals("notConsented")) {
   Tealium.getInstance(instanceName).getConsentManager().setUserConsentStatus(ConsentManager.ConsentStatus.NOT_CONSENTED);
  }
 }

 @Kroll.method
 public void setUserConsentCategories(String instanceName, String[] consentCategories) {
  String[] validCategories = getValidConsentCategories(consentCategories);
  Tealium.getInstance(instanceName).getConsentManager().setUserConsentCategories(validCategories);
 }

 private String[] getValidConsentCategories(String[] categories) {
  String[] validCategories = new String[30]; // allow filtering out of additional categories provided in error
  int count = 0;
  for (int i = 0; i < categories.length; i++) {
   count = count + 1;
   switch (categories[i]) {
    case "analytics":
     validCategories[i] = ConsentManager.ConsentCategory.ANALYTICS;
     break;
    case "affiliates":
     validCategories[i] = ConsentManager.ConsentCategory.AFFILIATES;
     break;
    case "big_data":
     validCategories[i] = ConsentManager.ConsentCategory.BIG_DATA;
     break;
    case "cdp":
     validCategories[i] = ConsentManager.ConsentCategory.CDP;
     break;
    case "cookiematch":
     validCategories[i] = ConsentManager.ConsentCategory.COOKIEMATCH;
     break;
    case "crm":
     validCategories[i] = ConsentManager.ConsentCategory.CRM;
     break;
    case "display_ads":
     validCategories[i] = ConsentManager.ConsentCategory.DISPLAY_ADS;
     break;
    case "email":
     validCategories[i] = ConsentManager.ConsentCategory.EMAIL;
     break;
    case "engagement":
     validCategories[i] = ConsentManager.ConsentCategory.ENGAGEMENT;
     break;
    case "mobile":
     validCategories[i] = ConsentManager.ConsentCategory.MOBILE;
     break;
    case "monitoring":
     validCategories[i] = ConsentManager.ConsentCategory.MONITORING;
     break;
    case "personalization":
     validCategories[i] = ConsentManager.ConsentCategory.PERSONALIZATION;
     break;
    case "search":
     validCategories[i] = ConsentManager.ConsentCategory.SEARCH;
     break;
    case "social":
     validCategories[i] = ConsentManager.ConsentCategory.SOCIAL;
     break;
    case "misc":
     validCategories[i] = ConsentManager.ConsentCategory.MISC;
     break;
    default:
     validCategories[i] = null;
     count = count - 1;
     break;
   }
  }
  String[] filteredCategories = new String[count];
  for (String s: validCategories) {
   if (s != null) {
    filteredCategories[count - 1] = s;
    count = count - 1;
   }
  }
  return filteredCategories;
 }

 @Kroll.method
 public void resetUserConsentPreferences(String instanceName) {
  Tealium.getInstance(instanceName).getConsentManager().resetUserConsentPreferences();
 }

 @Kroll.method
 public String[] getUserConsentCategories(String instanceName) {
  return Tealium.getInstance(instanceName).getConsentManager().getUserConsentCategories();
 }

 @Kroll.method
 public String getUserConsentStatus(String instanceName) {
  String status = Tealium.getInstance(instanceName).getConsentManager().getUserConsentStatus();
  return status.equals("notConsented") ? "NotConsented" : "Consented";
 }

 @Kroll.method
 public void setUserConsentPolicy(String instanceName, String policy) {
  Tealium.getInstance(instanceName).getConsentManager().setPolicy(policy);
 }

 @Kroll.method
 public void setConsentLoggingEnabled(String instanceName, boolean enabled) {
  Tealium.getInstance(instanceName).getConsentManager().setConsentLoggingEnabled(enabled);
 }

 @Kroll.method
 public void resetUserConsentPolicy(String instanceName) {
  Tealium.getInstance(instanceName).getConsentManager().setPolicy(null);
 }

 @Kroll.method
 public String getUserConsentPolicy(String instanceName) {
  return Tealium.getInstance(instanceName).getConsentManager().getPolicy();
 }


 @Kroll.method
 public void enableAdIdentifier(String instanceName, boolean persistent) {
  if (appContext == null) {
   return;
  }
  if (persistent) {
   AdIdentifier.setIdPersistent(instanceName, appContext);
  } else {
   AdIdentifier.setIdVolatile(instanceName, appContext);
  }
 }

 private void track(String instanceName, String eventType, KrollDict eventData) {
  try {
   String eventId = (String) eventData.get("link_id");
   String screenTitle = (String) eventData.get("screen_title");
   final Tealium instance = Tealium.getInstance(instanceName);

   if (instanceName == null) {
    Log.e(LOG_TAG, "Instance Name not specified. Please add a valid instance name to the tracking call.");
   } else if (instance == null) {
    Log.e(LOG_TAG, "Library failed to initialize correctly. Please check account/profile/environment combination in init call.");
   } else if (eventType == null) {
    Log.e(LOG_TAG, "Event type not specified. Please pass either link or view as event type");
   } else {
    if (eventType.toLowerCase().equals("view")) {
     instance.trackView(screenTitle, eventData);
    } else if (eventType.toLowerCase().equals("link")) {
     instance.trackEvent(eventId, eventData);
    }
   }
  } catch (Throwable t) {
   Log.e(LOG_TAG, "Error attempting track call.", t);
  }
 }

 @Kroll.method
 public void triggerCrash() {
  if (!this.isDevBuild) {
   return;
  }
  final Handler handler = new Handler();
  handler.postDelayed(new Runnable() {
   @Override
   public void run() {
    throw new RuntimeException("Tealium Crash Triggered!");
   }
  }, 1000);

 }

 @Kroll.method
 public void trackEvent(String instanceName, String eventName, KrollDict dataLayer) {
  if (eventName != null) {
   dataLayer.put("link_id", eventName);
  }
  track(instanceName, TRACK_TYPE_EVENT, dataLayer);
 }

 @Kroll.method
 public void trackView(String instanceName, String screenName, KrollDict dataLayer) {
  if (screenName != null) {
   dataLayer.put("screen_title", screenName);
  }
  track(instanceName, TRACK_TYPE_VIEW, dataLayer);
 }

 @Kroll.method
 public void setVolatile(String instanceName, KrollDict data) {
  final Tealium instance = Tealium.getInstance(instanceName);
  if (data == null) {
   return;
  }
  if (instance == null) {
   return;
  }
  for (Map.Entry < String, Object > entry: data.entrySet()) {
   String keyName = entry.getKey();
   Object value = entry.getValue();
   if (value == null) {
    value = "";
   }
   if (value instanceof String) {
    if (value.equals("")) {
     instance.getDataSources().getVolatileDataSources().remove(keyName);
    } else {
     instance.getDataSources().getVolatileDataSources().put(keyName, (String) value);
    }
   } else if (value instanceof Object[]) {
    Set < String > s = this.stringArrayToStringSet(objectArrayToStringArray((Object[]) value));
    instance.getDataSources().getVolatileDataSources().put(keyName, s);
   } else if (value instanceof HashMap) {
    HashMap < String, Object > obj = (HashMap < String, Object > ) value;
    instance.getDataSources().getVolatileDataSources().put(keyName, obj);
   }
  }
 }

 @Kroll.method
 public void setPersistent(String instanceName, KrollDict data) {
  final Tealium instance = Tealium.getInstance(instanceName);
  if (data == null) {
   return;
  }
  if (instance == null) {
   return;
  }
  for (Map.Entry < String, Object > entry: data.entrySet()) {
   String keyName = entry.getKey();
   Object value = entry.getValue();
   if (value == null) {
    value = "";
   }
   if (value instanceof String) {
    if (value.equals("")) {
     instance.getDataSources().getPersistentDataSources().edit().remove(keyName).apply();
    } else {
     instance.getDataSources().getPersistentDataSources().edit().putString(keyName, (String) value).apply();
    }
   } else if (value instanceof Object[]) {
    Set < String > s = this.stringArrayToStringSet(objectArrayToStringArray((Object[]) value));
    instance.getDataSources().getPersistentDataSources().edit().putStringSet(keyName, s).apply();
   }
  }
 }

 @Kroll.method
 public Object getVolatile(String instanceName, String keyName) {
  final Tealium instance = Tealium.getInstance(instanceName);
  if (keyName == null) {
   return null;
  }
  if (instance == null) {
   return null;
  }

  Object value = instance.getDataSources().getVolatileDataSources().get(keyName);
  if (value instanceof String) {
   return (String) value;
  } else if (value instanceof HashSet) {
   return ((HashSet) value).toArray(new String[0]);
  } else if (value instanceof HashMap) {
   return (HashMap < String, Object > ) value;
  }
  return null;
 }

 @Kroll.method
 public Object getPersistent(String instanceName, String keyName) {
  final Tealium instance = Tealium.getInstance(instanceName);
  if (keyName == null) {
   return null;
  }
  if (instance == null) {
   return null;
  }

  SharedPreferences persistent = instance.getDataSources().getPersistentDataSources();
  Map < String, ? > allPersistentData = persistent.getAll();
  Object value = allPersistentData.get(keyName);

  if (value instanceof String) {
   return (String) value;
  } else if (value instanceof HashSet) {
   return ((HashSet) value).toArray(new String[0]);
  }
  return null;
 }

 @Kroll.method
 public void addRemoteCommand(final String instanceName, final String commandId, final KrollFunction callback) {
  final Tealium instance = Tealium.getInstance(instanceName);
  final Handler handler = new Handler();
  handler.postDelayed(new Runnable() {
   @Override
   public void run() {
    instance.addRemoteCommand(new RemoteCommand(commandId, "Auto generated Titanium remote command") {
     @Override
     protected void onInvoke(Response response) throws Exception {
      JSONObject resp = response.getRequestPayload();
      String jsonString = resp.toString();
      String[] responseData = {
       jsonString
      };
      callback.call(getKrollObject(), responseData);
     }
    });
   }
  }, 500);
 }

 private String[] objectArrayToStringArray(Object[] objectArray) {
  return Arrays.copyOf(objectArray, objectArray.length, String[].class);
 }

 private Set < String > stringArrayToStringSet(String[] array) {
  Set < String > strSet = new HashSet < String > ();
  for (int i = 0; i < array.length; i++) {
   try {
    strSet.add(array[i]);
   } catch (Exception e) {
    Log.e(LCAT, e.toString());
   }
  }
  return strSet;
 }
}