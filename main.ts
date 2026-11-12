// 1. Base Class - User
class User {

    public Id: number;
public name: string;
public email: string;

private Password: string;
protected Phone: string;

private _age!: number;

public notebooks: NoteBook[] = [];

constructor(
Id: number,
name: string,
email: string,
Password: string,
Phone: string,
age: number
) {
this.Id = Id;
this.name = name;
this.email = email;
this.Password = Password;
this.Phone = Phone;
this.age = age;
}

// Age validation
get age(): number {
return this._age;
}

set age(value: number) {
if (value >= 18 && value <= 60) {
this._age = value;
} else {
throw new Error("Age must be between 18 and 60");
}
}

// Display user information

displayInfo(): void {
console.log("ID:", this.Id);
console.log("Name:", this.name);
console.log("Email:", this.email);
console.log("Phone:", this.Phone);
console.log("Age:", this.age);
}

// Aggregation
addNotebook(notebook: NoteBook): void {
this.notebooks.push(notebook);
}
}

// 2. Inheritance - Admin

class Admin extends User {

manageNotes(notebook: NoteBook): void {
console.log("Admin is managing notes");
console.log("Number of notes:", notebook.getAllNotes().length);
}
}

// 3. Class - Note

class Note {

public Id: number;
public title: string;
public content: string;
public userId: User;

constructor(
Id: number,
title: string,
content: string,
userId: User
) {
this.Id = Id;
this.title = title;
this.content = content;
this.userId = userId;
}

preview(): string {
return this.content.substring(0, 50) + "...";
}
}

// 4. Composition - NoteBook

class NoteBook {

private notes: Note[] = [];

addNote(note: Note): void {
this.notes.push(note);
console.log("Note added");
}

removeNote(noteId: number): void {
this.notes = this.notes.filter(
note => note.Id !== noteId
);
}

getAllNotes(): Note[] {
return this.notes;
}
}

// 7. Generics - Storage

class DataStorage<T> {

private items: T[] = [];

addItem(item: T): void {
this.items.push(item);
}

removeItem(item: T): void {
this.items = this.items.filter(
currentItem => currentItem !== item
);
}

getAllItems(): T[] {
return this.items;
}
}

// Testing the Program

// Create User
const user1 = new User(
1,
"Mariam",
"mariam@gmail.com",
"123456",
"01512345678",
21
);

user1.displayInfo();

// Create Notebook
const notebook1 = new NoteBook();

// User owns Notebook
user1.addNotebook(notebook1);

// Create Notes
const note1 = new Note(
1,
"Study",
"Study Software Engineering and Operating Systems",
user1
);

const note2 = new Note(
2,
"Project",
"Work on the graduation project",
user1
);

// Add Notes
notebook1.addNote(note1);
notebook1.addNote(note2);

// Preview
console.log(note1.preview());

// Create Admin
const admin1 = new Admin(
2,
"Admin",
"admin@gmail.com",
"admin123",
"01112345678",
25
);

// Admin manages Notes
admin1.manageNotes(notebook1);

// Test Storage
const storage1 = new DataStorage<Note>();

storage1.addItem(note1);
storage1.addItem(note2);

console.log(storage1.getAllItems());

storage1.removeItem(note1);

console.log(storage1.getAllItems());