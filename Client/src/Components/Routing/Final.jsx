import Crausel from '../Thirdpage/Crausel';
import Hard from '../Thirdpage/Hard';
import Touroverview from '../Thirdpage/Touroverview';
import What from '../Thirdpage/What';
import Map from '../Thirdpage/Map';
import Recommendation from '../Thirdpage/Recommendation';
import Faq from '../Thirdpage/Faq';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDetailById } from '../api/Details';

function Final() {
  const { placeId } = useParams();

  // Fetch details using useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ['details', placeId], // Unique key for this query
    queryFn: () => fetchDetailById(placeId), // Fetch function with placeId
  });

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming data is the details object for the place
  return (
    <div>
<Crausel
  image1={data?.image1}
  image2={data?.image2}
  image3={data?.image3}
  image4={data?.image4}
  image5={data?.image5}
/>
<Hard 
        difficulty={data?.difficulty}
        duration={data?.duration}
        location={data?.location}
      />
            <Touroverview overview={data?.tour_overview} />
      <What included={data?.whats_included} />
      <Map mapImage={data?.map_image} />
      <Recommendation
        places={data?.recommended_places} // Array of places to visit
        foods={data?.must_try_foods} // Array of must-try foods
        guide={data?.recommended_guide} // Guide information
        recommendation={data?.your_recommendation} // Personal recommendation
      />
            <Faq faqs={data?.faqs} />
    </div>
  );
}

export default Final;