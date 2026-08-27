import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

interface UserTableToolbarProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  rangeStart: number;
  rangeEnd: number;
  total: number;
}

const UserTableToolbar = ({
  page,
  pageCount,
  onPageChange,
  rangeStart,
  rangeEnd,
  total,
}: UserTableToolbarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: 1.5,
        height: 52,
        px: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary" noWrap>
        {total === 0
          ? "No users"
          : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
      </Typography>
      <Pagination
        size="small"
        shape="rounded"
        page={page}
        count={pageCount}
        onChange={(_, value) => onPageChange(value)}
        sx={{
          "& .MuiPagination-ul": { gap: "4px", flexWrap: "nowrap" },
          "& .MuiPaginationItem-root": {
            width: 32,
            height: 32,
            minWidth: 32,
          },
        }}
      />
    </Box>
  );
};

export default UserTableToolbar;
