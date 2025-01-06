import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth-api";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
            if (isSignUp) {

                const response = await fetch('http://localhost:8080/api/users?action=register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        username, 
                        password,
                        favorites: [], 
                        mustWatch: []
                    })
                });
                const data = await response.json();
                if (data.success) {
                    const loginResponse = await login(username, password);
                    localStorage.removeItem('token');
                    localStorage.setItem('token', loginResponse.token);
                    navigate('/');  
                    window.location.reload(); 
                } else {
                    setError(data.msg || "Registration failed");
                }
            } else {
                const response = await login(username, password);
                if (response.success) {
                    localStorage.removeItem('token');
                    localStorage.setItem('token', response.token);
                    navigate('/');  
                    window.location.reload(); 
                } else {
                    setError("Invalid credentials");
                }
            }
        };
    

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <Button 
                        variant="text"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError("");
                        }}
                    >
                        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;