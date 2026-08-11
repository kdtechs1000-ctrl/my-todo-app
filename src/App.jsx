import { Check, Trash } from 'lucide-react';
import './App.css'
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import TestDesign from './components/TestDesign';
import { Button } from "@/components/ui/button"
import Header from './components/Header'

function App() {

  const [input, setInput] = useState('')

  // set todos if any item present in the localStorage
  const [todos, setTodos] = useState(() => {
    let savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])




  // Add to do when form is submitted
  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      return
    }
    const newTodo = {
      text: input,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
    setInput('')
    toast(`'${input}' is added`)
  }

  const handleChange = (index) => {
    setTodos(
      todos.map((item, i) =>
        i === index ? { ...item, isCompleted: !item.isCompleted } : item
      )
    )
  }

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
    toast('Deleted')
  }

  return (
    <>
      <Toaster />
      {/* <TestDesign /> */}
      <Header />
      <div className='h-screen w-screen bg-orange-100 flex justify-center items-center'>
        <div className='max-w-2xl w-full bg-white p-5 m-5 rounded-2xl shadow-md'>
          {/* <Counter /> */}
          <h3 className="text-3xl font-bold">Todo App</h3>

          <form action="" onSubmit={addTodo} className='flex gap-3 my-5'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder='Enter todo'
              className='w-full border border-red-600 p-3 rounded-md'
            />

            <Button className='bg-orange-600 text-white p-3 rounded-md' type='submit' variant="outline">Button</Button>
          </form>

          <ul className='flex flex-col gap-1'>

            {todos.map((item, index) => (
              <li key={index} className='flex justify-between items-center bg-orange-100 px-5 py-2 rounded-md' >
                <span className={`${item.isCompleted ? "line-through" : ""}`}>{item.text}</span>
                {/* Ternery Operator */}
                <div className="actions flex gap-3">

                  {!item.isCompleted &&
                    <button onClick={() => handleChange(index)} className='p-2 bg-orange-100 rounded-full hover:bg-orange-600 hover:text-white cursor-pointer'>
                      <Check />
                    </button>
                  }
                  <button onClick={() => handleDelete(index)} className='p-2 bg-orange-100 rounded-full hover:bg-orange-600 hover:text-white cursor-pointer'>
                    <Trash />
                  </button>
                </div>
              </li>
            ))}


          </ul>
        </div>
      </div >
    </>
  )
}

export default App;