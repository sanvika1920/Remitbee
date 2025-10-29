import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const UserCard = ({ user }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
        transition: "0.3s",
      }}
    >
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2">Phone: {user.phone}</Typography>
        <Typography variant="body2">Company: {user.company.name}</Typography>
        <Typography variant="body2">City: {user.address.city}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
