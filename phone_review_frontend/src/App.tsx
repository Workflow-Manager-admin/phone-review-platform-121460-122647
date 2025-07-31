import React, {useState} from "react";
import {ThemeProvider, useTheme} from "./components/Theme";
import {Header} from "./components/Header";
import {FeaturedReviews} from "./components/FeaturedReviews";
import {VideoReviewList} from "./components/VideoReviewList";
import {ReviewModal} from "./components/ReviewModal";

const MOCK_REVIEWS = [
  {
    id: 1,
    title: "Galaxy S24 Ultra Review",
    author: "TechGuru",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://dummyimage.com/320x180/1976d2/fff&text=Samsung+S24",
    featured: true,
    comments: [{user: "Lisa", text: "Great insights!"}],
    rating: 4.5,
    description: "The best flagship Android phone this year.",
  },
  {
    id: 2,
    title: "iPhone 15 Pro Review",
    author: "AppleFan",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://dummyimage.com/320x180/424242/fff&text=iPhone+15+Pro",
    featured: true,
    comments: [],
    rating: 4.7,
    description: "Apple's latest innovation, reviewed in depth.",
  },
  {
    id: 3,
    title: "OnePlus 12: Value King?",
    author: "MobileMaster",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://dummyimage.com/320x180/ffc107/222&text=OnePlus+12",
    featured: false,
    comments: [],
    rating: 4.3,
    description: "Can OnePlus keep the value crown?",
  },
  {
    id: 4,
    title: "Google Pixel 9 Review",
    author: "SandraDroid",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://dummyimage.com/320x180/1976d2/fff&text=Pixel+9",
    featured: false,
    comments: [],
    rating: 4.2,
    description: "Google doubles down on camera AI.",
  },
];

export const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [selectedVideo, setSelectedVideo] = useState<null|number>(null);

  const onSearchChange = (value: string) => setSearch(value);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddReview = (review: any) => {
    setReviews([
      {
        ...review,
        id: Date.now(),
        comments: [],
        featured: false,
        rating: 0,
      },
      ...reviews,
    ]);
    closeModal();
  };

  const handleRate = (id: number, rating: number) => {
    setReviews(reviews.map(r => r.id === id ? {...r, rating: (r.rating + rating) / 2} : r));
  };

  const handleComment = (id: number, comment: string) => {
    setReviews(reviews.map(r => r.id === id ? {...r, comments: [...r.comments, {user: "You", text: comment}]} : r));
  };

  const filtered = reviews.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.author.toLowerCase().includes(search.toLowerCase())
  );
  const featured = filtered.filter(r => r.featured);
  const others = filtered.filter(r => !r.featured);

  return (
    <ThemeProvider>
      <div style={{
        minHeight: "100vh",
        background: useTheme().background,
        color: useTheme().text,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}>
        <Header onSearch={onSearchChange} search={search} onOpenModal={openModal} />
        <main style={{maxWidth: 1240, margin: "0 auto", padding: "1.2rem"}}>
          <FeaturedReviews 
            reviews={featured} 
            onSelectVideo={setSelectedVideo}
          />
          <VideoReviewList
            reviews={others}
            onSelectVideo={setSelectedVideo}
            onRate={handleRate}
            onComment={handleComment}
            selectedVideo={selectedVideo}
          />
        </main>
        <ReviewModal
          open={modalOpen}
          onClose={closeModal}
          onSubmit={handleAddReview}
        />
        <footer style={{
          background: useTheme().surface,
          color: useTheme().secondary,
          textAlign: "center",
          fontSize: 15,
          padding: "1.3rem 0",
          marginTop: "2rem",
          letterSpacing: 0.4,
        }}>
          Phone Review Platform &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </ThemeProvider>
  );
};
