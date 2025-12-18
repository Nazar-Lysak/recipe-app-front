import axios from "axios";
import { useState } from "react";
import { useSession } from "../../context/useSession";
import Button from "../../shared/ui/button/Button";

const ProfilePage = () => {
  const { signOut } = useSession();

  const handleLogout = () => {
    signOut();
  };

  const [file, setFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      setImgPreview(base64data);
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    previewFile(file);
    setFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !imgPreview) return;

    const recipeData = {
      recipe: {
        image: imgPreview,
      },
    };

    const result = await axios
      .put(
        "http://localhost:3000/recipe/6a54452f-87c6-47ed-b199-254ec9515ae0",
        recipeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljNjA5ODc3LWIyZDEtNGI5MC1hMjFlLTQ0NDEyNTY1YTQ0NCIsImVtYWlsIjoibWFyaWEua292YWxAZ21haWwuY29tIiwidXNlcm5hbWUiOiJNYXJpYUsiLCJpYXQiOjE3NjU3MjA3NTYsImV4cCI6MTc2NjMyNTU1Nn0.cc9L3YQxUxQYOIwTTdHzDobS7W4G_IKX0wA3yxm-QZY",
          },
        },
      )
      .then((response) => {
        console.log("File uploaded successfully", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });

    console.log(result);
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
      <div>
        {imgPreview && (
          <div>
            <button
              onClick={() => {
                setImgPreview(null);
                setFile(null);
              }}
            >
              remove
            </button>
            <img
              src={imgPreview}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleChange}
            accept="image/jpeg, image/png, image/webp"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
