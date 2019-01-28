package com.eclipsesource.icat.dynamicdocu;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.stream.JsonWriter;

public class JsonUtil<T> {
	
	private final Gson gson;
	
	public JsonUtil(Gson gson) {
		this.gson = gson;
	}

	public void write(JsonWriter out, T value) throws IOException {
		if (value == null) {
			out.nullValue();
		} else {
			try {
				out.beginObject();
				Set<String> written = new HashSet<>();
				writeProperties(out, value, value.getClass(), written);
				out.endObject();
			} catch (IllegalAccessException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
	protected void writeProperties(JsonWriter out, T instance, Class<?> type, Set<String> written)
			throws IOException, IllegalAccessException {
		for (Field field : type.getDeclaredFields()) {
			int modifiers = field.getModifiers();
			if (!Modifier.isTransient(modifiers) && !Modifier.isStatic(modifiers)
					&& written.add(field.getName())) {
				writeProperty(out, instance, field);
			}
		}
		Class<?> superType = type.getSuperclass();
		if (superType != null) {
			writeProperties(out, instance, superType, written);
		}
	}
	
	protected void writeProperty(JsonWriter out, T instance, Field field) throws IOException, IllegalAccessException {
		field.setAccessible(true);
		out.name(field.getName());
		Object value = field.get(instance);
		if (value == null)
			out.nullValue();
		else if (value == instance)
			throw new RuntimeException("Object has a reference to itself.");
		else
			gson.toJson(value, value.getClass(), out);
	}
}
