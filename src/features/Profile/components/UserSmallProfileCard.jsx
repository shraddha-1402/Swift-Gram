import { useNavigate } from "react-router-dom";
import { Stack, Avatar, Typography } from "@mui/material";
import { routes } from "../../../constants";

const UserSmallProfileCard = ({ user, setOpen }) => {
  const navigate = useNavigate();

  const { avatarURL, username, firstName, lastName } = user;
  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        cursor: "pointer",
        border: "1px solid",
        p: "0.5rem ",
        borderRadius: "0.25rem",
        width: "100%",
        marginBottom: "1rem",
      }}
      onClick={() => {
        navigate(`${routes.PROFILE}/${username}`);
        setOpen(false);
      }}
    >
      <Avatar sx={{ width: "3rem", height: "3rem" }} src={avatarURL} />
      <Stack justifyContent="center">
        <Typography noWrap>
          {firstName} {lastName}
        </Typography>
        <Typography noWrap sx={{ fontSize: "0.7em" }}>
          @{username}
        </Typography>
      </Stack>
    </Stack>
  );
};

export { UserSmallProfileCard };
