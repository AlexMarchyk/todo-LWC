import { LightningElement, track } from 'lwc';
import addTodo from '@salesforce/apex/ToDoController.addTodo';

export default class ToDoManager extends LightningElement {
   @track time="8:15 PM";
    @track greeting ="Good Evening";

    @track todos =[];
    
    connectedCallback(){
        this.getTime();
        this.populateTodos()

        setInterval(()=>{
            this.getTime();
        }, 60000 )
    }

    
    getTime (){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigital(min)} ${this.getMidDay(hour)} `;

        this.setGreeting(hour)
    }
    

    getHour(hour){
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getMidDay(hour){
        return hour >= 12 ? "PM" : "AM" 
    }

    getDoubleDigital(digit){
        return digit < 10 ? "0" + digit : digit;
    }
    
    setGreeting(hour){
        if(hour< 12){
            this.greeting ="Good Morning"
        }else if(hour >= 12 && hour < 17 ){
            this.greeting = "Good Afternoon"
        }else{
            this.greeting = "Good Evening"
        }
    }
 
    addTodoHandler(){
        const inputBox = this.template.querySelector("lightning-input");
        
        const todo ={
            todoName: inputBox.value,
            done: false
            
        }
        
        addTodo({payload:JSON.stringify(todo)}).then(response => {
            console.log('Item inserted ');
        }).catch(error =>{
            console.error('Error in inserting todo item ' + error)
        });
        // this.todos.push(todo);
        inputBox.value ="";

        
    }
    get upcomingTasks() {
        return this.todos && this.todos.length ? this.todos.filter(todo=> !todo.done) : [];
    }
    get complitedTasks() {
        return this.todos && this.todos.length ? this.todos.filter(todo=> todo.done) : [];
    }

    populateTodos(){
        const todos =[
            {
                todoId:0,
                todoName:"Feed the dog",
                done: false,
                todoDate:new Date()
            },

            {
                todoId:1,
                todoName:"Wash the car",
                done: false,
                todoDate:new Date()
            },
            {
                todoId:2,
                todoName:"Send email to manager",
                done: true,
                todoDate:new Date()
            }

        ];
        this.todos= todos;
    }

}

