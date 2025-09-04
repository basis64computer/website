import { useEffect, useState } from "react";
import { FeatureCard } from "../ui/FeatureCard";
import useAuth from "../../state/useAuth";
import useLoginModal from "../../state/useLoginModal";

interface CmsFeature {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  destination: string;
  premiumLevel: number;
  isLogin: boolean;
  creator: string;
  creatorPhoto: string;
  date: string;
}

export const FeatureList = () => {
  const [features, setFeatures] = useState<CmsFeature[]>([]);
  const auth = useAuth();
  const loginModal = useLoginModal();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/basis64computer/public/refs/heads/main/features.json")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Error loading CMS features:", err));
  }, []);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-1 xl:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          to={feature.destination === "<internal>" ? `/${feature.id}` : undefined}
          href={feature.destination.startsWith("http") ? feature.destination : undefined}
          imageSrc={`/src/assets/thumbnails/${feature.id}.webp`}
          title={feature.title}
          description={feature.description}
          category={feature.category}
          isPremium={feature.premiumLevel > 0}
          isLogin={feature.isLogin}
          isUserLogin={auth.user}
          onRequireLogin={() => loginModal.show()}
        />
      ))}
    </div>
  );
};
