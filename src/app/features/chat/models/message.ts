export interface Message {
    question: string;
    answer: string | null;
    isCompleted: boolean;
}

export interface MessageResponse {
    answer: string;
}