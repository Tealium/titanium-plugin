/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/** This is generated, do not edit by hand. **/

#include <jni.h>

#include "Proxy.h"

namespace com {
namespace tealium {
namespace titaniumandroid {

class TealiumTitaniumAndroidModule : public titanium::Proxy
{
public:
	explicit TealiumTitaniumAndroidModule();

	static void bindProxy(v8::Local<v8::Object>, v8::Local<v8::Context>);
	static v8::Local<v8::FunctionTemplate> getProxyTemplate(v8::Isolate*);
	static void dispose(v8::Isolate*);

	static jclass javaClass;

private:
	static v8::Persistent<v8::FunctionTemplate> proxyTemplate;

	// Methods -----------------------------------------------------------
	static void initTealium(const v8::FunctionCallbackInfo<v8::Value>&);
	static void trackView(const v8::FunctionCallbackInfo<v8::Value>&);
	static void getPersistent(const v8::FunctionCallbackInfo<v8::Value>&);
	static void enableAdIdentifier(const v8::FunctionCallbackInfo<v8::Value>&);
	static void getVolatile(const v8::FunctionCallbackInfo<v8::Value>&);
	static void triggerCrash(const v8::FunctionCallbackInfo<v8::Value>&);
	static void setVolatile(const v8::FunctionCallbackInfo<v8::Value>&);
	static void setPersistent(const v8::FunctionCallbackInfo<v8::Value>&);
	static void trackEvent(const v8::FunctionCallbackInfo<v8::Value>&);
	static void addRemoteCommand(const v8::FunctionCallbackInfo<v8::Value>&);

	// Dynamic property accessors ----------------------------------------

};

} // titaniumandroid
} // tealium
} // com
