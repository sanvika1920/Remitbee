import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch API data with error handling
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unable to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Filter and sort users
  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[sort] || "").localeCompare(b[sort] || ""));

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
    },
    typography: { fontFamily: "Poppins, sans-serif" },
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* ✅ Header Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              👤 RemitBee User Directory
            </Typography>
            <Typography variant="body2" sx={{ marginRight: 2 }}>
              {darkMode ? "Dark" : "Light"} Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Toolbar>
        </AppBar>

        {/* ✅ Search and Sort Controls */}
        <Box className="controls">
          <motion.div
            whileFocus={{ scale: 1.05 }}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Search by name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* ✅ Loading / Error / Empty States */}
        {loading ? (
          <Box className="loader">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography align="center" color="error" sx={{ mt: 4 }}>
            {error}
          </Typography>
        ) : filteredUsers.length === 0 ? (
          <Typography align="center" sx={{ mt: 4, fontWeight: 500 }}>
            No users found. Try a different name.
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{ p: 2 }}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    className="card"
                    onClick={() => setSelectedUser(user)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardContent>
                      <img
                        src={`https://i.pravatar.cc/100?u=${user.id}`}
                        alt={user.name}
                        className="avatar"
                      />
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        {user.name}
                      </Typography>
                      <Typography variant="body2">📧 {user.email}</Typography>
                      <Typography variant="body2">📞 {user.phone}</Typography>
                      <Typography variant="body2">
                        🏢 {user.company.name}
                      </Typography>
                      <Typography variant="body2">
                        📍 {user.address.city}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ✅ User Details Modal */}
        <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)}>
          <DialogTitle>{selectedUser?.name}</DialogTitle>
          <DialogContent dividers>
            <Typography>
              <strong>Email:</strong> {selectedUser?.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {selectedUser?.phone}
            </Typography>
            <Typography>
              <strong>Company:</strong> {selectedUser?.company.name}
            </Typography>
            <Typography>
              <strong>City:</strong> {selectedUser?.address.city}
            </Typography>
          </DialogContent>
        </Dialog>

        {/* ✅ Footer */}
        <footer className="footer">
          <Typography variant="body2">
            © 2025 RemitBee User Directory | Built by Sanvika
          </Typography>
        </footer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
