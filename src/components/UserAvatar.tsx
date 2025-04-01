import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/store/authStore";

export default function UserAvatar() {
  const { user, fullName } = useAuthStore();
  const initials = fullName
    ? fullName
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("")
    : "SA"; // Default initials if no name is available
  const imageUrl = user?.profilePicture || "";
  const altText = fullName || "User Avatar";
  const fallbackText = initials || "SA";

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={altText} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}
