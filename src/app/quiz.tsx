import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState, useEffect } from "react";
const copaAmericaData = require("../../assets/data/copaAmerica.json");

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
}

export default function QuizScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState("fácil");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Función para mezclar array
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Función para seleccionar preguntas por dificultad
  const selectQuestionsByDifficulty = (difficulty: string, count: number) => {
    const filteredQuestions = copaAmericaData.filter((q: Question) => q.difficulty === difficulty);
    return shuffleArray(filteredQuestions).slice(0, count);
  };

  // Inicializar quiz
  useEffect(() => {
    const easyQuestions = selectQuestionsByDifficulty("fácil", 3);
    const mediumQuestions = selectQuestionsByDifficulty("media", 2);
    const hardQuestions = selectQuestionsByDifficulty("difícil", 1);
    
    const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    setQuestions(shuffleArray(allQuestions));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    setShowResult(true);
    
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionsAnswered(questionsAnswered + 1);
      
      // Actualizar dificultad basada en progreso
      if (questionsAnswered < 3) {
        setCurrentDifficulty("fácil");
      } else if (questionsAnswered < 5) {
        setCurrentDifficulty("media");
      } else {
        setCurrentDifficulty("difícil");
      }
    } else {
      // Quiz terminado
      Alert.alert(
        "¡Quiz Completado!",
        `Tu puntuación: ${score + (selectedAnswer === currentQuestion.answer ? 1 : 0)}/${questions.length}`,
        [
          {
            text: "Volver a Categorías",
            onPress: () => router.back()
          },
          {
            text: "Jugar de Nuevo",
            onPress: () => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setQuestionsAnswered(0);
              setCurrentDifficulty("fácil");
            }
          }
        ]
      );
    }
  };

  if (questions.length === 0) {
    return (
      <View className="flex-1 bg-slate-950 justify-center items-center">
        <Text className="text-white text-lg">Cargando preguntas...</Text>
      </View>
    );
  }

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

          {/* Progreso */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </Text>
            <Text className="text-white text-lg font-bold">
              Puntuación: {score}
            </Text>
          </View>

          {/* Barra de progreso */}
          <View className="w-full bg-white/20 rounded-full h-2 mb-4">
            <View 
              className="bg-white rounded-full h-2"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </View>

          {/* Dificultad actual */}
          <View className="items-center">
            <Text className="text-white/80 text-sm mb-2">Dificultad actual:</Text>
            <View className={`px-4 py-2 rounded-full ${
              currentDifficulty === "fácil" ? "bg-green-500" :
              currentDifficulty === "media" ? "bg-yellow-500" : "bg-red-500"
            }`}>
              <Text className="text-white font-bold capitalize">{currentDifficulty}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Pregunta */}
        <View className="px-6 py-8">
          <Text className="text-2xl font-bold text-white text-center mb-8 leading-8">
            {currentQuestion.question}
          </Text>

          {/* Opciones */}
          <View className="gap-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 rounded-2xl border-2 ${
                  selectedAnswer === option
                    ? showResult
                      ? option === currentQuestion.answer
                        ? "bg-green-500 border-green-400"
                        : "bg-red-500 border-red-400"
                      : "bg-blue-500 border-blue-400"
                    : showResult && option === currentQuestion.answer
                    ? "bg-green-500 border-green-400"
                    : "bg-slate-700 border-slate-600"
                }`}
                onPress={() => !showResult && handleAnswerSelect(option)}
                disabled={showResult}
              >
                <Text className={`text-lg font-bold text-center ${
                  selectedAnswer === option || (showResult && option === currentQuestion.answer)
                    ? "text-white"
                    : "text-white"
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botones de acción */}
          {!showResult ? (
            <TouchableOpacity
              className={`py-4 rounded-2xl ${
                selectedAnswer ? "bg-red-600" : "bg-slate-600"
              }`}
              onPress={handleSubmitAnswer}
              disabled={!selectedAnswer}
            >
              <Text className="text-white text-lg font-bold text-center">
                {selectedAnswer ? "Confirmar Respuesta" : "Selecciona una opción"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-blue-600 py-4 rounded-2xl"
              onPress={handleNextQuestion}
            >
              <Text className="text-white text-lg font-bold text-center">
                {currentQuestionIndex < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultado Final"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Resultado de la pregunta */}
          {showResult && (
            <View className="mt-6 p-4 rounded-2xl bg-slate-800">
              <Text className={`text-lg font-bold text-center mb-2 ${
                selectedAnswer === currentQuestion.answer ? "text-green-400" : "text-red-400"
              }`}>
                {selectedAnswer === currentQuestion.answer ? "¡Correcto! 🎉" : "Incorrecto ❌"}
              </Text>
              <Text className="text-white/80 text-center">
                La respuesta correcta es: {currentQuestion.answer}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
