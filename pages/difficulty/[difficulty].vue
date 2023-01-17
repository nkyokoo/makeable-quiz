<template>
  <v-card>
    <v-card-title>
      <h1>Quiz</h1>
    </v-card-title>
    <v-carousel>
      <v-carousel-item v-for="q in questions">
        <v-card>
          <v-card-title>
            <h1>{{ q.question }}</h1>
          </v-card-title>
          <v-card-text>
            <v-radio v-for="a in this.shuffleAnswers(q)" :value="a">
              {{ a.answer }}
            </v-radio>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script lang="ts">
import { Question } from "././interfaces/question";

export default {
  name: "Quiz",
  middleware: "customAuth",
  data() {
    return {
      questions: [] as Question[],
      answers: [],
    };
  },
  methods: {
    shuffleAnsers(question: Question) {
      const tempAnswers: string[] = this.questions;
      tempAnswers.push(question.correct_answer);
      return this.shuffle(tempAnswers);
    },
    shuffle(array: string[]) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
  async mounted() {
    const { data } = await this.$fetch.get(
      `https://opentdb.com/api.php?amount=15&category=9&difficulty=${this.$route.params.difficulty}&type=multiple`
    );
    this.questions = data.results;
  },
};
</script>
