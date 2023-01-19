import { Question } from "~/interfaces/question";

export const useQuizStore = defineStore("quiz", () => {
  const questions = ref<Question[]>([]);
  const difficulty = ref<string>("");
  const score = ref<number>(0);

  if (localStorage.getItem("questions")) {
    questions.value = JSON.parse(
      window.localStorage.getItem("questions") ?? ""
    );
  }
  if (localStorage.getItem("category")) {
    difficulty.value = JSON.parse(
      window.localStorage.getItem("category") ?? ""
    );
  }

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
      window.localStorage.setItem(
        "questons",
        JSON.stringify(storageQuestions)
      );
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
