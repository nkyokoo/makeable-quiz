<template>
  <v-card>
    <v-card-title>
      <h1>Quiz</h1>
      <v-spacer></v-spacer>
      score: {{ score }}
    </v-card-title>
    <v-carousel v-if="shuffledQuestions.length !== 0" height="600" hide-delimiters :progress="true">
      <v-carousel-item v-for="(q, i) in shuffledQuestions" :key="i">
        <v-card height="600" :disabled="q.answered">
          <v-row>
            <v-col></v-col>
            <v-col>
              <h2 v-html="q.question.question"></h2>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-radio-group v-model="chosenAnswer">
                <v-row>
                  <v-col v-for="a in q.answers">
                    <v-radio style="margin:1rem; width: 15rem" :value="a">
                      {{ a }}
                    </v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-alert type="success" v-if="q.correct && q.answered"> You are correct! it was {{
                q.question.correct_answer
              }}</v-alert>
              <v-alert type="error" v-if="!q.correct && q.answered"> Wrong, it was {{
                q.question.correct_answer
              }}</v-alert>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col><v-btn @click="checkAnswer(q, 'question' + i)">
                <v-icon>mdi-check</v-icon>
                Choose Answer
              </v-btn></v-col>
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
import { mapState, storeToRefs, _UnwrapAll } from "pinia";
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
    getAnswers(question: Question) {
      const tempAnswers = question.incorrect_answers;
      tempAnswers.push(question.correct_answer);
      return this.shuffleAnswers(tempAnswers);
    },
    shuffleAnswers(tempAnswers: string[]) {
      for (let i = tempAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = tempAnswers[i];
        tempAnswers[i] = tempAnswers[j];
        tempAnswers[j] = temp;
      }
      return tempAnswers;
    },
    checkAnswer(input: any, ref: string) {
      console.log("clicked")
      if (input.question.correct_answer === this.chosenAnswer) {
        this.updateScore();
        input.answered = true;
        input.correct = true;
      } else {
        input.answered = true;
        input.correct = false;
      }
    },
    async getData() {
      if (this.questions.length == 0 || this.difficulty != this.$route.params.difficulty) {
        const { data } = await useFetch(
          `https://opentdb.com/api.php?amount=10&category=23&difficulty=${this.$route.params.difficulty}&type=multiple&token=${this.sessionToken}`
        )
        const result = data.value as QuizResult;
        this.updateQuestions(result.results);
        this.updateDifficulty(this.$route.params.difficulty.toString());
        this.resetScore();
      }
      const arr = this.questions
      for (let q of arr) {
        this.shuffledQuestions.push({
          question: q,
          answers: this.getAnswers(q),
          correct: false,
          answered: false,
        })
      }
    }
  },
  computed: {
    ...mapState(useQuizStore, ['questions', 'score', 'difficulty'])
  },
  async mounted() {
    await this.getData();
  },
  beforeUnmount() {
    this.shuffledQuestions = [];
  },
  watch: {
    '$route.params': {
      immediate: true,
      async handler() {
        await this.getData();
      },
    },
  }
}

</script>
