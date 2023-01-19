import { Question } from "~/interfaces/question";
import { useStorage } from "@vueuse/core";

export const useQuizStore = defineStore("quiz", () => {
  const questions = ref<Question[]>(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("questons") || "[]") : []);
  const difficulty = ref<string>(typeof window !== "undefined" ? window.localStorage.getItem("difficulty") || "" : "");
  const score = ref<number>(typeof window !== "undefined" ? parseInt(window.localStorage.getItem("score") || "0") : 0);

  const fetchQuestions = computed((): Question[] => {
    return questions.value;
  });
  const fetchScore = computed((): number => {
    return score.value;
  });
  const fetchDiffculty = computed((): string => {
    return difficulty.value;
  });

  function setQuestions(input: Question[]) {
    questions.value = input;
  }
  function setScore(input: number) {
    score.value = input;
  }
  function setDifficulty(input: string) {
    difficulty.value = input;
  }

  watch(
    questions,
    (storageQuestions) => {
      window.localStorage.setItem("questons", JSON.stringify(storageQuestions));
    },
    { deep: true }
  );
  return {
    questions,
    score,
    difficulty,
    fetchQuestions,
    fetchScore,
    fetchDiffculty,
    setQuestions,
    setScore,
    setDifficulty,
  };
});
