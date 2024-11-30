import React, { useState, KeyboardEvent } from "react";
// import { Chip, Typography, Box, TextField } from "@mui/material";

interface Tag {
  id: string;
  label: string;
  category: string;
}

export default function TagSelector() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (tagToDelete: Tag) => () => {
    setTags((tags) => tags.filter((tag) => tag.id !== tagToDelete.id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        addTag(inputValue.trim());
      }
    }
  };
  const addTag = (tagLabel: string, category: string = "defaultCategory") => {
    const tagExist = tags.some(
      (item) => item.label.toLowerCase() === tagLabel.toLowerCase()
    );
    if (!tagExist) {
      const newTag: Tag = {
        id: Date.now().toString(),
        label: tagLabel,
        category,
      }; // Include the category field
      setTags((prevTags) => [...prevTags, newTag]);
      setInputValue("");
      setError(null);
    } else {
      setError(`Tag "${tagLabel}" already exists!`);
    }
  };
  return (
    // <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
    //   <Typography variant="body2" sx={{ marginBottom: 1 }}>
    //     Tags (comma separated)
    //   </Typography>
    //   <Box sx={{ display: "flex", flexWrap: "wrap", }}>
    //     {tags.map((tag) => (
    //       <Chip
    //         key={tag.id}
    //         label={tag.label}
    //         onDelete={handleDelete(tag)}
    //         sx={{
    //           margin: 0.5,
    //           backgroundColor: "#1a202c",
    //           color: "white",
    //           "& .MuiChip-deleteIcon": {
    //             color: "white",
    //           },
    //           "&:hover": {
    //             backgroundColor: "#2d3748",
    //             color: "red",
    //             "& .MuiChip-deleteIcon": {
    //               color: "rgba(255, 0, 0, 0.7)",
    //             },
    //           },
    //         }}
    //       />
    //     ))}

    //     <TextField
    //       size="small"
    //       variant="outlined"
    //       value={inputValue}
    //       onChange={handleInputChange}
    //       inputProps={{

    //         sx: { borderRadius: '5px' }
    //       }}
    //       onKeyDown={handleKeyDown}
    //       error={!!error}
    //       placeholder="Add more tags..."
    //       helperText={error ? error : "Press Enter or comma to add a tag"}
    //     />
    //   </Box>
    // </Box>
  <></>
  );
}
