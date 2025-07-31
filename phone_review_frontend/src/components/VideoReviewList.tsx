import React, {useState} from "react";
import {useTheme} from "./Theme";
import {FiStar, FiMessageCircle} from "react-icons/fi";

type Review = {
  id: number;
  title: string;
  author: string;
  videoUrl: string;
  thumbnail: string;
  rating: number;
  comments: {user: string; text: string}[];
  description: string;
};

export const VideoReviewList: React.FC<{
  reviews: Array<Review>,
  onSelectVideo: (idx: number|null) => void,
  onRate: (id: number, rating: number) => void,
  onComment: (id: number, comment: string) => void,
  selectedVideo: number|null,
}> = ({
  reviews, 
  onSelectVideo, 
  onRate, 
  onComment, 
  selectedVideo
}) => {
  const theme = useTheme();

  return (
    <section>
      <h3 style={{
        fontSize: 19,
        color: theme.secondary,
        margin: "1.7rem 0 0.6rem 0",
        fontWeight: 400,
        letterSpacing: 0.13,
      }}>
        All Phone Reviews
      </h3>
      <div
        style={{
          display: "grid",
          gap: 25,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}
      >
        {reviews.map(review => (
          <VideoReviewCard
            key={review.id}
            {...review}
            onPlay={() => onSelectVideo(review.id)}
            showModal={selectedVideo === review.id}
            closeModal={() => onSelectVideo(null)}
            onRate={onRate}
            onComment={onComment}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
};


const VideoReviewCard: React.FC<Review & {
  onPlay: () => void;
  showModal: boolean;
  closeModal: () => void;
  onRate: (id: number, rating: number) => void;
  onComment: (id: number, comment: string) => void;
  theme: any;
}> = ({
  id, title, author, videoUrl, thumbnail, rating, comments, description,
  onPlay, showModal, closeModal, onRate, onComment, theme,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  return (
    <div
      style={{
        background: theme.surface,
        borderRadius: 13,
        boxShadow: "0 2px 12px rgba(33,33,33,0.06)",
        padding: 0,
        overflow: "hidden",
        position: "relative",
        minHeight: 410,
      }}>
      <img
        src={thumbnail}
        alt={title}
        style={{width: "100%", height: 165, objectFit: "cover", cursor: "pointer"}}
        onClick={onPlay}
        tabIndex={0}
        aria-label={`Play video for ${title}`}
        onKeyPress={e => { if(e.key==="Enter") onPlay(); }}
      />
      <div style={{padding: "1rem 1.1rem 0.3rem"}}>
        <div style={{fontSize: 17, fontWeight: 600, marginBottom: 3, color: theme.text}}>
          {title}
        </div>
        <div style={{fontSize: 14, color: theme.secondary, marginBottom: 7}}>
          {description}
        </div>
        <div style={{fontSize: 14, color: theme.primary, marginBottom: 8}}>
          By <span style={{fontWeight: 500}}>{author}</span>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 9}}>
          <FiStar style={{color: theme.accent}} />
          <span style={{fontWeight: 500, color: theme.accent}}>
            {rating?.toFixed(1) ?? "NA"}
          </span>
          <span style={{marginLeft: 12, color: theme.secondary}}>Rate:</span>
          {[1,2,3,4,5].map(n => 
            <span
              key={n}
              style={{
                cursor: "pointer",
                color: n <= userRating ? theme.accent : "#ddd",
                fontSize: "22px",
              }}
              onClick={()=>{ setUserRating(n); onRate(id, n); }}
              aria-label={`Rate ${n} stars`}
              tabIndex={0}
              onKeyPress={e => { if(e.key==="Enter") { setUserRating(n); onRate(id, n); }}}
            >★</span>
          )}
        </div>
        <div>
          <button
            onClick={()=>setShowComments(val=>!val)}
            style={{
              background: "none",
              border: "none",
              color: theme.primary,
              cursor: "pointer",
              padding: 0,
              fontSize: 16,
              marginBottom: 3,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            aria-expanded={showComments}
            aria-controls={`comments-${id}`}
          >
            <FiMessageCircle />
            Comments ({comments.length})
          </button>
          {showComments && (
            <div id={`comments-${id}`} style={{margin: "0.7em 0 0.3em 0"}}>
              <ul style={{listStyle: "none", padding: 0, margin: 0, fontSize: 15}}>
                {comments.map((c, ix) => 
                  <li key={ix}
                      style={{
                          marginBottom: 7,
                          padding: "6px 7px",
                          borderRadius: 6,
                          background: "#fafafa",
                          color: "#333",
                          border: "1px solid #eee"
                      }}>
                    <span style={{fontWeight: 700, color: theme.secondary}}>{c.user}: </span>
                    {c.text}
                  </li>)}
              </ul>
              <form 
                style={{display: "flex", marginTop: 7, gap: 4}}
                onSubmit={e => {e.preventDefault(); onComment(id, newComment); setNewComment("");}}
              >
                <input
                  value={newComment}
                  required
                  placeholder="Add comment"
                  onChange={e => setNewComment(e.target.value)}
                  style={{
                    flex: 1,
                    fontSize: 15,
                    border: "1px solid #ccc",
                    borderRadius: 5,
                    padding: "6px 10px"
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: theme.accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: 5,
                    padding: "6px 14px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
      {/* Inline video modal */}
      {showModal && (
        <div style={{
          position:"fixed", top:0, left:0, width:"100vw", height:"100vh",
          background:"rgba(44,44,44,0.70)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:4000
        }}>
          <div style={{
            width: "85vw",
            maxWidth: 760,
            background: "#fff",
            padding: "2.5rem 2rem",
            borderRadius: 13,
            boxShadow: "0 4px 28px rgba(80,80,80,0.15)",
            position: "relative"
          }}>
            <button onClick={closeModal}
              aria-label="Close video"
              style={{position: "absolute", top: 13, right: 13, border: "none", background: "none", color: "#888", fontSize: 25, cursor: "pointer"}}>
              ×
            </button>
            <div style={{fontWeight: 600, fontSize: 20, marginBottom: 10}}>{title}</div>
            <video src={videoUrl} controls autoPlay style={{width:"100%", borderRadius: 10, background: "#222"}} />
            <div style={{marginTop: 16, color: theme.secondary, fontSize: 13}}>
              By {author}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
