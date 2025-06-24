import React, { useState, useEffect } from "react";
import apiClient from '../apiClient.js';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTooltip,
  MDBInput
} from "mdb-react-ui-kit";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- CHANGE #1: Add state for title AND description for the new todo form ---
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/todos');
        setTodos(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todos. Are you logged in?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    if (!newTodoTitle.trim()) return;
    try {
      // --- CHANGE #2: Send both title and description to the API ---
      const response = await apiClient.post('/todos', {
        title: newTodoTitle,
        description: newTodoDescription
      });
      setTodos([response.data, ...todos]);
      // Clear both form fields
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (err) {
      setError('Failed to create todo.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (todoToUpdate) => {
    try {
      const response = await apiClient.patch(`/todos/${todoToUpdate.id}`, {
        isCompleted: !todoToUpdate.isCompleted,
      });
      setTodos(todos.map(todo => (todo.id === todoToUpdate.id ? response.data : todo)));
    } catch (err) {
      setError('Failed to update todo.');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
      console.error(err);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#e2d5de" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol xl={10}>
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-5">
                <h6 className="mb-3">Awesome Todo List</h6>
                
                {/* --- CHANGE #3: Update the form to have two inputs --- */}
                <div className="d-flex flex-column align-items-center mb-4 gap-3">
                  <MDBInput
                    type="text"
                    label="What do you need to do today?"
                    wrapperClass="flex-fill w-100"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                  />
                   <MDBInput
                    type="text"
                    label="Add a description (optional)"
                    wrapperClass="flex-fill w-100"
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                  />
                  <MDBBtn type="submit" color="info" className="w-100" onClick={handleCreateTodo}>
                    Add
                  </MDBBtn>
                </div>

                {loading && <p className="text-center">Loading todos...</p>}
                {error && <p className="text-center text-danger">{error}</p>}

                <MDBListGroup>
                  {!loading && !error && todos.map(todo => (
                    <MDBListGroupItem key={todo.id} className="d-flex align-items-center border-0 mb-2 rounded" style={{ backgroundColor: '#f4f6f7' }}>
                      <MDBCheckbox
                        name="flexCheck"
                        id={`checkbox-${todo.id}`}
                        checked={todo.isCompleted}
                        onChange={() => handleToggleComplete(todo)}
                      />
                      {/* --- CHANGE #4: Add a container for text to handle title and description --- */}
                      <div className="ms-3 text-start">
                        <p className={`fw-bold mb-1 ${todo.isCompleted ? 'text-muted text-decoration-line-through' : ''}`}>
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className={`text-muted mb-0 small ${todo.isCompleted ? 'text-decoration-line-through' : ''}`}>
                            {todo.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="ms-auto">
                        <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Delete todo">
                          <MDBIcon
                            fas
                            icon="trash-alt"
                            color="danger"
                            onClick={() => handleDeleteTodo(todo.id)}
                          />
                        </MDBTooltip>
                      </div>
                    </MDBListGroupItem>
                  ))}

                  {!loading && !error && todos.length === 0 && (
                    <p className="text-center text-muted">No todos yet. Add one above!</p>
                  )}
                </MDBListGroup>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}