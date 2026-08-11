import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';

export default function TodoForm({ onAddTodo }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onAddTodo(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl shadow-sm border space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Task Title</label>
        <input 
          {...register('title', { required: 'Title is required' })} 
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
          placeholder="e.g., Complete React Assignment"
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Assigned Role</label>
          <select {...register('role')} className="w-full border p-2 rounded-lg bg-white">
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select {...register('priority')} className="w-full border p-2 rounded-lg bg-white">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
        <PlusCircle className="w-5 h-5" /> Add Task
      </button>
    </form>
  );
}