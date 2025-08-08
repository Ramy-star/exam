"use server";

import { quizBuilder, type QuizBuilderInput } from "@/ai/flows/quiz-builder";
import { z } from "zod";

const QuizBuilderActionSchema = z.object({
  content: z.string().min(100, "Content must be at least 100 characters long."),
  numQuestions: z.coerce.number().min(1, "Please generate at least 1 question.").max(10, "You can generate a maximum of 10 questions at a time."),
});


export async function generateQuizAction(prevState: any, formData: FormData) {
    const validatedFields = QuizBuilderActionSchema.safeParse({
        content: formData.get("content"),
        numQuestions: formData.get("numQuestions"),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid input.",
            errors: validatedFields.error.flatten().fieldErrors,
            data: null,
        };
    }

    try {
        const result = await quizBuilder(validatedFields.data);
        if (!result || !result.questions || result.questions.length === 0) {
            return { message: "The AI failed to generate a quiz. Please try again with different content.", errors: null, data: null };
        }
        return { message: "Quiz generated successfully!", errors: null, data: result };
    } catch (error) {
        console.error(error);
        return { message: "An unexpected error occurred. Please try again.", errors: null, data: null };
    }
}
