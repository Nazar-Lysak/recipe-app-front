import { useSession } from "../../context/SessionContext";
import Button from "../../shared/ui/button/Button";

const ProfilePage = () => {
  const { signOut } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default ProfilePage;
