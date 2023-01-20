<template>
  <v-card>
    <v-card-title style="text-align: center;">
      <h1>Quiz</h1>
      <v-spacer></v-spacer>
      <p>score: {{ score }}</p>
    </v-card-title>
    <v-carousel v-if="shuffledQuestions.length !== 0" :height="$vuetify.display.height / 1.5" hide-delimiters
      :progress="true" :show-arrows="!$vuetify.display.mobile">
      <v-carousel-item v-for="(q, i) in shuffledQuestions" :key="i">
        <v-card :height="$vuetify.display.height" :disabled="q.answered">
          <v-row style="margin-bottom: 2rem">
            <v-col v-if="!$vuetify.display.mobile"></v-col>
            <v-col style="text-align: center;">
              <h2 v-html="q.question.question"></h2>
            </v-col>
            <v-col v-if="!$vuetify.display.mobile"></v-col>
          </v-row>
          <v-row>
            <v-col :cols="!$vuetify.display.mobile ? '' : 2"></v-col>
            <v-col>
              <v-radio-group v-model="chosenAnswer">
                <div class="answersGrid">
                  <div :key="a" v-for="a in q.answers">
                    <v-radio style="margin: 1rem; width: max-content" :value="a">
                      {{ a }}
                    </v-radio>
                  </div>
                </div>
              </v-radio-group>
            </v-col>
            <v-col v-if="!$vuetify.display.mobile"></v-col>
          </v-row>
          <v-row>
            <v-col v-if="!$vuetify.display.mobile"></v-col>
            <v-col>
              <v-alert type="success" v-if="q.correct && q.answered">
                You are correct! it was {{ q.question.correct_answer }}</v-alert>
              <v-alert type="error" v-if="!q.correct && q.answered">
                Wrong, it was {{ q.question.correct_answer }}</v-alert>
            </v-col>
            <v-col v-if="!$vuetify.display.mobile"></v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-btn :disabled="!chosenAnswer" @click="checkAnswer(q, 'question' + i)">
                <v-icon>mdi-check</v-icon>
                Choose Answer
              </v-btn>
              <p style="text-align: center; margin-top: .3rem;" v-if="$vuetify.display.mobile && q.answered">
                Slide to the right to see the next question
              </p>
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { Question } from "~/interfaces/question";
import { QuizResult } from "~/dto/quizResult";
import { mapState, _UnwrapAll } from "pinia";
import { useQuizStore } from "~~/stores/QuizStore";
import { useAuthStore } from "~~/stores/AuthStore";

export default {
  name: "Quiz",
  setup() {
    definePageMeta({
      middleware: "custom-auth",
    });
    function updateScore() {
      const store = useQuizStore();
      store.setScore(store.score + 1);
    }
    function updateDifficulty(input: string) {
      const store = useQuizStore();
      store.setDifficulty(input);
    }
    function updateQuestions(input: Question[]) {
      const store = useQuizStore();
      store.setQuestions(input);
    }
    function resetScore() {
      const store = useQuizStore();
      store.setScore(0);
    }
    const { sessionToken } = useAuthStore();
    return {
      sessionToken,
      updateScore,
      updateDifficulty,
      updateQuestions,
      resetScore,
    };
  },
  data() {
    return {
      shuffledQuestions: [] as any,
      chosenAnswer: "",
    };
  },
  methods: {
    shuffleAnswers(tempAnswers: string[]) {
      for (let i = tempAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempAnswers[i], tempAnswers[j]] = [tempAnswers[j], tempAnswers[i]];
      }
      return tempAnswers;
    },
    checkAnswer(input: any, ref: string) {
      console.log("clicked");
      if (input.question.correct_answer === this.chosenAnswer) {
        this.updateScore();
        input.answered = true;
        input.correct = true;
        this.chosenAnswer = "";
      } else {
        input.answered = true;
        input.correct = false;
        this.chosenAnswer = "";
      }
    },
    async getData() {
      this.shuffledQuestions = [];
      if (
        this.questions.length == 0 ||
        this.difficulty != this.$route.params.difficulty
      ) {
        const { data } = await useFetch(
          `https://opentdb.com/api.php?amount=10&category=23&difficulty=${this.$route.params.difficulty}&type=multiple&token=${this.sessionToken}`
        );
        const result = data.value as QuizResult;
        this.updateQuestions(result.results);
        this.updateDifficulty(this.$route.params.difficulty.toString());
        this.resetScore();
      }
      const arr = this.questions;
      for (let q of arr) {
        this.shuffledQuestions.push({
          question: q,
          answers: this.shuffleAnswers([
            q.correct_answer,
            ...q.incorrect_answers,
          ]),
          correct: false,
          answered: false,
        });
      }
    },
  },
  computed: {
    ...mapState(useQuizStore, ["questions", "score", "difficulty"]),
  },
  async mounted() {
    await this.getData();
  },
  beforeUnmount() {
    this.shuffledQuestions = [];
  },
  watch: {
    "$route.params": {
      immediate: true,
      async handler() {
        await this.getData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.answersGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: .1rem;
}
</style>
