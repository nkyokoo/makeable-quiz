import { Question } from "~/infterfaces/question";

export const useQuizStore = defineStore({
  id: "auth",
  state: () => ({
    questions: [] as Question[],
    Score: 0,
  }),
  getters: {
    fetchQuestions: (state) => state.questions,
    fetchScore: (state) => state.Score,
  },
  actions: {
    setQuestions(questions: Question[]) {
      this.questions = questions;
    },
    setScore(score: number) {
      this.Score = score;
    },
  },
});
