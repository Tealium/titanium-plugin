/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2017 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/** This code is generated, do not edit by hand. **/

#include "com.tealium.titaniumandroid.TealiumTitaniumAndroidModule.h"

#include "AndroidUtil.h"
#include "JNIUtil.h"
#include "JSException.h"
#include "TypeConverter.h"
#include "V8Util.h"



#include "com.tealium.titaniumandroid.ExampleProxy.h"

#include "org.appcelerator.kroll.KrollModule.h"

#define TAG "TealiumTitaniumAndroidModule"

using namespace v8;

namespace com {
namespace tealium {
namespace titaniumandroid {


Persistent<FunctionTemplate> TealiumTitaniumAndroidModule::proxyTemplate;
jclass TealiumTitaniumAndroidModule::javaClass = NULL;

TealiumTitaniumAndroidModule::TealiumTitaniumAndroidModule() : titanium::Proxy()
{
}

void TealiumTitaniumAndroidModule::bindProxy(Local<Object> exports, Local<Context> context)
{
	Isolate* isolate = context->GetIsolate();

	Local<FunctionTemplate> pt = getProxyTemplate(isolate);

	v8::TryCatch tryCatch(isolate);
	Local<Function> constructor;
	MaybeLocal<Function> maybeConstructor = pt->GetFunction(context);
	if (!maybeConstructor.ToLocal(&constructor)) {
		titanium::V8Util::fatalException(isolate, tryCatch);
		return;
	}

	Local<String> nameSymbol = NEW_SYMBOL(isolate, "TealiumTitaniumAndroid"); // use symbol over string for efficiency
	MaybeLocal<Object> maybeInstance = constructor->NewInstance(context);
	Local<Object> moduleInstance;
	if (!maybeInstance.ToLocal(&moduleInstance)) {
		titanium::V8Util::fatalException(isolate, tryCatch);
		return;
	}
	exports->Set(nameSymbol, moduleInstance);
}

void TealiumTitaniumAndroidModule::dispose(Isolate* isolate)
{
	LOGD(TAG, "dispose()");
	if (!proxyTemplate.IsEmpty()) {
		proxyTemplate.Reset();
	}

	titanium::KrollModule::dispose(isolate);
}

Local<FunctionTemplate> TealiumTitaniumAndroidModule::getProxyTemplate(Isolate* isolate)
{
	if (!proxyTemplate.IsEmpty()) {
		return proxyTemplate.Get(isolate);
	}

	LOGD(TAG, "TealiumTitaniumAndroidModule::getProxyTemplate()");

	javaClass = titanium::JNIUtil::findClass("com/tealium/titaniumandroid/TealiumTitaniumAndroidModule");
	EscapableHandleScope scope(isolate);

	// use symbol over string for efficiency
	Local<String> nameSymbol = NEW_SYMBOL(isolate, "TealiumTitaniumAndroid");

	Local<FunctionTemplate> t = titanium::Proxy::inheritProxyTemplate(isolate,
		titanium::KrollModule::getProxyTemplate(isolate)
, javaClass, nameSymbol);

	proxyTemplate.Reset(isolate, t);
	t->Set(titanium::Proxy::inheritSymbol.Get(isolate),
		FunctionTemplate::New(isolate, titanium::Proxy::inherit<TealiumTitaniumAndroidModule>));

	// Method bindings --------------------------------------------------------
	titanium::SetProtoMethod(isolate, t, "initTealium", TealiumTitaniumAndroidModule::initTealium);
	titanium::SetProtoMethod(isolate, t, "example", TealiumTitaniumAndroidModule::example);

	Local<ObjectTemplate> prototypeTemplate = t->PrototypeTemplate();
	Local<ObjectTemplate> instanceTemplate = t->InstanceTemplate();

	// Delegate indexed property get and set to the Java proxy.
	instanceTemplate->SetIndexedPropertyHandler(titanium::Proxy::getIndexedProperty,
		titanium::Proxy::setIndexedProperty);

	// Constants --------------------------------------------------------------

	// Dynamic properties -----------------------------------------------------
	instanceTemplate->SetAccessor(NEW_SYMBOL(isolate, "exampleProp"),
			TealiumTitaniumAndroidModule::getter_exampleProp,
			TealiumTitaniumAndroidModule::setter_exampleProp,
			Local<Value>(), DEFAULT,
			static_cast<v8::PropertyAttribute>(v8::DontDelete)
		);

	// Accessors --------------------------------------------------------------

	return scope.Escape(t);
}

// Methods --------------------------------------------------------------------
void TealiumTitaniumAndroidModule::initTealium(const FunctionCallbackInfo<Value>& args)
{
	LOGD(TAG, "initTealium()");
	Isolate* isolate = args.GetIsolate();
	HandleScope scope(isolate);

	JNIEnv *env = titanium::JNIScope::getEnv();
	if (!env) {
		titanium::JSException::GetJNIEnvironmentError(isolate);
		return;
	}
	static jmethodID methodID = NULL;
	if (!methodID) {
		methodID = env->GetMethodID(TealiumTitaniumAndroidModule::javaClass, "initTealium", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Z)V");
		if (!methodID) {
			const char *error = "Couldn't find proxy method 'initTealium' with signature '(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Z)V'";
			LOGE(TAG, error);
				titanium::JSException::Error(isolate, error);
				return;
		}
	}

	Local<Object> holder = args.Holder();
	// If holder isn't the JavaObject wrapper we expect, look up the prototype chain
	if (!JavaObject::isJavaObject(holder)) {
		holder = holder->FindInstanceInPrototypeChain(getProxyTemplate(isolate));
	}

	titanium::Proxy* proxy = NativeObject::Unwrap<titanium::Proxy>(holder);

	if (args.Length() < 8) {
		char errorStringBuffer[100];
		sprintf(errorStringBuffer, "initTealium: Invalid number of arguments. Expected 8 but got %d", args.Length());
		titanium::JSException::Error(isolate, errorStringBuffer);
		return;
	}

	jvalue jArguments[8];




	

	if (!args[0]->IsNull()) {
		Local<Value> arg_0 = args[0];
		jArguments[0].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_0);
	} else {
		jArguments[0].l = NULL;
	}

	

	if (!args[1]->IsNull()) {
		Local<Value> arg_1 = args[1];
		jArguments[1].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_1);
	} else {
		jArguments[1].l = NULL;
	}

	

	if (!args[2]->IsNull()) {
		Local<Value> arg_2 = args[2];
		jArguments[2].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_2);
	} else {
		jArguments[2].l = NULL;
	}

	

	if (!args[3]->IsNull()) {
		Local<Value> arg_3 = args[3];
		jArguments[3].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_3);
	} else {
		jArguments[3].l = NULL;
	}

	

	if (!args[4]->IsNull()) {
		Local<Value> arg_4 = args[4];
		jArguments[4].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_4);
	} else {
		jArguments[4].l = NULL;
	}

	

	if (!args[5]->IsNull()) {
		Local<Value> arg_5 = args[5];
		jArguments[5].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_5);
	} else {
		jArguments[5].l = NULL;
	}

	

	if (!args[6]->IsNull()) {
		Local<Value> arg_6 = args[6];
		jArguments[6].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_6);
	} else {
		jArguments[6].l = NULL;
	}

	if (!args[7]->IsBoolean() && !args[7]->IsNull()) {
		const char *error = "Invalid value, expected type Boolean.";
		LOGE(TAG, error);
		titanium::JSException::Error(isolate, error);
		return;
	}
	

	if (!args[7]->IsNull()) {
		Local<Boolean> arg_7 = args[7]->ToBoolean(isolate);
		jArguments[7].z =
			titanium::TypeConverter::jsBooleanToJavaBoolean(
				env, arg_7);
	} else {
		jArguments[7].z = NULL;
	}

	jobject javaProxy = proxy->getJavaObject();
	if (javaProxy == NULL) {
		args.GetReturnValue().Set(v8::Undefined(isolate));
		return;
	}
	env->CallVoidMethodA(javaProxy, methodID, jArguments);

	proxy->unreferenceJavaObject(javaProxy);



				env->DeleteLocalRef(jArguments[0].l);


				env->DeleteLocalRef(jArguments[1].l);


				env->DeleteLocalRef(jArguments[2].l);


				env->DeleteLocalRef(jArguments[3].l);


				env->DeleteLocalRef(jArguments[4].l);


				env->DeleteLocalRef(jArguments[5].l);


				env->DeleteLocalRef(jArguments[6].l);


	if (env->ExceptionCheck()) {
		titanium::JSException::fromJavaException(isolate);
		env->ExceptionClear();
	}




	args.GetReturnValue().Set(v8::Undefined(isolate));

}
void TealiumTitaniumAndroidModule::example(const FunctionCallbackInfo<Value>& args)
{
	LOGD(TAG, "example()");
	Isolate* isolate = args.GetIsolate();
	HandleScope scope(isolate);

	JNIEnv *env = titanium::JNIScope::getEnv();
	if (!env) {
		titanium::JSException::GetJNIEnvironmentError(isolate);
		return;
	}
	static jmethodID methodID = NULL;
	if (!methodID) {
		methodID = env->GetMethodID(TealiumTitaniumAndroidModule::javaClass, "example", "()Ljava/lang/String;");
		if (!methodID) {
			const char *error = "Couldn't find proxy method 'example' with signature '()Ljava/lang/String;'";
			LOGE(TAG, error);
				titanium::JSException::Error(isolate, error);
				return;
		}
	}

	Local<Object> holder = args.Holder();
	// If holder isn't the JavaObject wrapper we expect, look up the prototype chain
	if (!JavaObject::isJavaObject(holder)) {
		holder = holder->FindInstanceInPrototypeChain(getProxyTemplate(isolate));
	}

	titanium::Proxy* proxy = NativeObject::Unwrap<titanium::Proxy>(holder);

	jvalue* jArguments = 0;

	jobject javaProxy = proxy->getJavaObject();
	if (javaProxy == NULL) {
		args.GetReturnValue().Set(v8::Undefined(isolate));
		return;
	}
	jstring jResult = (jstring)env->CallObjectMethodA(javaProxy, methodID, jArguments);



	proxy->unreferenceJavaObject(javaProxy);



	if (env->ExceptionCheck()) {
		Local<Value> jsException = titanium::JSException::fromJavaException(isolate);
		env->ExceptionClear();
		return;
	}

	if (jResult == NULL) {
		args.GetReturnValue().Set(Null(isolate));
		return;
	}

	Local<Value> v8Result = titanium::TypeConverter::javaStringToJsString(isolate, env, jResult);

	env->DeleteLocalRef(jResult);


	args.GetReturnValue().Set(v8Result);

}

// Dynamic property accessors -------------------------------------------------

void TealiumTitaniumAndroidModule::getter_exampleProp(Local<Name> property, const PropertyCallbackInfo<Value>& args)
{
	Isolate* isolate = args.GetIsolate();
	HandleScope scope(isolate);

	JNIEnv *env = titanium::JNIScope::getEnv();
	if (!env) {
		titanium::JSException::GetJNIEnvironmentError(isolate);
		return;
	}
	static jmethodID methodID = NULL;
	if (!methodID) {
		methodID = env->GetMethodID(TealiumTitaniumAndroidModule::javaClass, "getExampleProp", "()Ljava/lang/String;");
		if (!methodID) {
			const char *error = "Couldn't find proxy method 'getExampleProp' with signature '()Ljava/lang/String;'";
			LOGE(TAG, error);
				titanium::JSException::Error(isolate, error);
				return;
		}
	}

	titanium::Proxy* proxy = NativeObject::Unwrap<titanium::Proxy>(args.Holder());

	if (!proxy) {
		args.GetReturnValue().Set(Undefined(isolate));
		return;
	}

	jvalue* jArguments = 0;

	jobject javaProxy = proxy->getJavaObject();
	if (javaProxy == NULL) {
		args.GetReturnValue().Set(v8::Undefined(isolate));
		return;
	}
	jstring jResult = (jstring)env->CallObjectMethodA(javaProxy, methodID, jArguments);



	proxy->unreferenceJavaObject(javaProxy);



	if (env->ExceptionCheck()) {
		Local<Value> jsException = titanium::JSException::fromJavaException(isolate);
		env->ExceptionClear();
		return;
	}

	if (jResult == NULL) {
		args.GetReturnValue().Set(Null(isolate));
		return;
	}

	Local<Value> v8Result = titanium::TypeConverter::javaStringToJsString(isolate, env, jResult);

	env->DeleteLocalRef(jResult);


	args.GetReturnValue().Set(v8Result);

}

void TealiumTitaniumAndroidModule::setter_exampleProp(Local<Name> property, Local<Value> value, const PropertyCallbackInfo<void>& args)
{
	Isolate* isolate = args.GetIsolate();
	HandleScope scope(isolate);

	JNIEnv *env = titanium::JNIScope::getEnv();
	if (!env) {
		LOGE(TAG, "Failed to get environment, exampleProp wasn't set");
		return;
	}

	static jmethodID methodID = NULL;
	if (!methodID) {
		methodID = env->GetMethodID(TealiumTitaniumAndroidModule::javaClass, "setExampleProp", "(Ljava/lang/String;)V");
		if (!methodID) {
			const char *error = "Couldn't find proxy method 'setExampleProp' with signature '(Ljava/lang/String;)V'";
			LOGE(TAG, error);
		}
	}

	titanium::Proxy* proxy = NativeObject::Unwrap<titanium::Proxy>(args.Holder());
	if (!proxy) {
		return;
	}

	jvalue jArguments[1];

	

	if (!value->IsNull()) {
		Local<Value> arg_0 = value;
		jArguments[0].l =
			titanium::TypeConverter::jsValueToJavaString(
				isolate,
				env, arg_0);
	} else {
		jArguments[0].l = NULL;
	}

	jobject javaProxy = proxy->getJavaObject();
	if (javaProxy == NULL) {
		return;
	}
	env->CallVoidMethodA(javaProxy, methodID, jArguments);

	proxy->unreferenceJavaObject(javaProxy);



				env->DeleteLocalRef(jArguments[0].l);


	if (env->ExceptionCheck()) {
		titanium::JSException::fromJavaException(isolate);
		env->ExceptionClear();
	}




}



} // titaniumandroid
} // tealium
} // com
