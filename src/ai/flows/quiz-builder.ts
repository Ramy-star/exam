// A Genkit Flow for creating multiple-choice questions and answers from content.
//
// - quizBuilder - A function that handles the quiz generation process.
// - QuizBuilderInput - The input type for the quizBuilder function.
// - QuizBuilderOutput - The return type for the quizBuilder function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizBuilderInputSchema = z.object({
  content: z
    .string()
    .describe('The content from a webpage or document to generate questions from.'),
  numQuestions: z.number().default(5).describe('The number of questions to generate.'),
});
export type QuizBuilderInput = z.infer<typeof QuizBuilderInputSchema>;

const QuizBuilderOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      answer: z.string(),
    })
  ),
});
export type QuizBuilderOutput = z.infer<typeof QuizBuilderOutputSchema>;

export async function quizBuilder(input: QuizBuilderInput): Promise<QuizBuilderOutput> {
  return quizBuilderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quizBuilderPrompt',
  input: {schema: QuizBuilderInputSchema},
  output: {schema: QuizBuilderOutputSchema},
  prompt: `You are a quiz generator.  Given the following content, generate multiple choice questions and answers.  Format the output as a JSON object which conforms to the QuizBuilderOutputSchema typescript definition.

Content: {{{content}}}

Number of questions to generate: {{{numQuestions}}}`,
});

const quizBuilderFlow = ai.defineFlow(
  {
    name: 'quizBuilderFlow',
    inputSchema: QuizBuilderInputSchema,
    outputSchema: QuizBuilderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
