import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import WelcomeImage from "../components/WelcomeImage"

export default function Index() {
  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar style="light" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section con gradiente */}
        <LinearGradient
          colors={["#DC2626", "#1E40AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-16 pb-12 px-6"
        >
            {/* Bandera chilena decorativa */}
            <View className="h-4 flex-row -mx-6">
              <View className="flex-1 bg-red-600" />
              <View className="flex-1 bg-white" />
              <View className="flex-1 bg-blue-600" />
            </View>
            {/* Logo/Imagen */}
            <View className="mb-6 -mx-6">
              <Image 
                source={require("../../assets/images/ImagenWelcomeChile.jpg")} 
                className="w-full h-60"
                resizeMode="cover"
              />
            </View>

          {/* Título principal */}
          <Text className="text-5xl font-black text-white text-center mb-3 tracking-tight">QUIZ FÚTBOL</Text>
          <Text className="text-4xl font-black text-white text-center mb-6 tracking-tight">CHILENO</Text>

          {/* Subtítulo */}
          <Text className="text-lg text-white/90 text-center mb-8 leading-7 px-4">
            Demuestra cuánto sabes sobre la historia y pasión del fútbol chileno
          </Text>

          {/* Botón principal */}
           <TouchableOpacity
             className="bg-white mx-8 py-5 rounded-2xl shadow-2xl active:scale-95"
             onPress={() => router.push("./categories")}
           >
             <Text className="text-red-600 text-xl font-black text-center tracking-wide">COMENZAR A JUGAR</Text>
           </TouchableOpacity>
        </LinearGradient>

        {/* Sección de categorías */}
       

        {/* Estadísticas */}
        <View className="px-6 py-8 bg-slate-900">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-4xl font-black text-red-500 mb-1">200+</Text>
              <Text className="text-white/70 text-sm">Preguntas</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl font-black text-blue-500 mb-1">10</Text>
              <Text className="text-white/70 text-sm">Categorías</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl font-black text-white mb-1">5K+</Text>
              <Text className="text-white/70 text-sm">Jugadores</Text>
            </View>
          </View>
        </View>

        {/* CTA Final */}
        <View className="px-6 py-12 bg-slate-950 items-center">
          <Text className="text-2xl font-bold text-white text-center mb-4">¿Listo para el desafío?</Text>
          <Text className="text-white/70 text-center mb-6 px-4">
            Compite con otros fanáticos y demuestra tu conocimiento
          </Text>
           <TouchableOpacity
             className="bg-red-600 px-10 py-4 rounded-2xl active:scale-95 shadow-lg"
             onPress={() => router.push("./quiz")}
           >
             <Text className="text-white text-lg font-bold">Registrate!</Text>
           </TouchableOpacity>
        </View>

        {/* Footer decorativo */}
        <View className="h-3 flex-row">
          <View className="flex-1 bg-red-600" />
          <View className="flex-1 bg-white" />
          <View className="flex-1 bg-blue-600" />
        </View>
      </ScrollView>
    </View>
  )
}
