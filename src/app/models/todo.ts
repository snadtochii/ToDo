export class ToDo{
    id: number;
    title: string;
    isDone: boolean;
    isEditing: boolean;

    constructor(title: string, id: number){
        this.id = id;
        this.title = title.trim();
        this.isDone = false;
        this.isEditing = false;
    }
}