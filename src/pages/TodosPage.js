import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Loader2, Trash2, Check } from 'lucide-react';
export function TodosPage() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchTodos();
    }, []);
    async function fetchTodos() {
        try {
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .order('created_at', { ascending: false });
            if (error)
                throw error;
            setTodos(data || []);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch todos');
        }
        finally {
            setIsLoading(false);
        }
    }
    async function addTodo(e) {
        e.preventDefault();
        if (!newTodo.trim())
            return;
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user)
                throw new Error('User not authenticated');
            const { error } = await supabase
                .from('todos')
                .insert([{ title: newTodo, user_id: user.id }]);
            if (error)
                throw error;
            setNewTodo('');
            fetchTodos();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to add todo');
        }
    }
    async function toggleTodo(todo) {
        try {
            const { error } = await supabase
                .from('todos')
                .update({ completed: !todo.completed })
                .eq('id', todo.id);
            if (error)
                throw error;
            fetchTodos();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update todo');
        }
    }
    async function deleteTodo(id) {
        try {
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            fetchTodos();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete todo');
        }
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "My Todos" }), error && (_jsx("div", { className: "bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400", children: error })), _jsx("form", { onSubmit: addTodo, className: "mb-8", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", value: newTodo, onChange: (e) => setNewTodo(e.target.value), placeholder: "What needs to be done?", className: "flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsxs("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors", children: [_jsx(Plus, { size: 20 }), "Add Todo"] })] }) }), isLoading ? (_jsx("div", { className: "flex justify-center", children: _jsx(Loader2, { size: 24, className: "animate-spin text-blue-500" }) })) : todos.length === 0 ? (_jsx("div", { className: "text-center py-12 text-gray-400", children: "No todos yet. Add one above!" })) : (_jsx("ul", { className: "space-y-4", children: todos.map((todo) => (_jsxs("li", { className: "flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: () => toggleTodo(todo), className: `w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-gray-400 hover:border-blue-500'}`, children: todo.completed && _jsx(Check, { size: 14, className: "text-white" }) }), _jsx("span", { className: `${todo.completed ? 'line-through text-gray-400' : ''}`, children: todo.title })] }), _jsx("button", { onClick: () => deleteTodo(todo.id), className: "text-gray-400 hover:text-red-400 transition-colors", children: _jsx(Trash2, { size: 20 }) })] }, todo.id))) }))] }) }));
}
