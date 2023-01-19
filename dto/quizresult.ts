import { Question } from '~/interfaces/question';

export interface QuizResult {
    response_code: number;
    results: Question[];
 }