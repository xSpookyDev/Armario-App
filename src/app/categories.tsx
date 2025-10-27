import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function CategoriesScreen() {
  const categories = [
    {
      id: 1,
      title: "Chilean Premier League",
      description: "Torneo local actual: equipos, jugadores y estadísticas de la Primera División",
      icon: "⚽",
      color: "from-emerald-600 to-emerald-700",
      borderColor: "border-emerald-500/30",
      questions: 60
    },
    {
      id: 2,
      title: "Selección Nacional",
      description: "Copas América, mundiales y momentos históricos de La Roja",
      icon: "🏆",
      color: "from-red-600 to-red-700",
      borderColor: "border-red-500/30",
      questions: 50
    },
    {
      id: 3,
      title: "Leyendas del Fútbol",
      description: "Zamorano, Salas, Vidal, Alexis y más íconos chilenos",
      icon: "⭐",
      color: "from-blue-600 to-blue-700",
      borderColor: "border-blue-500/30",
      questions: 45
    },
    {
      id: 4,
      title: "Estadios y Clubes",
      description: "Historia de los equipos y estadios más emblemáticos",
      icon: "🏟️",
      color: "from-slate-700 to-slate-800",
      borderColor: "border-slate-600/30",
      questions: 40
    },
    {
      id: 5,
      title: "Mundiales",
      description: "Chile en los mundiales de fútbol",
      icon: "🌍",
      color: "from-green-600 to-green-700",
      borderColor: "border-green-500/30",
      questions: 35
    },
    {
      id: 6,
      title: "Copa América",
      description: "La historia de Chile en la Copa América",
      icon: "🥇",
      color: "from-yellow-600 to-yellow-700",
      borderColor: "border-yellow-500/30",
      questions: 30
    },
    {
      id: 7,
      title: "Fútbol Femenino",
      description: "La Roja Femenina y sus logros",
      icon: "⚽",
      color: "from-pink-600 to-pink-700",
      borderColor: "border-pink-500/30",
      questions: 25
    }
  ];

  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar style="light" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header con gradiente */}
        <LinearGradient
          colors={["#DC2626", "#1E40AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pt-16 pb-8 px-6"
        >
          {/* Bandera chilena decorativa */}
          <View className="h-4 flex-row -mx-6 mb-6">
            <View className="flex-1 bg-red-600" />
            <View className="flex-1 bg-white" />
            <View className="flex-1 bg-blue-600" />
          </View>

          {/* Botón de regreso */}
          <TouchableOpacity
            className="mb-6"
            onPress={() => router.back()}
          >
            <Text className="text-white text-lg font-bold">← Volver</Text>
          </TouchableOpacity>

          {/* Título */}
          <Text className="text-4xl font-black text-white text-center mb-2">
            CATEGORÍAS
          </Text>
          <Text className="text-lg text-white/90 text-center mb-6">
            Elige tu categoría favorita y demuestra tu conocimiento
          </Text>
        </LinearGradient>

        {/* Lista de categorías */}
        <View className="px-6 py-8">
          <View className="gap-4">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`bg-gradient-to-r ${category.color} p-6 rounded-2xl border-2 ${category.borderColor} active:scale-95`}
                onPress={() => router.push("./quiz")}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-4xl mr-4">{category.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-white mb-1">
                        {category.title}
                      </Text>
                      <Text className="text-white/80 text-sm">
                        {category.questions} preguntas
                      </Text>
                    </View>
                  </View>
                  <Text className="text-white text-2xl">→</Text>
                </View>
                <Text className="text-white/80 leading-5">
                  {category.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer con estadísticas */}
        <View className="px-6 py-8 bg-slate-900">
          <Text className="text-xl font-bold text-white text-center mb-6">
            Estadísticas Generales
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-3xl font-black text-red-500 mb-1">200+</Text>
              <Text className="text-white/70 text-sm">Preguntas</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-black text-blue-500 mb-1">7</Text>
              <Text className="text-white/70 text-sm">Categorías</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-black text-white mb-1">5K+</Text>
              <Text className="text-white/70 text-sm">Jugadores</Text>
            </View>
          </View>
        </View>

        {/* Footer decorativo */}
        <View className="h-3 flex-row">
          <View className="flex-1 bg-red-600" />
          <View className="flex-1 bg-white" />
          <View className="flex-1 bg-blue-600" />
        </View>
      </ScrollView>
    </View>
  );
}
