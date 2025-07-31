import React from "react";
import {useTheme} from "./Theme";

export const FeaturedReviews: React.FC<{ 
  reviews: Array<any>,
  onSelectVideo: (idx: number|null) => void,
}> = ({reviews, onSelectVideo}) => {
  const theme = useTheme();
  if (!reviews.length) return null;
  return (
    <section>
      <h2 style={{
        color: theme.primary, 
        fontSize: 22,
        margin: "1.8rem 0 1rem 0"
      }}>
        Featured Reviews
      </h2>
      <div style={{
        display: "flex",
        gap: 22,
        flexWrap: "wrap",
        marginBottom: 16,
      }}>
        {reviews.map(r => (
          <div
            key={r.id}
            style={{
              background: theme.surface,
              borderRadius: 14,
              boxShadow: "0 3px 16px rgba(33,33,33,0.07)",
              width: 322,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              transition: "box-shadow 0.2s",
            }}
            tabIndex={0}
            aria-label={`Open review for ${r.title}`}
            onClick={() => onSelectVideo(r.id)}
            onKeyPress={e => { if(e.key==="Enter") onSelectVideo(r.id); }}
          >
            <img
              style={{
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                width: "100%",
                height: 180,
                objectFit: "cover",
              }}
              src={r.thumbnail}
              alt={r.title}
            />
            <div style={{padding: "1rem"}}>
              <div style={{
                fontWeight: 600,
                fontSize: 18,
                color: theme.text,
                marginBottom: 6,
              }}>{r.title}</div>
              <div style={{
                fontSize: 13,
                color: theme.secondary,
                marginBottom: 8
              }}>{r.description}</div>
              <div style={{
                fontSize: 14,
                color: theme.primary
              }}>
                By {r.author}
              </div>
              <div style={{marginTop: 4, fontSize: 15, color: theme.accent}}>
                ★ {r.rating?.toFixed(1) ?? "NA"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
