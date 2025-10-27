import React from 'react';
import { View, Text } from 'react-native';

export default function WelcomeImage() {
  return (
    <View className="w-40 h-40 items-center justify-center relative">
      {/* Círculo principal (balón de fútbol) */}
      <View className="w-32 h-32 bg-white rounded-full items-center justify-center shadow-lg border-4 border-red-600">
        {/* Patrón de balón de fútbol */}
        <View className="absolute w-24 h-24">
          {/* Líneas del balón */}
          <View className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800"></View>
          <View className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800"></View>
          {/* Pentágonos del balón */}
          <View className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border border-gray-800 rotate-45"></View>
          <View className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border border-gray-800 rotate-45"></View>
          <View className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-800 rotate-45"></View>
          <View className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-800 rotate-45"></View>
        </View>
        
        {/* Texto "CHILE" en el centro */}
        <Text className="text-red-600 font-bold text-sm absolute">CHILE</Text>
      </View>
      
      {/* Estrellas decorativas */}
      <View className="absolute -top-2 -right-2">
        <Text className="text-yellow-400 text-2xl">⭐</Text>
      </View>
      <View className="absolute -bottom-2 -left-2">
        <Text className="text-yellow-400 text-xl">⭐</Text>
      </View>
      
      {/* Bandera chilena pequeña */}
      <View className="absolute -top-4 left-0 w-8 h-6 flex-row">
        <View className="flex-1 bg-red-600"></View>
        <View className="w-1 bg-white"></View>
        <View className="flex-1 bg-red-600"></View>
      </View>
    </View>
  );
}
