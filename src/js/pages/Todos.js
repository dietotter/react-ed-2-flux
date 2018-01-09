import React from 'react'

import Todo from '../components/Todo'
import * as TodoActions from '../actions/TodoActions'
import TodoStore from '../stores/TodoStore'

export default class Todos extends React.Component {
    constructor () {
        super()
        this.getTodos = this.getTodos.bind(this)
        this.state = {
            todos: TodoStore.getAll()
        }
    }

    // (!) a comment in tutorial told, that
    // 1) React docs says to avoid any subscriptions in WillMount function/callback
    // 2) Instead of subscribing to change event on componentWillMount do it in componentDidMount instead, as it is called on client side only (? didn't understand what 'it' refers to)
    //
    // whenever component is about to render to DOM for the FIRST time ONLY, it will fire componentWillMount(), if it exists
    componentWillMount(){
        // add event listener (whenever TodoStore changes, update component)
        TodoStore.on('change', this.getTodos)
        console.log('change', TodoStore.listenerCount('change'))
    }

    // when component goes away, componentWillUnmount() is called (as I understood)
    componentWillUnmount(){
        // remove event listener, so that we don't have memory leaks
        TodoStore.removeListener('change', this.getTodos)
    }

    getTodos(){
        this.setState({
            todos: TodoStore.getAll()
        })
    }

    reloadTodos(){
        TodoActions.reloadTodos()
    }

    render () {
        const { todos } = this.state

        const TodoComponents = todos.map((todo) => <Todo key={todo.id} {...todo} />)

        return (
            <div>
                <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
                <input/>
                <h1>Todos</h1>
                <ul>{TodoComponents}</ul>
            </div>
        )
    }
}