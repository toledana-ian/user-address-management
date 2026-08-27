import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface UsersPageHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const UsersPageHeader = ({ search, onSearchChange }: UsersPageHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        mb: "15px",
      }}
    >
      <Box>
        <Typography variant="pageTitle">Users</Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your users and their addresses.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1.5,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <TextField
          size="small"
          placeholder="Search users"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: "100%", sm: 260 },
            "& .MuiInputBase-root": { height: 40 },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            height: 40,
            px: 2,
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default UsersPageHeader;
