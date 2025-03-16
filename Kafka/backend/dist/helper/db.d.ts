export declare function addTodo({ title }: {
    title: string;
}): Promise<{
    title: string;
    id: number;
}>;
export declare function getTodos(): Promise<{
    title: string;
    id: number;
}[]>;
