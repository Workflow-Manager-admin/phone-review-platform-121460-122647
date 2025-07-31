import React, {useState} from "react";
import {useTheme} from "./Theme";

export const ReviewModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (review: {
    title: string;
    author: string;
    videoUrl: string;
    thumbnail: string;
    description: string;
  }) => void;
}> = ({open, onClose, onSubmit}) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    videoUrl: "",
    thumbnail: "",
    description: "",
  });
  const [error, setError] = useState("");
  const theme = useTheme();

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.videoUrl) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSubmit(form);
    setForm({title: "", author: "", videoUrl: "", thumbnail: "", description: ""});
  };

  return (
    <div style={{
      position:"fixed", top:0, left:0, width:"100vw", height:"100vh",
      background:"rgba(44,44,44,0.83)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:10000
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2.2rem 2rem",
          borderRadius: 16,
          maxWidth: 420,
          minWidth: 330,
          boxShadow: "0 5px 28px rgba(20,20,20,0.17)",
          position: "relative"
        }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            color: "#999",
            fontSize: 23,
            cursor: "pointer"
          }}
          aria-label="Close review modal"
        >
          ×
        </button>
        <h2 style={{
          margin: "0 0 1.1rem 0",
          fontSize: 22,
          color: theme.primary,
          letterSpacing: 0.21,
          fontWeight: 700
        }}>
          Submit New Phone Review
        </h2>
        <label style={{fontSize: 15, fontWeight: 500}}>
          Title*<br/>
          <input name="title" value={form.title} onChange={handleChange}
            style={{
              width: "100%", padding: "7px 9px", borderRadius: 6,
              border: "1px solid #ddd", marginTop: 2, marginBottom: 10, fontSize: 15
            }}
            maxLength={64}
            required
          />
        </label>
        <label style={{fontSize: 15, fontWeight: 500}}>
          Author*<br/>
          <input name="author" value={form.author} onChange={handleChange}
            style={{
              width: "100%", padding: "7px 9px", borderRadius: 6,
              border: "1px solid #ddd", marginTop: 2, marginBottom: 10, fontSize: 15
            }}
            maxLength={48}
            required
          />
        </label>
        <label style={{fontSize: 15, fontWeight: 500}}>
          Video URL*<br/>
          <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
            style={{
              width: "100%", padding: "7px 9px", borderRadius: 6,
              border: "1px solid #ddd", marginTop: 2, marginBottom: 10, fontSize: 15
            }}
            maxLength={256}
            placeholder="https://..."
            required
          />
        </label>
        <label style={{fontSize: 15, fontWeight: 500}}>
          Thumbnail URL<br/>
          <input name="thumbnail" value={form.thumbnail} onChange={handleChange}
            style={{
              width: "100%", padding: "7px 9px", borderRadius: 6,
              border: "1px solid #ddd", marginTop: 2, marginBottom: 10, fontSize: 15
            }}
            maxLength={256}
            placeholder="https://..."
          />
        </label>
        <label style={{fontSize: 15, fontWeight: 500}}>
          Description<br/>
          <textarea name="description" value={form.description} onChange={handleChange}
            style={{
              width: "100%", minHeight: 52, borderRadius: 6,
              border: "1px solid #ddd", marginTop: 2, marginBottom: 10, fontSize: 15, resize: "vertical"
            }}
            maxLength={200}
          />
        </label>
        {error && (
          <div style={{color: "#b70000", marginBottom: 10, fontSize: 15}}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            background: theme.primary,
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "0.7em",
            fontWeight: 600,
            fontSize: 16,
            marginTop: 3,
            cursor: "pointer",
            transition: ".1s background"
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};
